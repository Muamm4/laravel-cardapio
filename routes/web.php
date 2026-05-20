<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CustomerOrderController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;

Route::get('/', [MenuController::class, 'index'])->name('menu');
Route::get('/cart', function () { return Inertia::render('customer/Cart'); })->name('cart');
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

Route::middleware(['auth'])->group(function () {
    Route::get('/my-orders', [CustomerOrderController::class, 'index'])->name('customer.orders');
    Route::resource('addresses', AddressController::class)->only(['store', 'update', 'destroy']);
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('orders', AdminOrderController::class);
    Route::patch('orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.update-status');
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
