<?php

declare(strict_types=1);

namespace Hecate\Fixtures;

use Doctrine\ORM\Mapping\Entity;
use Doctrine\Persistence\ObjectManager;
use ReflectionClass;
use ReflectionException;

final class RecursiveEntityPersiste
{
    /**
     * Will loop on all properties of the given object and check if it is an
     * object using the `\Doctrine\ORM\Mapping\Entity` attribute, in which case
     * it is automatically persisted as well.
     *
     * This is used as a shortcut to deeply persist all entities fixtures,
     * without having to manually persist them or declare a "cascade" behaviour.
     *
     * @throws ReflectionException
     */
    public static function persist(ObjectManager $manager, object $object): void
    {
        $manager->persist($object);

        foreach ((new ReflectionClass($object))->getProperties() as $property) {
            // @phpstan-ignore property.dynamicName
            $value = (fn () => $this->{$property->name} ?? null)->call($object);

            // Si c'est null, on continue directement.
            // @phpstan-ignore-next-line
            if (null === $value) {
                continue;
            }

            // @phpstan-ignore-next-line
            if (false === is_object($value)) {
                continue;
            }

            $entityAttributes = (new ReflectionClass($value))->getAttributes(Entity::class);

            if ([] === $entityAttributes) {
                continue;
            }

            self::persist($manager, $value);
        }
    }
}
