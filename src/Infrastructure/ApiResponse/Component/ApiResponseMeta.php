<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Component;

final readonly class ApiResponseMeta
{
    /**
     * @param array<string, mixed>|null $listMetaData
     */
    public function __construct(private ?array $listMetaData = null) {}

    /**
     * @return array<string, mixed>|null
     */
    public function listMetaData(): ?array
    {
        return $this->listMetaData;
    }
}
