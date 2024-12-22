<?php

declare(strict_types=1);

namespace Hecate\Infrastructure\ApiResponse\Exception\Custom\Ping;

use Hecate\Infrastructure\ApiResponse\Exception\Custom\AbstractApiResponseException;
use Hecate\Infrastructure\ApiResponse\Exception\Error\Error;
use Symfony\Component\HttpFoundation\Response;

class PingBadRequestException extends AbstractApiResponseException
{
    /**
     * @param string $getMessage
     * @param int $statusCode
     * @param array<Error>|null $errors
     */
    public function __construct(
        string $getMessage = '',
        int $statusCode = Response::HTTP_BAD_REQUEST,
        ?array $errors = null,
    ) {
        $statusTexts = Response::$statusTexts;

        if ('' === $getMessage && true === array_key_exists($statusCode, $statusTexts)) {
            $getMessage = $statusTexts[$statusCode];
        }

        parent::__construct($getMessage, $statusCode, $errors);
    }
}
