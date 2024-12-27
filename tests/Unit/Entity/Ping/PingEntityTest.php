<?php

declare(strict_types=1);

namespace Hecate\Tests\Unit\Entity\Ping;

use Hecate\Entity\Ping\PingEntity;
use Hecate\Entity\Shared\Type\Uid;
use Hecate\Infrastructure\Doctrine\Type\UidType;
use Hecate\Tests\Unit\HecateUnitTestCase;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(PingEntity::class), CoversClass(Uid::class), CoversClass(UidType::class)]
class PingEntityTest extends HecateUnitTestCase
{
    public function testEntityInitialization(): void
    {
        $status = 200;
        $message = 'Ping success';

        $pingEntity = new PingEntity($status, $message);

        self::assertSame($status, $pingEntity->status());
        self::assertSame($message, $pingEntity->message());
    }

    public function testEntityWithNullValues(): void
    {
        $pingEntity = new PingEntity(null, null);

        self::assertNull($pingEntity->status());
        self::assertNull($pingEntity->message());
    }
}
