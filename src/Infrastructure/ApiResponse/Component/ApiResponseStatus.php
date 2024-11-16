<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Component;

use Hecate\Infrastructure\ApiResponse\Type\ApiResponseStatusType;

final readonly class ApiResponseStatus
{
    public function __construct(private ApiResponseStatusType $status) {}

    public function status(): string
    {
        return $this->status->value;
    }
}
