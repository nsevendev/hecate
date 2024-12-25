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
     * @param array<Error>|null $errors
     */
    public function __construct(
        protected string $getMessage = 'Une Erreur serveur est survenu',
        protected int $statusCode = 500,
        protected $errors = null,
    ) {
        parent::__construct($getMessage, $statusCode, null);

        $this->errors[] = Error::create('error', $this->getMessage());
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function toApiResponse(): JsonResponse
    {
        $this->addErrorInfo();

        return ApiResponseFactory::toException(
            statusCode: $this->statusCode,
            message: $this->getMessage,
            errors: $this->errors,
        );
    }

    protected function addError(string $key, string $message): void
    {
        $this->errors[] = Error::create($key, $message);
    }

    protected function addErrorInfo(): void
    {
        if ('dev' === $_ENV['APP_ENV']) {
            $this->addError('file', $this->getFile());
            $this->addError('line', (string) $this->getLine());
            $this->addError('stack', $this->getTraceAsString());
        }
    }
}
