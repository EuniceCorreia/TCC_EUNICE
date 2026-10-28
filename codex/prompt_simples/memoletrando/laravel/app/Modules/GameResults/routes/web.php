<?php

Route::get('game-results/get', 'GameResultController@get')             ->name('game-results.get');
Route::get('game-results/find', 'GameResultController@find')           ->name('game-results.find');
Route::get('game-results/paginate', 'GameResultController@paginate')   ->name('game-results.paginate');
Route::put('game-results/{id}/restore', 'GameResultController@restore')->name('game-results.restore');
Route::resource('game-results', 'GameResultController');                     //game-results resource