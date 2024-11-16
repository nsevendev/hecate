<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse;

use Hecate\Infrastructure\ApiResponse\Component\ApiResponseData;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseError;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseLink;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseListError;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMessage;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMeta;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseStatus;
use Hecate\Infrastructure\ApiResponse\Type\ApiResponseStatusCodeExceptionType;
use Hecate\Infrastructure\ApiResponse\Type\ApiResponseStatusType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Throwable;

class ApiResponseFactory
{
    /**
     * @param ApiResponseError[]|null $errors
     * @param array<string, mixed>    $meta
     * @param array<string, mixed>    $links
     */
    private static function createResponse(
        ApiResponseStatusType $status,
        string $message,
        mixed $data = null,
        ?array $errors = null,
        array $meta = [],
        array $links = [],
        int $httpStatusCode = 200,
    ): JsonResponse {
        $listError = new ApiResponseListError();
        $errors && $listError->addListError($errors);
        $httpStatusCode = $listError->determineStatusCode($httpStatusCode);

        $response = new ApiResponse(
            apiResponseStatus: new ApiResponseStatus(status: $status),
            apiResponseMessage: new ApiResponseMessage(message: $message),
            apiResponseData: new ApiResponseData(data: $data),
            apiResponseListError: $listError,
            apiResponseLink: new ApiResponseLink(listLinks: $links),
            apiResponseMeta: new ApiResponseMeta(listMetaData: $meta)
        );

        return new JsonResponse(data: $response->toArray(), status: $httpStatusCode);
    }

    /**
     * @param array<string, mixed> $meta
     * @param array<string, mixed> $links
     */
    public static function success(mixed $data = null, array $meta = [], array $links = [], string $message = 'Success'): JsonResponse
    {
        return self::createResponse(
            status: ApiResponseStatusType::SUCCESS,
            message: $message,
            data: $data,
            meta: $meta,
            links: $links
        );
    }

    /**
     * @param array<string, mixed> $meta
     */
    public static function created(mixed $data = null, array $meta = [], string $message = 'Resource created'): JsonResponse
    {
        return self::createResponse(
            status: ApiResponseStatusType::SUCCESS,
            message: $message,
            data: $data,
            meta: $meta,
            httpStatusCode: 201
        );
    }

    /**
     * @param array<string, mixed> $meta
     */
    public static function accepted(mixed $data = null, array $meta = [], string $message = 'Request accepted'): JsonResponse
    {
        return self::createResponse(
            status: ApiResponseStatusType::SUCCESS,
            message: $message,
            data: $data,
            meta: $meta,
            httpStatusCode: 202
        );
    }

    public static function noContent(): JsonResponse
    {
        return self::createResponse(
            status: ApiResponseStatusType::SUCCESS,
            message: 'No Content',
            httpStatusCode: 204
        );
    }

    /**
     * use this method when you want to return a error response with a specific status code.
     *
     * @param array<string, mixed> $headers
     */
    public static function exceptionStatusCode(
        ApiResponseStatusCodeExceptionType $statusCode,
        ?string $message = null,
        string $challenge = 'Basic realm="Access to the staging site"',
        ?Throwable $previous = null,
        array $headers = [],
        int $code = 0,
    ): JsonResponse {
        return self::createResponse(
            status: ApiResponseStatusType::ERROR,
            message: $message ?? 'Error Api Response',
            errors: [ApiResponseError::fromStatusCode(
                statusCode: $statusCode,
                challenge: $challenge,
                message: $message,
                previous: $previous,
                headers: $headers,
                code: $code
            )],
            httpStatusCode: $statusCode->value
        );
    }

    /**
     * use this method in ApiResponseExceptionListener for catch all exception in Controller API.
     * and use if exceptionStatusCode has not support your exception.
     */
    public static function exceptionThrowable(
        Throwable $exception,
        ?string $message = null,
    ): JsonResponse {
        $messageApi = $message ?? $exception->getMessage();

        return self::createResponse(
            status: ApiResponseStatusType::ERROR,
            message: $messageApi,
            errors: [ApiResponseError::fromException(
                exception: $exception
            )],
            httpStatusCode: 500
        );
    }
}
