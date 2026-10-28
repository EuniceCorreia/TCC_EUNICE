<?php

use App\Modules\Configs\Http\Controllers\ConfigController;

Route::get('configs/get', [ConfigController::class, 'get']);
Route::put('configs', [ConfigController::class, 'update']);
Route::put('configs/toggle-open-fiscal-years', [ConfigController::class, 'toggleOpenFiscalYears']);
Route::put('configs/update-actual-date', [ConfigController::class, 'updateActualDate']);
Route::get('new-access-level/{category_name}/{category_type}/{unique_permission?}/{unique_name?}', [ConfigController::class, 'new_access_level']);
