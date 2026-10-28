<?php

Route::get('images/get', 'ImageController@get')             ->name('images.get');
Route::get('images/find', 'ImageController@find')           ->name('images.find');
Route::get('images/paginate', 'ImageController@paginate')   ->name('images.paginate');
Route::put('images/{id}/restore', 'ImageController@restore')->name('images.restore');
Route::resource('images', 'ImageController');                     //images resource