<?php

Route::get('themes/get', 'ThemeController@get')             ->name('themes.get');
Route::get('themes/find', 'ThemeController@find')           ->name('themes.find');
Route::get('themes/paginate', 'ThemeController@paginate')   ->name('themes.paginate');
Route::put('themes/{id}/restore', 'ThemeController@restore')->name('themes.restore');
Route::resource('themes', 'ThemeController');                     //themes resource