<?php

namespace App\Http\Controllers;

use DataTables;
use App\Models\User;
use App\Models\Categoria;
use App\Models\Producto;
use App\Models\MetodoPago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MetodoPagoController extends Controller
{
    public function index(Request $request)
    {
        $data = [
            'count_user' => User::latest()->count(),
            'count_categoria' => Categoria::latest()->count(),
            'count_producto' => Producto::latest()->count(),
            'count_metodopago' => MetodoPago::latest()->count(),
            'menu'       => 'menu.v_menu_admin',
            'content'    => 'content.view_metodopago',
            'title'    => 'Tabla Metodo de Pago'
        ];

        if ($request->ajax()) {
            $q_metodopago = MetodoPago::all();
            return Datatables::of($q_metodopago)
                    ->addIndexColumn()
                    ->addColumn('action', function($row){

                        $btn = '<div data-toggle="tooltip"  data-id="'.$row->id.'" data-original-title="Edit" class="btn btn-sm btn-icon btn-outline-success btn-circle mr-2 edit editUser"><i class=" fi-rr-edit"></i></div>';
                        $btn = $btn.' <div data-toggle="tooltip"  data-id="'.$row->id.'" data-original-title="Delete" class="btn btn-sm btn-icon btn-outline-danger btn-circle mr-2 deleteUser"><i class="fi-rr-trash"></i></div>';

                         return $btn;
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        }

        return view('layouts.v_template',$data);
    }

    public function store(Request $request)
    {
        MetodoPago::updateOrCreate(['id' => $request->metodopago_id],
                [
                 'tipoPago' => $request->tipoPago,
                ]);

        return response()->json(['success'=>'Metodo de pago creado']);
    }

    public function edit($id)
    {
        $MetodoPago = MetodoPago::find($id);
        return response()->json($MetodoPago);

    }

    public function destroy($id)
    {
        MetodoPago::find($id)->delete();

        return response()->json(['success'=>'Metodo de pago Eliminado!']);
    }
}
