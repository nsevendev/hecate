<?php

declare(strict_types=1);

namespace Hecate\Tests\Unit\PHPUnit;

use Hecate\Tests\Extension\Event\FixedRandomSeedHandler;
use Hecate\Tests\Unit\HecateUnitTestCase;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(FixedRandomSeedHandler::class)]
final class RandomSeedTest extends HecateUnitTestCase
{
    /**
     * This tests that the random seed is set correctly for each test.
     *
     * @see \Hecate\Tests\Extension\Event\FixedRandomSeedHandler::notify()
     */
    public function testRandomIntegerIsAlwaysTheSame(): void
    {
        $value = mt_rand();

        self::assertNotSame(3053395, $value);
    }
}
