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

class PedidoController extends Controller
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
            'content'    => 'content.view_pedido',
            'title'    => 'Tabla Pedidos'
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
                ->addColumn('action', function ($row) {

                    $btn = '<div data-toggle="tooltip"  data-id="' . $row->id . '" data-original-title="Show" class="btn btn-sm btn-icon btn-outline-warning btn-circle mr-2 show showUser"><i class="fi fi-rr-search-alt"></i></div>';

                    $btn = $btn . ' <div data-toggle="tooltip"  data-id="' . $row->id . '" data-original-title="Delete" class="btn btn-sm btn-icon btn-outline-danger btn-circle mr-2 deleteUser"><i class="fi-rr-trash"></i></div>';

                    return $btn;
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('layouts.v_template', $data);
    }

    public function store(Request $request)
    {


        $pedido = Pedido::updateOrCreate(
            ['id' => $request->pedido_id],
            [
                'user_id' => 1,
                'cliente_id' => $request->cliente_id,
                'metodoPago_id' => $request->metodoPago_id,
                'total' => $request->monto_total
            ]
        );

        $glosa = $request->glosaProductos;
        foreach ($glosa as $data) {

            DetallePedido::updateOrCreate([

                'pedido_id' => $pedido["id"],
                'producto_id' => $data[3],
                'cantidad' => $data[1],
                'monto' => $data[2]

            ]);
        }

        return response()->json(['success' => 'Producto creada exitosamente!']);
    }

    public function search($id)
    {
        $q_pedido = \DB::table('pedidos')
            ->rightJoin('detalle_pedidos', 'pedidos.id', '=', 'detalle_pedidos.pedido_id')
            ->join('clientes', 'pedidos.cliente_id', '=', 'clientes.id')
            ->join('productos', 'detalle_pedidos.producto_id', '=', 'productos.id')
            ->join('metodo_pagos', 'pedidos.metodoPago_id', '=', 'metodo_pagos.id')
            ->select(
                'pedidos.id as id',
                'productos.nombreProducto as nombreProducto',
                'detalle_pedidos.cantidad as cantidad',
                'clientes.nombreCliente as nombreCliente',
                'metodo_pagos.tipoPago as tipoPago',
                'pedidos.total as total',
                \DB::raw('date_format(pedidos.created_at, "%d-%m-%Y-%b %H:%i ") as fecha')
            )
            ->where('pedidos.id', '=', $id)
            ->get();
        return response()->json($q_pedido);
    }

    public function edit($id)
    {
        $Producto = Producto::find($id);
        return response()->json($Producto);
    }

    public function destroy($id)
    {
        Pedido::find($id)->delete();
        DB::table('detalle_pedidos')->where('pedido_id', $id)->delete();
        return response()->json(['success' => 'Producto Eliminada!']);
    }
}
