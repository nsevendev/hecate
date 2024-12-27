<?php

declare(strict_types=1);

namespace Hecate\Tests\Database\Entity\Ping;

use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\Tools\SchemaTool;
use Hecate\Entity\Ping\PingEntity;
use Hecate\Entity\Shared\Type\Uid;
use Hecate\Infrastructure\Doctrine\Type\UidType;
use Hecate\Tests\Unit\HecateUnitTestCase;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(PingEntity::class), CoversClass(Uid::class), CoversClass(UidType::class)]
class PingEntityDatabaseTest extends HecateUnitTestCase
{
    private EntityManagerInterface $entityManager;

    /**
     * @throws Exception
     */
    protected function setUp(): void
    {
        $this->entityManager = $this->createEntityManager(true);

        // Générer le schéma en mémoire
        $schemaTool = new SchemaTool($this->entityManager);
        $schemaTool->createSchema(
            $this->entityManager->getMetadataFactory()->getAllMetadata()
        );
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    public function testPersistAndRetrievePingEntity(): void
    {
        $pingEntity = new PingEntity(200, 'Ping successful');

        $this->entityManager->persist($pingEntity);
        $this->entityManager->flush();

        $retrievedEntity = $this->entityManager->find(PingEntity::class, $pingEntity->id());

        self::assertNotNull($retrievedEntity);
        self::assertSame(200, $retrievedEntity->status());
        self::assertSame('Ping successful', $retrievedEntity->message());
    }
}
