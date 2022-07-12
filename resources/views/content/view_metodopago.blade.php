<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2>{{$title}}</h2>
                <div class="d-flex flex-row-reverse"><button
                        class="btn btn-sm btn-pill btn-outline-primary font-weight-bolder" id="createNewMetodoPago"><i
                            class="fas fa-plus"></i>Ingresar Metodo de pago</button></div>
            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table" id="tableMetodoPago">
                            <thead class="font-weight-bold text-center">
                                <tr>
                                    {{-- <th>No.</th> --}}
                                    <th>Nombre Metodo de Pago</th>
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
<div class="modal fade" id="modal-metodopago" data-backdrop="static" tabindex="-1" role="dialog"
    aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="exampleModalLabel">Creación Metodo Pago</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="formMetodoPago" name="formMetodoPago">
                    <div class="form-group">
                        <input type="text" name="tipoPago" class="form-control" id="tipoPago" placeholder="Nombre Metodo Pago"><br>
                        <input type="hidden" name="metodopago_id" id="metodopago_id" value="">
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
        var table = $('#tableMetodoPago').DataTable({

            dom: 'Bfrtip',
            buttons: [
                'copy', 'excel', 'pdf','print'
            ],
            ajax: "{{ route('metodopagos.index') }}",
            columns: [{
                    data: 'tipoPago',
                    name: 'tipoPago'
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
        $('#createNewMetodoPago').click(function () {
            $('#saveBtn').val("create user");
            $('#metodopago_id').val('');
            $('#formMetodoPago').trigger("reset");
            $('#modal-metodopago').modal('show');
        });
        // initialize btn edit
        $('body').on('click', '.editUser', function () {
            var metodopago_id = $(this).data('id');
            $.get("{{route('metodopagos.index')}}" + '/' + metodopago_id + '/edit', function (data) {
                $('#saveBtn').val("edit-user");
                $('#modal-metodopago').modal('show');
                $('#metodopago_id').val(data.id);
                $('#tipoPago').val(data.tipoPago);
            })
        });
        // initialize btn save
        $('#saveBtn').click(function (e) {
            e.preventDefault();
            $(this).html('Save');

            $.ajax({
                data: $('#formMetodoPago').serialize(),
                url: "{{ route('metodopagos.store') }}",
                type: "POST",
                dataType: 'json',
                success: function (data) {

                    $('#formMetodoPago').trigger("reset");
                    $('#modal-metodopago').modal('hide');
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
            var metodopago_id = $(this).data("id");

            Swal.fire({
                title: 'Estas Seguro de eliminar este Metodo de Pago?',
                text: "No podrás revertir esto.!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminalo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: "DELETE",
                        url: "{{route('metodopagos.store')}}" + '/' + metodopago_id,
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
