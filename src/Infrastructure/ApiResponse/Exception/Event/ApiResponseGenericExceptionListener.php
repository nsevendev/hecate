<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Exception\Event;

use Hecate\Infrastructure\ApiResponse\Exception\Custom\Shared\GenericException;
use Hecate\Infrastructure\ApiResponse\Exception\Type\ApiResponseExceptionInterface;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class ApiResponseGenericExceptionListener
{
    #[AsEventListener(event: ExceptionEvent::class, priority: -10)]
    public function onKernelException(ExceptionEvent $event): void
    {
        $controller = $event->getRequest()->attributes->get('_controller');

        // seulement les contrôleurs dans Controller\Api
        if (true === is_string($controller) && false === str_starts_with($controller, 'Hecate\\Controller\\Api')) {
            return;
        }

        $exception = $event->getThrowable();

        // Ignorer les exceptions ApiResponseExceptionInterface
        if ($exception instanceof ApiResponseExceptionInterface) {
            return;
        }

        $response = $this->handleGenericException($exception);
        $event->setResponse($response);
    }

    private function handleGenericException(\Throwable $exception): JsonResponse
    {
        $statusCode = $exception instanceof HttpExceptionInterface ? $exception->getStatusCode() : 500;

        $exceptionGeneric = new GenericException(
            exception: $exception,
            getMessage: $exception->getMessage(),
            statusCode: $statusCode,
        );

        return $exceptionGeneric->toApiResponse();
    }
}
