<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Event;

use Hecate\Infrastructure\ApiResponse\ApiResponseFactory;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;

class ApiResponseExceptionListener
{
    #[AsEventListener(event: ExceptionEvent::class, priority: 0)]
    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        $request = $event->getRequest();

        /** @var string|null $controller */
        $controller = $request->attributes->get('_controller');

        if (null !== $controller && $this->isFromApiController($controller)) {
            $response = ApiResponseFactory::exceptionThrowable($exception);
            $event->setResponse($response);
        }
    }

    private function isFromApiController(string $controller): bool
    {
        return str_contains($controller, 'Controller\\Api');
    }
}
