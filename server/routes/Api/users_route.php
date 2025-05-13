<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post("/register", [UserController::class, "register"])->name("register");
Route::post("/login", [UserController::class, "login"])->name("login");
Route::post("/google_login", [UserController::class, "googleLogin"])->name("google_login");


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post("/update_user", [UserController::class, "update"])->name("update");
});
