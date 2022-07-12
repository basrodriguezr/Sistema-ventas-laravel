<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use DateTime;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Pedido;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {

        date_default_timezone_set('America/Santiago');
        $start_date = \Carbon\Carbon::now();
        $fecha = $start_date->format('Y-m-d');
        $fechaInicial = $fecha . ' 00:00:00';
        $fechaFinal = $fecha . ' 23:59:50';
        $primerdiames = Carbon::now()->firstOfMonth()->startOfDay();
        $ultimodiames = Carbon::now()->lastOfMonth()->endOfDay();

        $data = array(
            'count_user' => DB::table('users')->count(),
            'menu'      => 'menu.v_menu_admin',
            'content' => 'content.view_dashboard',
            'count_pedidos' => DB::table('pedidos')->count(),
            'count_productos' => DB::table('productos')->count(),
            'count_clientes' => DB::table('clientes')->count(),
            'count_dinero_pedidos' => Pedido::whereBetween('pedidos.created_at', [$fechaInicial, $fechaFinal])->sum('pedidos.total'),
            'count_dinero_mes' => Pedido::whereBetween('pedidos.created_at', [$primerdiames, $ultimodiames])->sum('pedidos.total')

        );
        return view('layouts.v_template', $data);
    }
}
