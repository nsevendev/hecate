<?php

declare(strict_types=1);

namespace Hecate\Tests\Unit;

use Doctrine\DBAL\DriverManager;
use Doctrine\DBAL\Exception;
use Doctrine\DBAL\Schema\DefaultSchemaManagerFactory;
use Doctrine\DBAL\Types\Type;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\ORMSetup;
use Hecate\Infrastructure\Doctrine\Type\UidType;
use JsonException;
use PHPUnit\Framework\TestCase;

use function json_encode;

abstract class HecateUnitTestCase extends TestCase
{
    /**
     * Creates an EntityManager for testing purposes.
     *
     * @throws Exception
     */
    protected function createEntityManagerAndUseMemory(): EntityManagerInterface
    {
        $config = ORMSetup::createAttributeMetadataConfiguration(
            [__DIR__.'/../../src/Entity'], // Path to your entity files
            true, // Enable development mode
        );

        $connectionParams = [
            'driver' => 'pdo_sqlite',
            'memory' => true,
            'schema_manager_factory' => new DefaultSchemaManagerFactory(),
        ];

        $connection = DriverManager::getConnection($connectionParams, $config);

        // Enregistrement du type personnalisé 'app_uid'
        if (false === Type::hasType('app_uid')) {
            Type::addType('app_uid', UidType::class);
        }

        return new EntityManager($connection, $config);
    }

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
