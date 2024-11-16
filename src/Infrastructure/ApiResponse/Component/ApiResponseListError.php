<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Component;

final class ApiResponseListError
{
    /**
     * @param ApiResponseError[] $errors
     */
    public function __construct(private array $errors = []) {}

    public function addError(ApiResponseError $error): void
    {
        $this->errors[] = $error;
    }

    /**
     * @param ApiResponseError[] $errors
     */
    public function addListError(array $errors): void
    {
        foreach ($errors as $error) {
            $this->addError($error);
        }
    }

    /**
     * @return array<string, mixed>|null
     */
    public function toArray(): ?array
    {
        return count($this->errors) > 0
            ? array_map(fn (ApiResponseError $error) => $error->toArray(), $this->errors)
            : null;
    }

    /**
     * prends le statusCode et si il y a un statusCode d'une erreur, le retourne.
     */
    public function determineStatusCode(int $inProgressStatusCode): int
    {
        $firstError = $this->firstError();

        return $firstError ? $firstError->statusCode() : $inProgressStatusCode;
    }

    /**
     * Retourne la première erreur ou null.
     */
    private function firstError(): ?ApiResponseError
    {
        return count($this->errors) > 0 ? $this->errors[0] : null;
    }
}
