<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2>{{$title}}</h2>
                <div class="d-flex flex-row-reverse"><button
                        class="btn btn-sm btn-pill btn-outline-primary font-weight-bolder" id="createNewProducto"><i
                            class="fas fa-plus"></i>Ingresar Producto</button></div>
            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table" id="tableProducto">
                            <thead class="font-weight-bold text-center">
                                <tr>
                                    <th>No.</th>
                                    <th>Nombre Producto</th>
                                    <th>Precio</th>
                                    <th style="width:90px;">Categoria</th>
                                    <th>Acciones<th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                {{-- @foreach ($users as $r_users)
                                    <tr>
                                <td>{{$r_users->id}}</td>
                                <td>{{$r_users->name}}</td>
                                <td>{{$r_users->email}}</td>
                                <td>{{$r_users->level}}</td>
                                <td>
                                    <div class="btn btn-success editUser" data-id="{{$r_users->id}}">Edit</div>
                                    <div class="btn btn-danger deleteUser" data-id="{{$r_users->id}}">Delete</div>
                                </td>
                                </tr>
                                @endforeach --}}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal-->
<div class="modal fade" id="modal-producto" data-backdrop="static" tabindex="-1" role="dialog"
    aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="exampleModalLabel">Crear Producto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="formProducto" name="formProducto">
                    <div class="form-group">
                        <input type="text" name="nombreProducto" class="form-control" id="nombreProducto" placeholder="Nombre Producto"><br>
                        <input type="number" name="precio" class="form-control" id="precio" placeholder="Precio"><br>
                        <label for="">Seleccione la categoria:</label>
                        <select name="categoria_id" class="form-control" id="categoria_id">
                       @foreach($dataCategoria as $data)
                        <option value="{{$data->id}}">{{$data->tipoCategoria}}</option>
                        @endforeach
                        </select>
                        <input type="hidden" name="producto_id" id="producto_id" value="">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light-primary font-weight-bold" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary font-weight-bold" id="saveBtn">Guardar</button>
            </div>
        </div>
    </div>
</div>



@push('scripts')
<script>
    $('document').ready(function () {
        // success alert
        function swal_success() {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tu trabajo ha sido guardado',
                showConfirmButton: false,
                timer: 1000
            })
        }
        // error alert
        function swal_error() {
            Swal.fire({
                position: 'centered',
                icon: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: true,
            })
        }
        // table serverside
        var table = $('#tableProducto').DataTable({

            dom: 'Bfrtip',
            buttons: [
                'excel', 'pdf',
            ],
            ajax: "{{ route('productos.index') }}",
            columns: [
                {
                    data: 'id',
                    name: 'id'
                },
                {
                    data: 'nombreProducto',
                    name: 'nombreProducto'
                },
                {
                    data: 'precio',
                    name: 'precio'
                },
                {
                    data:'tipoCategoria',
                    name: 'tipoCategoria'
                },
                {
                    data: 'action',
                    name: 'action',
                    orderable: false,
                    searchable: false
                },
            ]
        });

        // csrf token
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        // initialize btn add
        $('#createNewProducto').click(function () {
            $('#saveBtn').val("create user");
            $('#producto_id').val('');
            $('#formProducto').trigger("reset");
            $('#modal-producto').modal('show');
        });
        // initialize btn edit
        $('body').on('click', '.editUser', function () {
            var producto_id = $(this).data('id');
            $.get("{{route('productos.index')}}" + '/' + producto_id + '/edit', function (data) {
                $('#saveBtn').val("edit-user");
                $('#modal-producto').modal('show');
                $('#producto_id').val(data.id);
                $('#nombreProducto').val(data.nombreProducto);
                $('#precio').val(data.precio);
                $('#categoria_id').val(data.categoria_id);
            })
        });
        // initialize btn save
        $('#saveBtn').click(function (e) {
            e.preventDefault();
            $(this).html('Guardar');

            $.ajax({
                data: $('#formProducto').serialize(),
                url: "{{ route('productos.store') }}",
                type: "POST",
                dataType: 'json',
                success: function (data) {

                    $('#formProducto').trigger("reset");
                    $('#modal-producto').modal('hide');
                    swal_success();
                    table.draw();

                },
                error: function (data) {
                    swal_error();
                    $('#saveBtn').html('Guardado Exitoso');
                }
            });

        });
        // initialize btn delete
        $('body').on('click', '.deleteUser', function () {
            var producto_id = $(this).data("id");

            Swal.fire({
                title: 'Estas seguro de eliminar este Producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: "DELETE",
                        url: "{{route('productos.store')}}" + '/' + producto_id,
                        success: function (data) {
                            swal_success();
                            table.draw();
                        },
                        error: function (data) {
                            swal_error();
                        }
                    });
                }
            })
        });

        // statusing


    });

</script>
@endpush
