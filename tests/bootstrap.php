<?php

use Hecate\Kernel;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

$dotenv = new Dotenv();
$dotenv->usePutenv()->overload(dirname(__DIR__).'/.env.dev');
$dotenv->usePutenv()->overload(dirname(__DIR__).'/.env.test');

$kernel = new Kernel('test', true);
$kernel->boot();

$application = new Application($kernel);
$application->setAutoExit(false);

$kernel->shutdown();
