<?php

use App\Modules\Themes\Http\Controllers\ThemeController;

Route::get('themes/get', [ThemeController::class, 'get']);
Route::get('themes/find', [ThemeController::class, 'find']);
Route::get('themes/paginate', [ThemeController::class, 'paginate']);
Route::put('themes/save-order', [ThemeController::class, 'saveOrder']);
Route::put('themes/{id}/restore', [ThemeController::class, 'restore']);
Route::resource('themes', ThemeController::class);
