<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $categoryCount = \App\Models\Category::count();
    $itemCount = \App\Models\Item::count();
    $transactionCount = \App\Models\Transaction::count();
    $totalSales = \App\Models\Transaction::sum('total') ?? 0;

    return Inertia::render('Dashboard', [
        'categoryCount' => $categoryCount,
        'itemCount' => $itemCount,
        'transactionCount' => $transactionCount,
        'totalSales' => $totalSales,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\TransactionController;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // POS Routes
    Route::resource('categories', CategoryController::class)->except(['create', 'show', 'edit']);
    Route::resource('items', ItemController::class)->except(['create', 'show', 'edit']);
    
    Route::get('cashier', [PosController::class, 'index'])->name('cashier.index');
    Route::post('cashier', [PosController::class, 'store'])->name('cashier.store');
    Route::get('cart', [PosController::class, 'cart'])->name('cart.index');
    Route::post('cart/checkout', [PosController::class, 'checkout'])->name('cart.checkout');

    // Transaction history + receipt
    Route::get('transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');
});

require __DIR__.'/auth.php';
