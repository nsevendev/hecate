<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\Doctrine\Type;

interface AutoConfiguredDoctrineType
{
    public static function name(): string;
}
