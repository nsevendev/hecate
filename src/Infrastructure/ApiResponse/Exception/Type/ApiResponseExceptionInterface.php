<?php

namespace Hecate\Infrastructure\ApiResponse\Exception\Type;

use Symfony\Component\HttpFoundation\JsonResponse;

interface ApiResponseExceptionInterface
{
    /**
     * Retourne le code HTTP associé à cette exception.
     */
    public function getStatusCode(): int;

    /**
     * Retourne une structure de données (tableau) représentant l'erreur, prête à être sérialisée en JSON.
     */
    public function toApiResponse(): JsonResponse;
}
