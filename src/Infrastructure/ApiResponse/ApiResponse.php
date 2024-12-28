<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse;

use Hecate\Infrastructure\ApiResponse\Component\ApiResponseData;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseLink;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMessage;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMeta;
use Hecate\Infrastructure\ApiResponse\Exception\Error\ListError;

final readonly class ApiResponse
{
    public function __construct(
        private int $responseStatusCode,
        private ApiResponseMessage $apiResponseMessage,
        private ApiResponseData $apiResponseData,
        private ListError $listError,
        private ApiResponseLink $apiResponseLink = new ApiResponseLink(),
        private ApiResponseMeta $apiResponseMeta = new ApiResponseMeta(),
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'statusCode' => $this->responseStatusCode,
            'message' => $this->apiResponseMessage->message,
            'data' => $this->apiResponseData->data,
            'errors' => $this->listError->toArray(),
            'meta' => $this->apiResponseMeta->listMetaData(),
            'links' => $this->apiResponseLink->listLinks(),
        ];
    }
}
