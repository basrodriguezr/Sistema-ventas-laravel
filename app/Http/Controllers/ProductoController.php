<?php

namespace App\Http\Controllers;

use DataTables;
use App\Models\Categoria;
use App\Models\Producto;
use App\Models\MetodoPago;
use App\Models\Pedido;
use App\Models\User;
use App\Models\Cliente;
use App\Models\DetallePedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $data = [
            'count_user' => User::latest()->count(),
            'count_categoria' => Categoria::latest()->count(),
            'count_producto' => Producto::latest()->count(),
            'dataCategoria' => Categoria::all(),
            'count_metodopago' => MetodoPago::latest()->count(),
            'count_pedido' => Pedido::latest()->count(),
            'count_cliente' => Cliente::latest()->count(),


            'menu'       => 'menu.v_menu_admin',
            'content'    => 'content.view_producto',
            'title'    => 'Tabla de Productos'
        ];

        if ($request->ajax()) {
            //$q_producto = Producto::all();
            $q_producto = \DB::table('productos')
                ->join('categorias', 'productos.categoria_id', '=', 'categorias.id')
                ->select(
                    'productos.id as id',
                    'productos.nombreProducto as nombreProducto',
                    'productos.precio as precio',
                    'categorias.tipoCategoria as tipoCategoria'
                )
                ->get();

            return Datatables::of($q_producto)
                ->addIndexColumn()
                ->addColumn('action', function ($row) {

                    $btn = '<div data-toggle="tooltip"  data-id="' . $row->id . '" data-original-title="Edit" class="btn btn-sm btn-icon btn-outline-success btn-circle mr-2 edit editUser"><i class=" fi-rr-edit"></i></div>';
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
        Producto::updateOrCreate(
            ['id' => $request->producto_id],
            [
                'nombreProducto' => $request->nombreProducto,
                'precio' => $request->precio,
                'categoria_id' => $request->categoria_id
            ]
        );

        return response()->json(['success' => 'Producto creada exitosamente!']);
    }

    public function edit($id)
    {
        $Producto = Producto::find($id);
        return response()->json($Producto);
    }

    public function destroy($id)
    {
        Producto::find($id)->delete();

        return response()->json(['success' => 'Producto Eliminada!']);
    }
}
