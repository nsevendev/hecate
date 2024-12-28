<?php

declare(strict_types=1);

namespace Hecate\Tests\Unit\Infrastructure\ApiResponse\Exception\Event;

use Hecate\Infrastructure\ApiResponse\ApiResponse;
use Hecate\Infrastructure\ApiResponse\ApiResponseFactory;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseData;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseLink;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMessage;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMeta;
use Hecate\Infrastructure\ApiResponse\Exception\Custom\Ping\PingBadRequestException;
use Hecate\Infrastructure\ApiResponse\Exception\Error\Error;
use Hecate\Infrastructure\ApiResponse\Exception\Error\ListError;
use Hecate\Infrastructure\ApiResponse\Exception\Event\ApiResponseExceptionListener;
use Hecate\Tests\Unit\HecateUnitTestCase;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\MockObject\Exception;
use RuntimeException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;

#[
    CoversClass(ApiResponseExceptionListener::class),
    CoversClass(PingBadRequestException::class),
    CoversClass(ApiResponseFactory::class),
    CoversClass(ApiResponse::class),
    CoversClass(ApiResponseLink::class),
    CoversClass(ApiResponseMeta::class),
    CoversClass(ApiResponseData::class),
    CoversClass(ApiResponseMessage::class),
    CoversClass(ListError::class),
    CoversClass(Error::class),
]
class ApiResponseExceptionListenerTest extends HecateUnitTestCase
{
    private ApiResponseExceptionListener $listener;

    private HttpKernelInterface $kernel;

    private Request $request;

    /**
     * @throws Exception
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->listener = new ApiResponseExceptionListener();
        $this->kernel = $this->createMock(HttpKernelInterface::class);
        $this->request = Request::create('/api/ping');
    }

    public function testOnKernelExceptionHandlesCustomApiResponseException(): void
    {
        $exceptionCustom = new PingBadRequestException();
        $event = new ExceptionEvent(
            $this->kernel,
            $this->request,
            HttpKernelInterface::MAIN_REQUEST,
            $exceptionCustom
        );

        $this->listener->onKernelException($event);

        self::assertSame(400, $exceptionCustom->getStatusCode());

        // Vérifie que le listener a défini une réponse
        $response = $event->getResponse();
        self::assertNotNull($response, 'Response should not be null');
        self::assertInstanceOf(JsonResponse::class, $response);

        $content = $response->getContent();
        self::assertIsString($content);

        // Vérifie le contenu de la réponse JSON
        $responseData = json_decode($content, true);
        self::assertIsArray($responseData);
        self::assertSame(400, $responseData['statusCode']);
        self::assertSame('Bad Request', $responseData['message']);
        self::assertSame(null, $responseData['data']);
        self::assertSame(null, $responseData['meta']);
        self::assertSame(null, $responseData['links']);

        $expectedError = ['key' => 'error', 'message' => 'Bad Request'];
        self::assertContains($expectedError, $responseData['errors']);
    }

    /*
     * @throws Exception
     */
    public function testOnKernelExceptionIgnoresNonApiResponseException(): void
    {
        $exception = new RuntimeException('Some runtime error');

        $event = new ExceptionEvent(
            $this->kernel,
            $this->request,
            HttpKernelInterface::MAIN_REQUEST,
            $exception
        );

        $this->listener->onKernelException($event);

        // Vérifie que le listener n'a pas défini de réponse
        self::assertNull($event->getResponse());
    }
}
