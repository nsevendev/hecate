<?php

declare(strict_types=1);

namespace Hecate\Tests\Unit;

use JsonException;
use PHPUnit\Framework\TestCase;

use function json_encode;

abstract class HecateUnitTestCase extends TestCase
{
    /**
     * @param object $expectedObject object to be json encoded and compared with the result
     * @param string $actualJson     The json result you want to compare with the object to encode
     *
     * @throws JsonException thrown if the supplied object cannot be json encoded
     */
    public static function assertJsonStringSameAsObject(object $expectedObject, string $actualJson, string $message = ''): void
    {
        self::assertSame(json_encode($expectedObject, JSON_THROW_ON_ERROR), $actualJson, $message);
    }

    /**
     * @param mixed[] $expectedArray array to be json encoded and compared with the result
     * @param string  $actualJson    The json result you want to compare with the array to encode
     *
     * @throws JsonException thrown if the supplied array cannot be json encoded
     */
    public static function assertJsonStringSameAsArray(array $expectedArray, string $actualJson, string $message = ''): void
    {
        self::assertSame(json_encode($expectedArray, JSON_THROW_ON_ERROR), $actualJson, $message);
    }
}
