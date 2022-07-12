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

class CategoriaController extends Controller
{
    public function index(Request $request)
    {
        $data = [
            'count_user' => User::latest()->count(),
            'count_categoria' => Categoria::latest()->count(),
            'count_producto' => Producto::latest()->count(),
            'count_metodopago' => MetodoPago::latest()->count(),
            'menu'       => 'menu.v_menu_admin',
            'content'    => 'content.view_categoria',
            'title'    => 'Tabla Categoria'
        ];

        if ($request->ajax()) {
            $q_categoria = Categoria::all();
            return Datatables::of($q_categoria)
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
    
        Categoria::updateOrCreate(['id' => $request->categoria_id],
                [
                 'tipoCategoria' => $request->tipoCategoria,
                ]);        

        return response()->json(['success'=>'Categoria creada exitosamente!']);
    }

    public function edit($id)
    {
        $User = Categoria::find($id);
        return response()->json($User);

    }

    public function destroy($id)
    {
        Categoria::find($id)->delete();

        return response()->json(['success'=>'Categoria Eliminada!']);
    }
}
