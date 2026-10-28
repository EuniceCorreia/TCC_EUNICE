<?php
Route::post('images/upload-temp-image', 'ImageController@uploat_to_temp');

Route::get('images/get', 'ImageController@get')             ->name('images.get');
Route::get('images/find', 'ImageController@find')           ->name('images.find');
Route::get('images/paginate', 'ImageController@paginate')   ->name('images.paginate');
Route::put('images/{id}/restore', 'ImageController@restore')->name('images.restore');
Route::put('images/reorder', 'ImageController@reorder');
Route::resource('images', 'ImageController');                     //images resource