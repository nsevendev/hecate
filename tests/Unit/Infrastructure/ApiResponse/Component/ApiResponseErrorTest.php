<?php

declare(strict_types=1);

namespace Hecate\Tests\Unit\Infrastructure\ApiResponse\Component;

use Hecate\Infrastructure\ApiResponse\Component\ApiResponseError;
use Hecate\Infrastructure\ApiResponse\Type\ApiResponseStatusCodeExceptionType;
use Hecate\Tests\Unit\HecateUnitTestCase;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(ApiResponseError::class)]
class ApiResponseErrorTest extends HecateUnitTestCase
{
    public function test404fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::NOT_FOUND,
            challenge: ''
        );

        self::assertSame(404, $error->statusCode());
    }

    public function test400fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::BAD_REQUEST,
            challenge: ''
        );

        self::assertSame(400, $error->statusCode());
    }

    public function test412fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::PRECONDITION_FAILED,
            challenge: ''
        );

        self::assertSame(412, $error->statusCode());
    }

    public function test409fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::CONFLICT,
            challenge: ''
        );

        self::assertSame(409, $error->statusCode());
    }

    public function test403fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::FORBIDDEN,
            challenge: ''
        );

        self::assertSame(403, $error->statusCode());
    }

    public function test401fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::UNAUTHORIZED,
            challenge: ''
        );

        self::assertSame(401, $error->statusCode());
    }

    public function test406fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::NOT_ACCEPTABLE,
            challenge: ''
        );

        self::assertSame(406, $error->statusCode());
    }

    public function test410fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::GONE,
            challenge: ''
        );

        self::assertSame(410, $error->statusCode());
    }

    public function test411fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::LENGTH_REQUIRED,
            challenge: ''
        );

        self::assertSame(411, $error->statusCode());
    }

    public function test423fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::LOCKED,
            challenge: ''
        );

        self::assertSame(423, $error->statusCode());
    }

    public function test415fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::UNSUPPORTED_MEDIA_TYPE,
            challenge: ''
        );

        self::assertSame(415, $error->statusCode());
    }

    public function test422fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::UNPROCESSABLE_ENTITY,
            challenge: ''
        );

        self::assertSame(422, $error->statusCode());
    }

    public function test428fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::PRECONDITION_REQUIRED,
            challenge: ''
        );

        self::assertSame(428, $error->statusCode());
    }

    public function test429fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::TOO_MANY_REQUESTS,
            challenge: ''
        );

        self::assertSame(429, $error->statusCode());
    }

    public function test503fromStatusCode(): void
    {
        $error = ApiResponseError::fromStatusCode(
            statusCode: ApiResponseStatusCodeExceptionType::SERVICE_UNAVAILABLE,
            challenge: ''
        );

        self::assertSame(503, $error->statusCode());
    }
}
