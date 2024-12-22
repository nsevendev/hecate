<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Exception\Custom;

use Exception;
use Hecate\Infrastructure\ApiResponse\ApiResponseFactory;
use Hecate\Infrastructure\ApiResponse\Exception\Error\Error;
use Hecate\Infrastructure\ApiResponse\Exception\Type\ApiResponseExceptionInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class AbstractApiResponseException extends Exception implements ApiResponseExceptionInterface
{
    /**
     * @param string $getMessage
     * @param int $statusCode
     * @param array<Error>|null $errors
     */
    public function __construct(
        protected string $getMessage = 'Une Erreur serveur est survenu',
        protected int $statusCode = 500,
        protected $errors = null,
    ) {
        parent::__construct($getMessage, $statusCode, null);
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function toApiResponse(): JsonResponse
    {
        return ApiResponseFactory::toException(
            statusCode: $this->statusCode,
            message: $this->getMessage,
            errors: $this->errors,
        );
    }
}
