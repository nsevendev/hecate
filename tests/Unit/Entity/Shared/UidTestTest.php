<?php

declare(strict_types=1);

namespace Hecate\Tests\Unit\Entity\Shared;

use Hecate\Entity\Shared\UidTest;
use Hecate\Tests\Unit\HecateUnitTestCase;
use InvalidArgumentException;
use PHPUnit\Framework\Attributes\CoversClass;

#[
    CoversClass(UidTest::class),
]
class UidTestTest extends HecateUnitTestCase
{
    public function testCreateGeneratesValidUid(): void
    {
        $uid = UidTest::create();
        self::assertMatchesRegularExpression('@^[a-z0-9]{32}$@', (string) $uid);
    }

    public function testFromStringWithValidString(): void
    {
        $value = '1234567890abcdef1234567890abcdef';
        $uid = UidTest::fromString($value);
        self::assertSame($value, (string) $uid);
    }

    public function testFromStringThrowsExceptionForInvalidString(): void
    {
        $this->expectException(InvalidArgumentException::class);
        UidTest::fromString('invalid-uid');
    }

    public function testFromStringWithLegacyFormat(): void
    {
        $value = '1234567890123456789-1234';
        $uid = UidTest::fromString($value);
        self::assertSame($value, (string) $uid);
    }

    public function testFromStringWithLegacyUuidFormat(): void
    {
        $value = '1234567890123456789012345678901';
        $uid = UidTest::fromString($value);
        self::assertSame($value, (string) $uid);
    }

    public function testFromInvalidFormatWithValidString(): void
    {
        $value = '1234567890abcdef1234567890abcdef';
        $uid = UidTest::fromInvalidFormat($value);
        self::assertSame($value, (string) $uid);
    }

    public function testFromInvalidFormatWithInvalidString(): void
    {
        $value = 'invalid-uid';
        $uid = UidTest::fromInvalidFormat($value);
        self::assertSame($value, (string) $uid);
    }

    public function testToReadableString(): void
    {
        $value = '1234567890abcdef1234567890abcdef';
        $uid = UidTest::fromString($value);

        $expected = '12345678-90ab-cdef-1234-567890abcdef';
        self::assertSame($expected, $uid->toReadableString());
    }

    public function testJsonSerialize(): void
    {
        $value = '1234567890abcdef1234567890abcdef';
        $uid = UidTest::fromString($value);

        $json = json_encode($uid);
        self::assertSame('"1234567890abcdef1234567890abcdef"', $json);
    }
}
