<?php

use App\Http\Controllers\RestaurantController;
use Illuminate\Support\Facades\Route;

Route::get('/restaurant', [RestaurantController::class, 'search'])->name('restaurant');