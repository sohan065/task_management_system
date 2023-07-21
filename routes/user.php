<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('registration', [UserController::class, 'userRegistration']);
Route::post('login', [UserController::class, 'userLogin']);
Route::get('logout', [UserController::class, 'userLogout']);
Route::post('create/task', [UserController::class, 'createUserTask']);
Route::post('task/assign', [UserController::class, 'taskAssign']);

