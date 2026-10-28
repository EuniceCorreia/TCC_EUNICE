<?php

namespace App\Modules\Base\Helpers;

/**
 * Funções helpers para strings
 */
class StringHelper
{
    public static function phone($string = null)
    {
        if (!is_numeric($string)) {
            return $string;
        }

        $mask = self::getBrPhoneMask(strlen($string));

        if (empty($mask)) {
            return $string;
        }

        $numbers = str_split($string);

        foreach ($numbers as $number) {
            $position = strpos($mask, '#');
            if ($position !== false) {
                $mask = substr_replace($mask, $number, $position, 1);
            }
        }

        return $mask;
    }

    private static function getBrPhoneMask(int $string_length)
    {
        switch ($string_length) {
            case 8:
                return '####-####';
            case 9:
                return '#####-####';
            case 10:
                return '(##) ####-####';
            case 11:
                return '(##) #####-####';
            case 12:
                return '+## (##) ####-####';
            case 13:
                return '+## (##) #####-####';
            default:
                return '';
        }
    }

    public static function money($number, $currency = 'R$ ')
    {
        if (empty($number)) {
            return '';
        }

        $formatted_number = number_format($number, 2, ',', '.');

        return "{$currency}{$formatted_number}";
    }

    public static function resumo(string $string, int $word_limit)
    {
        $string = strip_tags($string);
        $words = explode(" ", $string);
        $dots = (count($words) > $word_limit) ? ' ...' : '';

        return implode(" ", array_splice($words, 0, $word_limit)) . $dots;
    }

    public static function letterResumo(string $string, int $letter_limit)
    {
        $string = strip_tags($string);
        $letters = strlen($string);
        $dots = ($letters > $letter_limit) ? ' ...' : '';
        $shortened_string = substr($string, 0, $letter_limit);
        $words = explode(" ", $shortened_string);
        array_pop($words);

        return implode(" ", array_splice($words, 0)) . $dots;
    }

    /**
     *
     */
    public static function ucWords(string $string)
    {
        return ucwords(mb_strtolower($string));
    }

    public static function cleanNumber($number)
    {
        return trim(
            str_replace(['(', ')', ' ', '-', '.', ',', '/', '_', '+'], '', $number)
        );
    }

    public static function cpf(string $cpf)
    {
        $mask    = '###.###.###-##';

        $numbers = str_split($cpf);

        foreach ($numbers as $number) {
            $position = strpos($mask, '#');
            if ($position !== false) {
                $mask = substr_replace($mask, $number, $position, 1);
            }
        }

        return $mask;
    }

    public static function number($number, $dec = 2)
    {
        return number_format($number, $dec, ',', '');
    }

    public static function percentage($number)
    {
        return self::number((float) $number * 100) . '%';
    }
}
