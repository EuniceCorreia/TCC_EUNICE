<?php

namespace App\Modules\Base\Helpers;

use Carbon\Carbon;

/**
* Helper que manipula data/hora
*/
class DateTimeHelper
{
   /**
    * @return string data/horário baseado no formato recebido
    */
   public static function date($format, $date)
   {
      return date($format, strtotime($date ?? Carbon::now()));
   }

   /**
    * @return string Formato "AAAA-MM-DDThh:mm:ssTZD"
    * (UTC - Universal Coordinated Time)
    */
   public static function getUTC($date = NULL)
   {
      return self::date("Y-m-d\TH:i:sP", $date);
   }

   /**
    * @return string Formato "TZD"
    */
   public static function getTimezone($date = NULL)
   {
      return self::date("P", $date);
   }

   /**
    * @return string Formato "AAAA-MM-DD"
    */
   public static function getDate($date = NULL)
   {
      return self::date("Y-m-d", $date);
   }

   /**
    * @return string Formato "hh:mm:ss"
    */
   public static function getTime($date = NULL)
   {
      return self::date("H:i:s", $date);
   }

   /**
   * @return string Formato "AAAA-MM-DD hh:mm:ss"
   */
   public static function getDateTime($date = NULL)
   {
      return self::date("Y-m-d H:i:s", $date);
   }

   /**
   * @return \Carbon\Carbon
   */
   public static function getCarbon($date = NULL)
   {
      return empty($date) ? Carbon::now() : Carbon::parse($date);
   }

   /**
   * @return \Carbon\Carbon
   */
   public static function carbonFrom($format, $date = NULL)
   {
      return empty($date) ? Carbon::now() : Carbon::createFromFormat($format, $date);
   }

   /**
    * @return string Formato "DD/MM/AAAA"
    */
   public static function getDateBar($date = NULL)
   {
      return self::date('d/m/Y', $date);
   }

   /**
    * @return string Formato "AAAAMM"
    */
   public static function getYearMonth($date = NULL)
   {
      return self::date('Ym', $date);
   }

   public static function dmyDateFilter(string $date)
   {
      $pieces = explode('/', $date);

      switch (strlen($date)) {
         case 2:
            return "-{$pieces[0]}";
         case 4:
            return "{$pieces[0]}-";
         case 5:
            return "{$pieces[1]}-{$pieces[0]}";
         case 10:
            return "{$pieces[2]}-{$pieces[1]}-{$pieces[0]}";
         default:
            return "$date";
      }
   }

   public static function convertW3C($datetime)
   {
   	$datetime = str_replace('T', ' ', $datetime);
   	$d = explode('.', $datetime);
   	return $d[0];
   }
}
