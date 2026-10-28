<?php

namespace App\Modules\Base\Helpers;

use stdClass;

class ArrayHelper
{
    /**
     * Remove valores nulos do array
     * Opcionalmente, ignora arrays filhos
     *
     * @param array $array
     *
     * @param bool $include_children
     *
     * @return array
     */
    public static function unsetNullValues(array $array = [], bool $include_children = true)
    {
        foreach ($array as $key => $value) {
            if ($include_children && is_array($value)) {
                $array[$key] = self::unsetNullValues($value);
            } else {
                if ($value === null) {
                    unset($array[$key]);
                }
            }
        }

        return $array;
    }

    /**
     * Transforma um objeto stdClass em array
     *
     * @param mixed $array
     *
     * @return array
     */
    public static function arrayCastRecursive($array)
    {
        if (is_array($array)) {
            foreach ($array as $key => $value) {
                if (is_array($value)) {
                    $array[$key] = self::arrayCastRecursive($value);
                }
                if ($value instanceof stdClass) {
                    $array[$key] = self::arrayCastRecursive((array) $value);
                }
            }
        }

        if ($array instanceof stdClass) {
            return self::arrayCastRecursive((array) $array);
        }

        return $array;
    }
}
