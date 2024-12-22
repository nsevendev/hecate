<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Component;

final readonly class ApiResponseLink
{
    /**
     * @param array<string, mixed> $listLinks
     */
    public function __construct(private array $listLinks = []) {}

    /**
     * @return array<string, mixed>
     */
    public function listLinks(): array
    {
        return $this->listLinks;
    }
}
