<?php

namespace App\Modules\ModuleGenerator\Templates;

use Illuminate\Support\Str;

class ModuleTemplate
{
    public function __construct(string $name, string $namespace)
    {
        $this->name      = $name;
        $this->namespace = $namespace;
    }

    public function getName()
    {
        return Str::studly($this->getType());
    }

    public function getPath()
    {
        $sep = DIRECTORY_SEPARATOR;
        return app_path("{$sep}Modules{$sep}{$this->namespace}{$sep}");
    }

    public function getBaseNamespace()
    {
        $sep = DIRECTORY_SEPARATOR;
        return "App\\Modules\\{$this->namespace}";
    }

    public function getStub()
    {
        $directory = __DIR__;
        $sep       = DIRECTORY_SEPARATOR;
        $stub_file = "{$directory}{$sep}{$this->getName()}{$sep}{$this->getType()}.stub";

        // if (!is_file($stub_file)) {
        //     if ($this->confirm("Não existe um modelo pronto para o tipo \"{$this->getType()}\", deseja criar uma classe vazia ?")) {
        //         $stub_file = "{$directory}{$sep}..{$sep}generic.stub";
        //     }
        // }

        return file_get_contents($stub_file);
    }

    public function make()
    {
        $module_path = $this->getPath();

        if (!is_dir($module_path)) {
            mkdir($module_path, 0777, true);
        }

        // if (isset($this->requires[$type])) {
        //    foreach ($this->requires[$type] as $file => $destination) {

        //       if (!is_dir(base_path($destination))) {
        //          mkdir(base_path($destination), 0777, true);
        //       }

        //       $this->createFile(
        //          base_path($destination) . $file,
        //          file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'stubs' . DIRECTORY_SEPARATOR . 'requires' . DIRECTORY_SEPARATOR . $file),
        //          true
        //       );
        //    }
        // }

        $sep = DIRECTORY_SEPARATOR;

        $this->createFile("{$module_path}{$sep}{$this->getFileName()}", $this->parseStub());

        return $this->getFullPath();
    }

    public function getFullPath()
    {
        $path = app_path();
        $path = rtrim(str_replace("$path//", 'App/', $this->getPath()) . DIRECTORY_SEPARATOR . $this->getFileName(), "/");
        return str_replace('//', '/', $path);
    }

    protected function parseStub()
    {
        $name = $this->name;
        $type = $this->getType();

        return str_replace(
            [
                '{{ModelName}}',
                '{{ModelNameSingularLowerCase}}',
                '{{ModelNamePluralLowerCase}}',
                '{{ModelNameSingularUpperCase}}',
                '{{ModelNamePluralUpperCase}}',
                '{{Namespace}}',
                '{{TypeUpperCase}}',
                '{{TypeLowerCase}}',
                '{{ModelNameUrl}}',
            ],
            [
                $name,
                Str::of($name)->snake(),
                Str::of(Str::plural($name))->snake(),
                $this->pascal_case($name),
                $this->pascal_case(Str::plural($name)),
                $this->getBaseNamespace(),
                $this->pascal_case($type),
                Str::of($type)->snake(),
                $this->url_case($name),
            ],
            $this->getStub()
        );
    }

    private function createFile(string $file_path, $content, $skip_confirmation = false)
    {
        // if (!$skip_confirmation && is_file($file_path)) {
        //     $rewrite = $this->confirm("O arquivo \"$file_path\" já existe, deseja sobrescreve-lo?");
        // }

        if (!isset($rewrite) || $rewrite === true) {
            return $this->writeFile($file_path, $content);
        }
    }

    private function writeFile(string $file_path, $content)
    {
        file_put_contents($file_path, $content);

        return $file_path;
    }

    protected function pascal_case(string $string)
    {
        return ucfirst(str_replace('_', '', Str::title(Str::of($string)->snake())));
    }

    protected function url_case(string $string)
    {
        return str_replace('_', '-', Str::of(Str::plural($string))->snake());
    }
}
