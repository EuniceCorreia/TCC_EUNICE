<?php

use App\Modules\GameEvents\Http\Controllers\GameEventController;

Route::get('game-events/get', [GameEventController::class, 'get']);
Route::get('game-events/find', [GameEventController::class, 'find']);
Route::get('game-events/paginate', [GameEventController::class, 'paginate']);
Route::put('game-events/{id}/restore', [GameEventController::class, 'restore']);
Route::post('game-events/save-multiple', [GameEventController::class, 'saveMultiple']);
Route::resource('game-events', GameEventController::class);
