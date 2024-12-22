<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Component;

final readonly class ApiResponseMeta
{
    /**
     * @param array<string, mixed> $listMetaData
     */
    public function __construct(private array $listMetaData = []) {}

    /**
     * @return array<string, mixed>
     */
    public function listMetaData(): array
    {
        return $this->listMetaData;
    }
}
