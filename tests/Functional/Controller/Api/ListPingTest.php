<?php

declare(strict_types=1);

namespace Hecate\Tests\Functional\Controller\Api;

use Hecate\Controller\Api\Ping\ListPing;
use Hecate\Infrastructure\ApiResponse\ApiResponse;
use Hecate\Infrastructure\ApiResponse\ApiResponseFactory;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseData;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseLink;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMessage;
use Hecate\Infrastructure\ApiResponse\Component\ApiResponseMeta;
use Hecate\Infrastructure\ApiResponse\Exception\Error\ListError;
use Hecate\Tests\Functional\HecateFunctionalTestCase;
use PHPUnit\Framework\Attributes\CoversClass;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;

#[
    CoversClass(ListPing::class),
    CoversClass(ApiResponse::class),
    CoversClass(ApiResponseFactory::class),
    CoversClass(ApiResponseData::class),
    CoversClass(ApiResponseLink::class),
    CoversClass(ApiResponseMessage::class),
    CoversClass(ApiResponseMeta::class),
    CoversClass(ListError::class)
]
class ListPingTest extends HecateFunctionalTestCase
{
    private KernelBrowser $client;

    public function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testIndexReturnsExpectedResponse(): void
    {
        $this->client->request('GET', '/api/pings');
        self::assertResponseIsSuccessful();

        $content = $this->client->getResponse()->getContent();
        self::assertNotFalse($content, 'Réponse vide ou inaccessible');
        self::assertSame(200, $this->client->getResponse()->getStatusCode());

        self::assertJson($content, 'Réponse non valide JSON');
        $decoded = json_decode($content, true);
        self::assertIsArray($decoded, 'La réponse n’est pas un JSON valide');

        self::assertArrayHasKey('data', $decoded);
        self::assertSame([['ping' => 'ping']], $decoded['data']);
    }
}
