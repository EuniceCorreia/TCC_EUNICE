<?php

use App\Modules\GameResults\Http\Controllers\GameResultController;

Route::get('game-results/get', [GameResultController::class, 'get']);
Route::get('game-results/find', [GameResultController::class, 'find']);
Route::get('game-results/paginate', [GameResultController::class, 'paginate']);
Route::put('game-results/{id}/restore', [GameResultController::class, 'restore']);
Route::resource('game-results', GameResultController::class);