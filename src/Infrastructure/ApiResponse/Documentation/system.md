# Gestion ApiResponse

## ApiResponse.php  

- cette class permet de construire une réponse json standardisé propre à cette application.
elle est utilisée dans les controllers pour retourner une réponse json ou utiliser dans le eventlistener `ApiResponseExceptionListener.php`  
qui permet de retourner une réponse json standardisé propre à cette application en cas d'exception.

## ApiResponseFactory.php  

- cette class contient des fonctions static qui permettent de construire des reponses json standardisées rapidement  
les exceptions utilise la fonction `toException` pour retorner ça réponse

> Toutes les exceptions de l'application API sont gerées dans ce dossier. 
> Et seulement les exceptions de l'application API.  
> Creer une exception custom dans le dossier exception soit par entity, soit shared.

## ApiResponseExceptionListener.php  

- il y a un eventlistener qui ecoute les exceptions de type `ApiResponseExceptionInterface`  
- il faut donc que toute nouvelle exception custom dans le dossier `Exception` implemente cette interface  
- ensuite cette event ecoute donc les exceptions de l'application (cette elle écoute toutes les exceptions de l'application)  
et test si l'exception qui est throw est une instance de `ApiResponseExceptionInterface` si c'est le cas elle retourne une réponse  
json standardisé propre à cette application.  

## Error.php  

- dans ce dossier il y a les class d'erreur qui sont utilisées  
pour retourner une réponse json standardisé propre à cette application.  
- `Error.php` est un object d'erreur simple avec une `key` et un `message`  
cette objet va servir à stocker differentes erreurs dans un tableau à l'aide de la class `ListError.php`  

## ListError.php  

- cette class permet de stocker plusieurs erreurs dans un tableau, ces erreurs sont des objets de type `Error.php`  
- cette class permet de retourner un tableau d'erreur sous forme de tableau json  
ceci est la derniere étape de construction de l'exception, afin de permettre d'afficher plusieurs erreurs en même temps.  

## AbstractApiResponseException.php  

- cette class est une class abstraite qui implemente `ApiResponseExceptionInterface`  
- elle permet de construire une exception avec un code d'erreur et un tableau d'erreur  
vous devez extends vos class d'exception custom avec cette class  
- pour que l'eventlistener puisse retourner une réponse json standardisé propre à cette application.  
