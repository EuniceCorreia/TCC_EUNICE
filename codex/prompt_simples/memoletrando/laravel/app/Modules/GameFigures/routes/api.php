<?php

use App\Modules\GameFigures\Http\Controllers\GameFigureController;

Route::get('game-figures/get', [GameFigureController::class, 'get']);
Route::get('game-figures/find', [GameFigureController::class, 'find']);
Route::get('game-figures/paginate', [GameFigureController::class, 'paginate']);
Route::put('game-figures/{id}/restore', [GameFigureController::class, 'restore']);
Route::resource('game-figures', GameFigureController::class);