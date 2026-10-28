<?php

Route::get('game-events/get', 'GameEventController@get')             ->name('game-events.get');
Route::get('game-events/find', 'GameEventController@find')           ->name('game-events.find');
Route::get('game-events/paginate', 'GameEventController@paginate')   ->name('game-events.paginate');
Route::put('game-events/{id}/restore', 'GameEventController@restore')->name('game-events.restore');
Route::resource('game-events', 'GameEventController');                     //game-events resource