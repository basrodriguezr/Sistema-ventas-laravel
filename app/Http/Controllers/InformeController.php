<?php

namespace App\Http\Controllers;

use DataTables;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Models\Producto;
use App\Models\MetodoPago;
use App\Models\Pedido;
use App\Models\User;
use App\Models\Cliente;
use App\Models\DetallePedido;
use Carbon\Carbon;



class InformeController extends Controller
{
    public function index(Request $request)
    {

        $data = [
            'count_user' => User::latest()->count(),
            'count_categoria' => Categoria::latest()->count(),
            'count_producto' => Producto::latest()->count(),
            'dataCategoria' => Categoria::all(),
            'dataProducto' => Producto::all(),
            'dataMetodoPago' => MetodoPago::all(),
            'dataCliente' => Cliente::all(),
            'count_metodopago' => MetodoPago::latest()->count(),
            'count_pedido' => Pedido::latest()->count(),
            'count_cliente' => Cliente::latest()->count(),
            'menu'       => 'menu.v_menu_admin',
            'content'    => 'content.view_informe',
            'title'    => 'Tabla Informe Ventas'
        ];
        if ($request->ajax()) {
            //$q_pedido = Pedido::all();
            $q_pedido = \DB::table('pedidos')
                ->leftjoin('clientes', 'pedidos.cliente_id', '=', 'clientes.id')
                ->leftjoin('metodo_pagos', 'pedidos.metodoPago_id', '=', 'metodo_pagos.id')
                ->select(
                    'pedidos.id as id',
                    'clientes.nombreCliente as nombreCliente',
                    'metodo_pagos.tipoPago as tipoPago',
                    'pedidos.total as total',
                    \DB::raw('date_format(pedidos.created_at, "%d-%m-%Y %H:%i ") as fecha')
                )
                ->get();
            return Datatables::of($q_pedido)
                ->addIndexColumn()
                ->make(true);
        }

        return view('layouts.v_template', $data);
    }

    public function ventasDiarias(Request $request)
    {
        $start_date = \Carbon\Carbon::now();
        $fecha = $start_date->format('Y-m-d');
        $fechaInicial = $fecha . ' 00:00:00';
        $fechaFinal = $fecha . ' 23:59:50';

        $data = [
            'count_user' => User::latest()->count(),
            'count_categoria' => Categoria::latest()->count(),
            'count_producto' => Producto::latest()->count(),
            'dataCategoria' => Categoria::all(),
            'dataProducto' => Producto::all(),
            'dataMetodoPago' => MetodoPago::all(),
            'dataCliente' => Cliente::all(),
            'count_metodopago' => MetodoPago::latest()->count(),
            'count_pedido' => Pedido::latest()->count(),
            'count_cliente' => Cliente::latest()->count(),
            'menu'       => 'menu.v_menu_admin',
            'content'    => 'content.view_ventas_diarias',
            'title'    => 'Tabla Informe Ventas'
        ];
        if ($request->ajax()) {
            //$q_pedido = Pedido::all();
            $q_pedido = \DB::table('pedidos')
                ->leftjoin('clientes', 'pedidos.cliente_id', '=', 'clientes.id')
                ->leftjoin('metodo_pagos', 'pedidos.metodoPago_id', '=', 'metodo_pagos.id')
                ->whereBetween('pedidos.created_at', [$fechaInicial, $fechaFinal])
                ->select(
                    'pedidos.id as id',
                    'clientes.nombreCliente as nombreCliente',
                    'metodo_pagos.tipoPago as tipoPago',
                    'pedidos.total as total',
                    \DB::raw('date_format(pedidos.created_at, "%d-%m-%Y %H:%i ") as fecha'),
                    \DB::raw('SUM(pedidos.total) as Total')
                )
                ->groupBy('id')
                ->get();
            return Datatables::of($q_pedido)
                ->addIndexColumn()
                ->make(true);
        }

        return view('layouts.v_template', $data);
    }



    public function ventasMensuales(Request $request)
    {
        $primerdiames = Carbon::now()->firstOfMonth()->startOfDay();
        $ultimodiames = Carbon::now()->lastOfMonth()->endOfDay();

        $data = [
            'count_user' => User::latest()->count(),
            'count_categoria' => Categoria::latest()->count(),
            'count_producto' => Producto::latest()->count(),
            'dataCategoria' => Categoria::all(),
            'dataProducto' => Producto::all(),
            'dataMetodoPago' => MetodoPago::all(),
            'dataCliente' => Cliente::all(),
            'count_metodopago' => MetodoPago::latest()->count(),
            'count_pedido' => Pedido::latest()->count(),
            'count_cliente' => Cliente::latest()->count(),
            'menu'       => 'menu.v_menu_admin',
            'content'    => 'content.view_ventas_mensuales',
            'title'    => 'Tabla Informe Ventas Mensuales'
        ];
        if ($request->ajax()) {
            //$q_pedido = Pedido::all();
            $q_pedido = \DB::table('pedidos')
                ->leftjoin('clientes', 'pedidos.cliente_id', '=', 'clientes.id')
                ->leftjoin('metodo_pagos', 'pedidos.metodoPago_id', '=', 'metodo_pagos.id')
                ->whereBetween('pedidos.created_at', [$primerdiames, $ultimodiames])
                ->select(
                    'pedidos.id as id',
                    'clientes.nombreCliente as nombreCliente',
                    'metodo_pagos.tipoPago as tipoPago',
                    'pedidos.total as total',
                    \DB::raw('date_format(pedidos.created_at, "%d-%m-%Y %H:%i ") as fecha'),
                    \DB::raw('SUM(pedidos.total) as TotalSuma')
                )
                ->groupBy('id')
                ->get();
            return Datatables::of($q_pedido)
                ->addIndexColumn()
                ->make(true);
        }

        return view('layouts.v_template', $data);
    }
}
