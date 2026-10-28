<?php

Route::get('game-settings/get', 'GameSettingController@get')             ->name('game-settings.get');
Route::get('game-settings/find', 'GameSettingController@find')           ->name('game-settings.find');
Route::get('game-settings/paginate', 'GameSettingController@paginate')   ->name('game-settings.paginate');
Route::put('game-settings/{id}/restore', 'GameSettingController@restore')->name('game-settings.restore');
Route::resource('game-settings', 'GameSettingController');                     //game-settings resource