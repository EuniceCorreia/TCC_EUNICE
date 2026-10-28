<?php

Route::get('auditings/get', 'AuditingController@get')             ->name('auditings.get');
Route::get('auditings/find', 'AuditingController@find')           ->name('auditings.find');
Route::get('auditings/paginate', 'AuditingController@paginate')   ->name('auditings.paginate');
Route::put('auditings/{id}/restore', 'AuditingController@restore')->name('auditings.restore');
Route::resource('auditings', 'AuditingController');                     //auditings resource