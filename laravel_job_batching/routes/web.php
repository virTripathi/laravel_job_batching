<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('file-uploads',\App\Http\Controllers\FileUploadController::class);
Route::get('file-upload-batch/{id}',[\App\Http\Controllers\FileUploadController::class,'getBatch']);