<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Exception\Error;

readonly class ListError
{
    /**
     * @param array<Error>|null $errors
     */
    private function __construct(private ?array $errors) {}

    /**
     * @param array<Error>|null $errors
     */
    public static function fromArray(?array $errors): self
    {
        return new self($errors);
    }

    /**
     * @return array<string, mixed>|null
     */
    public function toArray(): ?array
    {
        return null !== $this->errors && count($this->errors) > 0
            ? array_map(fn (Error $error) => $error->toArray(), $this->errors)
            : null;
    }
}
