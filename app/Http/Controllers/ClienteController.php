<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DataTables;
use App\Models\Categoria;
use App\Models\Producto;
use App\Models\MetodoPago;
use App\Models\Pedido;
use App\Models\User;
use App\Models\Cliente;

class ClienteController extends Controller
{
    public function index(Request $request)
    {
        $data = [
            'count_user' => User::latest()->count(),
            'count_categoria' => Categoria::latest()->count(),
            'count_producto' => Producto::latest()->count(),
            'dataMetodoPago' => MetodoPago::all(),
            'count_metodopago' => MetodoPago::latest()->count(),
            'count_pedido' => Pedido::latest()->count(),
            'count_cliente' => Cliente::latest()->count(),
            'menu'       => 'menu.v_menu_admin',
            'content'    => 'content.view_cliente',
            'title'    => 'Tabla Clientes'
        ];

        if ($request->ajax()) {
            $q_cliente = Cliente::all();
            return Datatables::of($q_cliente)
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
        Cliente::updateOrCreate(
            ['id' => $request->cliente_id],
            [
                'nombreCliente' => $request->nombreCliente,
                'telefono' => $request->telefono,
                'direccion' => $request->direccion
            ]
        );

        return response()->json(['success' => 'Cliente creada exitosamente!']);
    }

    public function edit($id)
    {
        $Cliente = Cliente::find($id);
        return response()->json($Cliente);
    }

    public function destroy($id)
    {
        Cliente::find($id)->delete();

        return response()->json(['success' => 'Cliente Eliminado!']);
    }
}
