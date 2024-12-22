<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse;

use Hecate\Infrastructure\ApiResponse\Component\ApiResponseData;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseLink;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMessage;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMeta;
use Hecate\Infrastructure\ApiResponse\Exception\Error\Error;
use Hecate\Infrastructure\ApiResponse\Exception\Error\ListError;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseFactory
{
    /**
     * @param array<string, mixed> $meta
     * @param array<string, mixed> $links
     */
    private static function createResponse(
        int $status,
        string $message,
        mixed $data = null,
        array $meta = [],
        array $links = [],
    ): JsonResponse {
        $response = new ApiResponse(
            responseStatusCode: $status,
            apiResponseMessage: new ApiResponseMessage(message: $message),
            apiResponseData: new ApiResponseData(data: $data),
            listError: ListError::fromArray(errors: null),
            apiResponseLink: new ApiResponseLink(listLinks: $links),
            apiResponseMeta: new ApiResponseMeta(listMetaData: $meta)
        );

        return new JsonResponse(data: $response->toArray(), status: $status);
    }

    /**
     * @param array<string, mixed> $meta
     * @param array<string, mixed> $links
     */
    public static function success(mixed $data = null, array $meta = [], array $links = [], string $message = 'Success'): JsonResponse
    {
        return self::createResponse(
            status: Response::HTTP_OK,
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
            status: Response::HTTP_CREATED,
            message: $message,
            data: $data,
            meta: $meta,
        );
    }

    /**
     * @param array<string, mixed> $meta
     */
    public static function accepted(mixed $data = null, array $meta = [], string $message = 'Request accepted'): JsonResponse
    {
        return self::createResponse(
            status: Response::HTTP_ACCEPTED,
            message: $message,
            data: $data,
            meta: $meta,
        );
    }

    public static function noContent(): JsonResponse
    {
        return self::createResponse(
            status: Response::HTTP_NO_CONTENT,
            message: 'No Content',
        );
    }

    /**
     * @param array<Error>|null $errors
     */
    public static function toException(
        int $statusCode,
        string $message,
        ?array $errors,
    ): JsonResponse {
        $response = new ApiResponse(
            responseStatusCode: $statusCode,
            apiResponseMessage: new ApiResponseMessage(message: $message),
            apiResponseData: new ApiResponseData(data: null),
            listError: ListError::fromArray($errors),
        );

        return new JsonResponse(data: $response->toArray(), status: $statusCode);
    }
}
