<?php

use PhpCsFixer\Config;
use PhpCsFixer\Finder;
use PhpCsFixer\Runner\Parallel\ParallelConfigFactory;

if (!is_dir(__DIR__.'/../var/cache/') && !mkdir($concurrentDirectory = __DIR__.'/../var/cache/') && !is_dir($concurrentDirectory)) {
    throw new RuntimeException(sprintf('Directory "%s" was not created', $concurrentDirectory));
}

if (!is_dir(__DIR__.'/../var/cache/qa/') && !mkdir($concurrentDirectory = __DIR__.'/../var/cache/qa/') && !is_dir($concurrentDirectory)) {
    throw new RuntimeException(sprintf('Directory "%s" was not created', $concurrentDirectory));
}

$finder = (new Finder())
    ->in([
        __DIR__.'/../src',
        __DIR__.'/../fixtures',
        __DIR__.'/../qa/src',
        __DIR__.'/../tests',
    ])
    ->exclude('var')
;

return (new Config())
    ->setFinder($finder)
    ->setCacheFile(__DIR__.'/../var/cache/qa/.php-cs-fixer.cache')
    ->setParallelConfig(ParallelConfigFactory::detect())
    ->setRules([
        '@Symfony' => true,
        'no_unused_imports' => true,
        'global_namespace_import' => false,
        'no_extra_blank_lines' => true,
        'no_empty_phpdoc' => true,
        'single_line_empty_body' => true,
        'no_superfluous_phpdoc_tags' => [
            'remove_inheritdoc' => true,
        ],
        'fully_qualified_strict_types' => [
            'import_symbols' => true,
        ],
    ])
;
