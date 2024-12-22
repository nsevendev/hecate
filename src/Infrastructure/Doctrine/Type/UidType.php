<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\Doctrine\Type;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;
use Hecate\Entity\Shared\Type\Uid;
use LogicException;

use function is_string;

final class UidType extends Type implements AutoConfiguredDoctrineType
{
    /** @var class-string<Uid> */
    private string $uidClass;

    /**
     * @param class-string<Uid> $class
     */
    public static function new(string $class): self
    {
        $self = new self();
        $self->uidClass = $class;

        return $self;
    }

    public static function name(): string
    {
        return 'app_uid';
    }

    public function getSQLDeclaration(array $column, AbstractPlatform $platform): string
    {
        return $platform->getStringTypeDeclarationSQL([
            'length' => 32,
        ]);
    }

    public function convertToPHPValue($value, AbstractPlatform $platform): ?Uid
    {
        if (null === $value) {
            return null;
        }

        if (!is_string($value)) {
            throw new LogicException('Database value must be a string');
        }

        return ($this->uidClass)::fromString($value);
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform): ?string
    {
        if (null === $value) {
            return null;
        }

        if (!$value instanceof Uid) {
            throw new LogicException('Value need to be an instance of Uid');
        }

        return (string) $value;
    }

    public function getName(): string
    {
        return self::name();
    }
}
