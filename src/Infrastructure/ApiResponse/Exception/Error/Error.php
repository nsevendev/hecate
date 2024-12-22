<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Exception\Error;

readonly class Error
{
    private function __construct(
        private string $key,
        private string $message,
    ) {}

    public static function create(string $key, string $message): self
    {
        return new self($key, $message);
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'key' => $this->key,
            'message' => $this->message,
        ];
    }
}
