<?php

Route::get('categories/get', 'CategoryController@get')             ->name('categories.get');
Route::get('categories/find', 'CategoryController@find')           ->name('categories.find');
Route::get('categories/paginate', 'CategoryController@paginate')   ->name('categories.paginate');
Route::put('categories/{id}/restore', 'CategoryController@restore')->name('categories.restore');
Route::resource('categories', 'CategoryController');                     //categories resource