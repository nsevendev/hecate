<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Component;

final readonly class ApiResponseLink
{
    /**
     * @param array<string, mixed>|null $listLinks
     */
    public function __construct(private ?array $listLinks = null) {}

    /**
     * @return array<string, mixed>|null
     */
    public function listLinks(): ?array
    {
        return $this->listLinks;
    }
}
