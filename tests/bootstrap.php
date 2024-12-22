<?php

use Hecate\Kernel;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

(new Dotenv())->bootEnv(dirname(__DIR__).'/.env.dev');
(new Dotenv())->bootEnv(dirname(__DIR__).'/.env.test');

$kernel = new Kernel('test', true);
$kernel->boot();

$application = new Application($kernel);
$application->setAutoExit(false);

if ($_SERVER['APP_DEBUG']) {
    umask(0000);
}

$kernel->shutdown();
