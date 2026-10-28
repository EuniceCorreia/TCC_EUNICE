<?php

Route::get('game-figures/get', 'GameFigureController@get')             ->name('game-figures.get');
Route::get('game-figures/find', 'GameFigureController@find')           ->name('game-figures.find');
Route::get('game-figures/paginate', 'GameFigureController@paginate')   ->name('game-figures.paginate');
Route::put('game-figures/{id}/restore', 'GameFigureController@restore')->name('game-figures.restore');
Route::resource('game-figures', 'GameFigureController');                     //game-figures resource