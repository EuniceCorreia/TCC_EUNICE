<?php

use App\Modules\Levels\Http\Controllers\LevelController;

Route::get('levels/get', [LevelController::class, 'get']);
Route::get('levels/find', [LevelController::class, 'find']);
Route::get('levels/paginate', [LevelController::class, 'paginate']);
Route::put('levels/{id}/restore', [LevelController::class, 'restore']);
Route::resource('levels', LevelController::class);