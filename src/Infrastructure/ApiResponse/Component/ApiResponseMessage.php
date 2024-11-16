<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Component;

final readonly class ApiResponseMessage
{
    public function __construct(public string $message = '') {}
}
