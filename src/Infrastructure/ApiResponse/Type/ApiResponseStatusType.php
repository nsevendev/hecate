<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Type;

enum ApiResponseStatusType: string
{
    case SUCCESS = 'success';
    case ERROR = 'error';
}
