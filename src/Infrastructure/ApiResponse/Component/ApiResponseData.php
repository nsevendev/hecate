<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Component;

final readonly class ApiResponseData
{
    /**
     * @param mixed $data Les données à inclure dans la réponse
     */
    public function __construct(public mixed $data) {}
}
