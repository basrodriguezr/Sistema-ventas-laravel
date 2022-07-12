<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2>{{$title}}</h2>
                <div class="d-flex flex-row-reverse"><button
                        class="btn btn-sm btn-pill btn-outline-primary font-weight-bolder" id="createNewCategoria"><i
                            class="fas fa-plus"></i>Ingresar Categoria</button></div>
            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table" id="tableCategoria">
                            <thead class="font-weight-bold text-center">
                                <tr>
                                    {{-- <th>No.</th> --}}
                                    <th>Nombre Categoria</th>
                                    <th style="width:90px;">Acciones</th>
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
                                    <div class="btn btn-success editUser" data-id="{{$r_users->id}}">Editar</div>
                                    <div class="btn btn-danger deleteUser" data-id="{{$r_users->id}}">Eliminar</div>
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
<div class="modal fade" id="modal-categoria" data-backdrop="static" tabindex="-1" role="dialog"
    aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="exampleModalLabel">Creación Categoria</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="formCategoria" name="formCategoria">
                    <div class="form-group">

                        <input type="text" name="tipoCategoria" class="form-control" id="tipoCategoria" placeholder="Nombre Categoria"><br>
                        <input type="hidden" name="categoria_id" id="categoria_id" value="">

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
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1000
            })
        }
        // error alert
        function swal_error() {
            Swal.fire({
                position: 'centered',
                icon: 'error',
                title: 'Something goes wrong !',
                showConfirmButton: true,
            })
        }
        // table serverside
        var table = $('#tableCategoria').DataTable({
            processing: false,
            serverSide: true,
            ordering: false,
            dom: 'Bfrtip',
            buttons: [
                'excel', 'pdf'
            ],
            ajax: "{{ route('categorias.index') }}",
            columns: [{
                    data: 'tipoCategoria',
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
        $('#createNewCategoria').click(function () {
            $('#saveBtn').val("create user");
            $('#categoria_id').val('');
            $('#formCategoria').trigger("reset");
            $('#modal-categoria').modal('show');
        });
        // initialize btn edit
        $('body').on('click', '.editUser', function () {
            var categoria_id = $(this).data('id');
            $.get("{{route('categorias.index')}}" + '/' + categoria_id + '/edit', function (data) {
                $('#saveBtn').val("edit-user");
                $('#modal-categoria').modal('show');
                $('#categoria_id').val(data.id);
                $('#tipoCategoria').val(data.tipoCategoria);

            })
        });
        // initialize btn save
        $('#saveBtn').click(function (e) {
            e.preventDefault();
            $(this).html('Save');
            console.log(e)

            $.ajax({
                data: $('#formCategoria').serialize(),
                url: "{{ route('categorias.store') }}",
                type: "POST",
                dataType: 'json',
                success: function (data) {

                    $('#formCategoria').trigger("reset");
                    $('#modal-categoria').modal('hide');
                    swal_success();
                    table.draw();

                },
                error: function (data) {
                    swal_error();
                    $('#saveBtn').html('Save Changes');
                }
            });

        });
        // initialize btn delete
        $('body').on('click', '.deleteUser', function () {
            var categoria_id = $(this).data("id");

            Swal.fire({
                title: 'Estas seguro de eliminar esta Categoria?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: "DELETE",
                        url: "{{route('categorias.store')}}" + '/' + categoria_id,
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
