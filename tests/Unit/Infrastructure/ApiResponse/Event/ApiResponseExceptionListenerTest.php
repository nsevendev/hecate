<?php

declare(strict_types=1);

namespace Hecate\Tests\Unit\Infrastructure\ApiResponse\Event;

use Exception;
use Hecate\Infrastructure\ApiResponse\ApiResponse;
use Hecate\Infrastructure\ApiResponse\ApiResponseFactory;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseData;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseError;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseLink;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseListError;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMessage;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMeta;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseStatus;
use Hecate\Infrastructure\ApiResponse\Event\ApiResponseExceptionListener;
use Hecate\Tests\Unit\HecateUnitTestCase;
use PHPUnit\Framework\Attributes\CoversClass;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Throwable;

#[
    CoversClass(ApiResponseExceptionListener::class),
    CoversClass(ApiResponseFactory::class),
    CoversClass(ApiResponse::class),
    CoversClass(ApiResponseError::class),
    CoversClass(ApiResponseLink::class),
    CoversClass(ApiResponseMeta::class),
    CoversClass(ApiResponseData::class),
    CoversClass(ApiResponseListError::class),
    CoversClass(ApiResponseMessage::class),
    CoversClass(ApiResponseStatus::class)
]
class ApiResponseExceptionListenerTest extends HecateUnitTestCase
{
    public function testOnKernelExceptionWithNonApiController(): void
    {
        $event = self::createExceptionEvent('App\Controller\NonApiController');

        $listener = new ApiResponseExceptionListener();
        $listener->onKernelException($event);

        self::assertNull($event->getResponse());
    }

    public function testOnKernelExceptionWithApiController(): void
    {
        $exception = new Exception('Test exception');
        $event = $this->createExceptionEvent('App\Controller\Api\TestController', $exception);

        $listener = new ApiResponseExceptionListener();
        $listener->onKernelException($event);

        $response = $event->getResponse();
        self::assertNotNull($response);

        $content = $response->getContent();
        self::assertIsString($content);
        $responseData = json_decode($content, true);

        self::assertIsArray($responseData);
        self::assertSame('Test exception', $responseData['message']);
    }

    private function createExceptionEvent(
        ?string $controller,
        ?Throwable $exception = null,
    ): ExceptionEvent {
        $request = new Request();
        $request->attributes->set('_controller', $controller);

        return new ExceptionEvent(
            self::createMock(HttpKernelInterface::class),
            $request,
            HttpKernelInterface::MAIN_REQUEST,
            $exception ?? new Exception('Test exception')
        );
    }
}
