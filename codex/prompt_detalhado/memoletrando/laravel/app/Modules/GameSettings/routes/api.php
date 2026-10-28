<?php

use App\Modules\GameSettings\Http\Controllers\GameSettingController;

Route::get('game-settings/get', [GameSettingController::class, 'get']);
Route::get('game-settings/find', [GameSettingController::class, 'find']);
Route::get('game-settings/paginate', [GameSettingController::class, 'paginate']);
Route::get('game-settings/get-setting-and-images/{id}', [GameSettingController::class, 'getSettingAndImages']);
Route::put('game-settings/{id}/restore', [GameSettingController::class, 'restore']);
Route::resource('game-settings', GameSettingController::class);
