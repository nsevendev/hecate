# Gestion ApiResponse  

## Creer des reponses

- pour avoir un exemple de creation de réponse, regarder le controller `PingController.php` ou l'exemple suivant.
- si vous avez besoin de rajouter des réponse success ajouter une fonction static dans `ApiResponseFactory.php` qui correspond à votre besoin.
```php
#[AsController]
class ListPing
{
    #[Route(path: '/api/pings', name: 'hecate_api_list_ping', methods: ['GET'])]
    public function index(): Response
    {
        return ApiResponseFactory::success(data: [['ping' => 'ping']]);
    }
}
```

## Creer des exceptions custom

- dans le dossier custom creer soit un dossier de votre entity concerné ou alors creer votre exception dans le dossier shared  
  si celle ci sera partager par plusieurs entity.
- votre class doit etre extends de `AbstractApiResponseException.php` pour un exemple regarder le model suivant `PingBadRequestException.php`
- ensuite vous n'avez plus qu'a throw votre exception dans votre controller ou service pour retourner une réponse json standardisé.
```php
class PingBadRequestException extends AbstractApiResponseException
{
    /**
     * @param string $getMessage
     * @param int $statusCode
     * @param array<Error>|null $errors
     */
    public function __construct(
        string $getMessage = '',
        int $statusCode = Response::HTTP_BAD_REQUEST,
        ?array $errors = null,
    ) {
        $statusTexts = Response::$statusTexts;

        if ('' === $getMessage && true === array_key_exists($statusCode, $statusTexts)) {
            $getMessage = $statusTexts[$statusCode];
        }

        parent::__construct($getMessage, $statusCode, $errors);
    }
}

throw new PingBadRequestException(errors: [Error::create('key', 'message'), Error::create('key', 'message'), Error::create('key', 'message')]);
```

## Detail

### Les Components

- `ApiResponse.php` est composer des components, ses components comprends les data, des links, un message, des meta donnée
les erreurs sont gerer par le dossier exception et les statusCode sont typer int et on utilise la class Response de SF pour retourner le status code.

### ApiResponse.php  

- cette class permet de construire une réponse json standardisé propre à cette application.
elle est utilisée dans les controllers pour retourner une réponse json ou utiliser dans le eventlistener `ApiResponseExceptionListener.php`  
qui permet de retourner une réponse json standardisé propre à cette application en cas d'exception.

### ApiResponseFactory.php  

- cette class contient des fonctions static qui permettent de construire des reponses json standardisées rapidement  
les exceptions utilise la fonction `toException` pour retorner ça réponse

## Les exceptions  

> Toutes les exceptions de l'application API sont gerées dans ce dossier. 
> Et seulement les exceptions de l'application API.  
> Creer une exception custom dans le dossier exception soit par entity, soit shared.

### ApiResponseExceptionListener.php  

- il y a un eventlistener qui ecoute les exceptions de type `ApiResponseExceptionInterface`  
- il faut donc que toute nouvelle exception custom dans le dossier `Exception` implemente cette interface  
- ensuite cette event ecoute donc les exceptions de l'application (cette elle écoute toutes les exceptions de l'application)  
et test si l'exception qui est throw est une instance de `ApiResponseExceptionInterface` si c'est le cas elle retourne une réponse  
json standardisé propre à cette application.  

### Error.php  
 
- `Error.php` est un object d'erreur simple avec une `key` et un `message`  
cette objet va etre utiliser dans `ListError.php` pour retourner plusieurs erreurs en meme temps ou pas.  

### ListError.php  

- cette class permet de stocker plusieurs erreurs dans un tableau, ces erreurs sont des objets de type `Error.php`  
- cette class permet de retourner un tableau d'erreur sous forme de tableau json  
ceci est la derniere étape de construction de l'exception, afin de permettre d'afficher plusieurs erreurs en même temps.  

### AbstractApiResponseException.php  

- cette class est une class abstraite qui implemente `ApiResponseExceptionInterface`  
- elle permet de construire une exception avec un code d'erreur et un tableau d'erreur  
vous devez extends vos class d'exception custom avec cette class  
- pour que l'eventlistener puisse retourner une réponse json standardisé propre à cette application.
