<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Component;

use Hecate\Infrastructure\ApiResponse\Type\ApiResponseStatusCodeExceptionType;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\GoneHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\LengthRequiredHttpException;
use Symfony\Component\HttpKernel\Exception\LockedHttpException;
use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\PreconditionFailedHttpException;
use Symfony\Component\HttpKernel\Exception\PreconditionRequiredHttpException;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Symfony\Component\HttpKernel\Exception\UnsupportedMediaTypeHttpException;
use Throwable;

final class ApiResponseError
{
    private function __construct(
        private int $statusCode,
        private int $code,
        private string $message,
    ) {}

    /**
     * Constructeur pour créer un `ApiResponseError` depuis un ApiStatusCodeExceptionType.
     *
     * @param array<string, mixed> $headers
     */
    public static function fromStatusCode(
        ApiResponseStatusCodeExceptionType $statusCode,
        string $challenge,
        ?string $message = null,
        ?Throwable $previous = null,
        array $headers = [],
        int $code = 0,
    ): self {
        return match ($statusCode->value) {
            400 => self::fromException(
                exception: new BadRequestHttpException(
                    message: $message ?? 'Bad Request',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            401 => self::fromException(
                exception: new UnauthorizedHttpException(
                    challenge: $challenge,
                    message: $message ?? 'Unauthorized',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            403 => self::fromException(
                exception: new AccessDeniedHttpException(
                    message: $message ?? 'Access Denied',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            404 => self::fromException(
                exception: new NotFoundHttpException(
                    message: $message ?? 'Not Found',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            406 => self::fromException(
                exception: new NotAcceptableHttpException(
                    message: $message ?? 'Not Acceptable',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            409 => self::fromException(
                exception: new ConflictHttpException(
                    message: $message ?? 'Conflict',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            410 => self::fromException(
                exception: new GoneHttpException(
                    message: $message ?? 'Gone',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            411 => self::fromException(
                exception: new LengthRequiredHttpException(
                    message: $message ?? 'Length Required',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            412 => self::fromException(
                exception: new PreconditionFailedHttpException(
                    message: $message ?? 'Precondition Failed',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            423 => self::fromException(
                exception: new LockedHttpException(
                    message: $message ?? 'Locked',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            415 => self::fromException(
                exception: new UnsupportedMediaTypeHttpException(
                    message: $message ?? 'Unsupported Media Type',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            422 => self::fromException(
                exception: new UnprocessableEntityHttpException(
                    message: $message ?? 'Unprocessable Entity',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            428 => self::fromException(
                exception: new PreconditionRequiredHttpException(
                    message: $message ?? 'Precondition Required',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            429 => self::fromException(
                exception: new TooManyRequestsHttpException(
                    message: $message ?? 'Too Many Requests',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            503 => self::fromException(
                exception: new ServiceUnavailableHttpException(
                    message: $message ?? 'Service Unavailable',
                    previous: $previous,
                    code: $code,
                    headers: $headers
                )
            ),
            default => new self(
                statusCode: 500,
                code: 0,
                message: 'An internal server error occurred'
            ),
        };
    }

    /**
     * Constructeur pour créer un `ApiResponseError` depuis une exception.
     */
    public static function fromException(Throwable $exception): self
    {
        if ($exception instanceof HttpException) {
            return new self(
                statusCode: $exception->getStatusCode(),
                code: $exception->getCode(),
                message: $exception->getMessage()
            );
        }

        return new self(
            statusCode: 500,
            code: $exception->getCode(),
            message: $exception->getMessage()
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'statusCode' => $this->statusCode,
            'code' => $this->code,
            'message' => $this->message,
        ];
    }

    public function statusCode(): int
    {
        return $this->statusCode;
    }
}
