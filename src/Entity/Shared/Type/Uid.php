<?php

declare(strict_types=1);

namespace Hecate\Entity\Shared\Type;

use InvalidArgumentException;
use JsonSerializable;
use Stringable;

use function preg_match;
use function random_bytes;
use function substr;
use function trim;

abstract class Uid implements Stringable, JsonSerializable
{
    public const string REGEX_UUID = '^[a-z0-9]{32}$';

    public const string REGEX_LEGACY = '^[0-9]{19,22}-[0-9]{1,5}$';

    public const string REGEX_LEGACY_UUID = '^[a-z0-9]{31}$';

    public const string REGEX_LEGACY_VTF = '^VTF_[a-z0-9]{13}$'; // Utilisé dans les ParcoursSouscription

    final private function __construct(private readonly string $uid) {}

    final public static function create(): static
    {
        return static::fromString(bin2hex(random_bytes(16)));
    }

    final public static function fromString(string $id): static
    {
        $id = trim($id);

        // Pour des raisons de compatibilité "legacy", les identifiants supportent plusieurs formats différents.
        if (preg_match('@'.self::REGEX_UUID.'@', $id)) {
            return new static($id);
        }

        if (preg_match('@'.self::REGEX_LEGACY.'@', $id)) {
            return new static($id);
        }

        if (preg_match('@'.self::REGEX_LEGACY_UUID.'@', $id)) {
            return new static($id);
        }

        if (preg_match('@'.self::REGEX_LEGACY_VTF.'@', $id)) {
            return new static($id);
        }

        throw new InvalidArgument("Invalid Uid string ($id) supplied for ".static::class);
    }

    /**
     * Certaines données d'ID ne sont pas normalisées dans la BDD actuelle,
     * cette méthode doit être appelée lors de l'hydratation si les sources ne
     * sont pas fiables.
     */
    public static function fromInvalidFormat(string $id): static
    {
        try {
            return self::fromString($id);
        } catch (InvalidArgumentException) {
            return new static($id);
        }
    }

    final public function __toString(): string
    {
        return $this->uid;
    }

    final public function toReadableString(): string
    {
        return substr($this->uid, 0, 8)
            .'-'.substr($this->uid, 8, 4)
            .'-'.substr($this->uid, 12, 4)
            .'-'.substr($this->uid, 16, 4)
            .'-'.substr($this->uid, 20, 12);
    }

    final public function jsonSerialize(): string
    {
        return $this->uid;
    }
}
