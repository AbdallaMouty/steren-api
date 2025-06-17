<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\WebAdminUserController;
use App\Http\Controllers\WebCarController;
use App\Models\AppUser;
use App\Models\Car;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $data = Car::all();

        return Inertia::render('dashboard', ['data' => $data]);
    })->name('dashboard');

    Route::get('users', function () {
        $users = AppUser::all();
        $cars  = Car::all();

        return Inertia::render('users', ['data' => $users, 'cars' => $cars]);
    })->name('users');

    Route::get('users/edit', function () {
        $users = AppUser::all();
        $data  = Car::all();

        return Inertia::render('users/edit', ['data' => $users, 'cars' => $data]);
    })->name('users/edit');

    Route::get('listings', function () {
        $users = AppUser::all();
        $data  = Car::all();

        return Inertia::render('listings', ['data' => $users, 'cars' => $data]);
    })->name('listings');

    Route::get('users/edit', function () {
        $users = AppUser::all();
        $data  = Car::all();

        return Inertia::render('users/edit', ['data' => $users, 'cars' => $data]);
    })->name('users/edit');

    Route::get('listings/car', function () {
        $data = Car::all();

        return Inertia::render('listings/car', ['cars' => $data]);
    })->name('listings/car');

    Route::get('promotions', function () {
        return Inertia::render('promotions');
    })->name('promotions');

    Route::get('emp-settings', function () {
        return Inertia::render('emp-settings');
    })->name('emp-settings');

    Route::get('analytics', function () {
        return Inertia::render('analytics');
    })->name('analytics');

    Route::get('dealers', function () {
        $data = AppUser::all();
        $cars = Car::all();

        return Inertia::render('dealers', ['data' => $data, 'cars' => $cars]);
    })->name('dealers');

    Route::prefix('cars')->group(function () {
        Route::get('/', [WebCarController::class, 'index']);
        Route::get('/all', [WebCarController::class, 'allCars']);
        Route::post('/', [WebCarController::class, 'store']);
        Route::post('/{car}', [WebCarController::class, 'update']);
        Route::delete('/{car}', [WebCarController::class, 'destroy']);
        Route::post('/{car}/approve', [WebCarController::class, 'approve']);
        Route::post('/{car}/reject', [WebCarController::class, 'reject']);
        Route::post('/{car}/pause', [WebCarController::class, 'pause']);
        Route::post('/{car}/boost', [WebCarController::class, 'boost']);
        Route::post('/{car}/sold', [WebCarController::class, 'sold']);
        Route::post('/{car}/reset', [WebCarController::class, 'resetStatus']);
    });

    Route::prefix('users')->group(function () {
        Route::put('/{app_user}', [WebAdminUserController::class, 'update']);
        Route::delete('/{app_user}', [WebAdminUserController::class, 'destroy']);
        Route::post('/{app_user}/suspend', [WebAdminUserController::class, 'suspend']);
        Route::post('/{app_user}/restore', [WebAdminUserController::class, 'restore']);
        Route::post('/{app_user}/authorize', [WebAdminUserController::class, 'authorize']);
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
