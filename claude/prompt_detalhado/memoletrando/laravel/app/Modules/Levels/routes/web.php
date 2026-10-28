<?php

Route::get('levels/get', 'LevelController@get')             ->name('levels.get');
Route::get('levels/find', 'LevelController@find')           ->name('levels.find');
Route::get('levels/paginate', 'LevelController@paginate')   ->name('levels.paginate');
Route::put('levels/{id}/restore', 'LevelController@restore')->name('levels.restore');
Route::resource('levels', 'LevelController');                     //levels resource