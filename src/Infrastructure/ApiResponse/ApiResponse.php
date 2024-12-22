<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse;

use Hecate\Infrastructure\ApiResponse\Component\ApiResponseData;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseLink;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseListError;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMessage;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMeta;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseStatus;

final readonly class ApiResponse
{
    public function __construct(
        private ApiResponseStatus $apiResponseStatus,
        private ApiResponseMessage $apiResponseMessage,
        private ApiResponseData $apiResponseData,
        private ApiResponseListError $apiResponseListError,
        private ApiResponseLink $apiResponseLink = new ApiResponseLink(),
        private ApiResponseMeta $apiResponseMeta = new ApiResponseMeta(),
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'status' => $this->apiResponseStatus->status(),
            'message' => $this->apiResponseMessage->message,
            'data' => $this->apiResponseData->data,
            'errors' => $this->apiResponseListError->toArray(),
            'meta' => $this->apiResponseMeta->listMetaData(),
            'links' => $this->apiResponseLink->listLinks(),
        ];
    }
}
