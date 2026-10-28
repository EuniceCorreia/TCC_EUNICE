<?php

use App\Modules\Categories\Http\Controllers\CategoryController;

Route::get('categories/get', [CategoryController::class, 'get']);
Route::get('categories/find', [CategoryController::class, 'find']);
Route::get('categories/paginate', [CategoryController::class, 'paginate']);
Route::put('categories/{id}/restore', [CategoryController::class, 'restore']);
Route::resource('categories', CategoryController::class);