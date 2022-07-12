<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\MetodoPagoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\InformeController;


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
    return redirect()->action([HomeController::class, 'index']);
});

Auth::routes();

Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/user', [UserController::class, 'index'])->name('user.index');
Route::get('/ventasdiarias', [InformeController::class, 'ventasDiarias'])->name('ventasdiarias.ventasDiarias');
Route::get('/ventasmensuales',[InformeController::class,'ventasMensuales'])->name('ventasmensuales.ventasMensuales');


// Route::get('/user.get_data',[UserController::class, 'get_data'])->name('get_data');
Route::resource('users', UsersController::class);
Route::resource('categorias', CategoriaController::class);
Route::resource('productos',ProductoController::class);
Route::resource('metodopagos',MetodoPagoController::class);
Route::resource('pedidos',PedidoController::class);
Route::resource('clientes',ClienteController::class);
Route::resource('informes',InformeController::class);
Route::resource('gastos',GastoController::class);

