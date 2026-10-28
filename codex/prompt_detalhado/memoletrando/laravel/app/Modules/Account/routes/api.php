<?php

use App\Modules\Account\Http\Controllers\AccessLevelController;
use App\Modules\Account\Http\Controllers\TokenController;
use App\Modules\Account\Http\Controllers\UserController;
use App\Modules\Account\Http\Controllers\UserPermissionCategoryController;
use App\Modules\Account\Http\Controllers\UserPermissionController;

Route::post('users/authenticate', [TokenController::class, 'authenticate']);
Route::post('users/forgot-password', [UserController::class, 'sendResetLinkEmail']);
Route::post('users/validate-reset-token', [UserController::class, 'validateResetToken']);
Route::put('users/update-password', [UserController::class, 'updatePassword']);
Route::post('users/validate-login', [TokenController::class, 'validateLogin']);
Route::get('users/validate-token', [TokenController::class, 'validateToken']);
Route::get('users/check-email', [UserController::class, 'checkEmailAvailability']);
Route::get('users/get-teachers', [UserController::class, 'getTeachers']);

Route::group(['middleware' => ['jwt.auth', 'jwt.refresh']], function () {
    Route::get('users/get', [UserController::class, 'get']);
    Route::get('users/find', [UserController::class, 'find']);
    Route::get('users/paginate', [UserController::class, 'paginate']);
    Route::put('users/{id}/restore', [UserController::class, 'restore']);
    Route::resource('users', UserController::class); //users resource

    Route::get('access-levels/get', [AccessLevelController::class, 'get']);
    Route::get('access-levels/find', [AccessLevelController::class, 'find']);
    Route::get('access-levels/paginate', [AccessLevelController::class, 'paginate']);
    Route::put('access-levels/{id}/restore', [AccessLevelController::class, 'restore']);
    Route::resource('access-levels', AccessLevelController::class); //access-levels resource

    Route::get('user-permissions/get', [UserPermissionController::class, 'get']);
    Route::get('user-permissions/find', [UserPermissionController::class, 'find']);

    Route::get('user-permission-categories/get', [UserPermissionCategoryController::class, 'get']);
    Route::get('user-permission-categories/find', [UserPermissionCategoryController::class, 'find']);
});
