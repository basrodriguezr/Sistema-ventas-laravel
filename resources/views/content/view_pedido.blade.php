<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2>{{ $title }}</h2>
                <div class="d-flex flex-row-reverse"><button
                        class="btn btn-sm btn-pill btn-outline-primary font-weight-bolder" id="createNewPedido"><i
                            class="fas fa-plus"></i>Ingresar Pedido</button>
                </div>
            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table" id="tablePedido">
                            <thead class="font-weight-bold text-center">
                                <tr>
                                    {{-- <th>No.</th> --}}
                                    <th>Nº Pedido</th>
                                    <th>Cliente</th>
                                    <th>Metodo de Pago</th>
                                    <th style="width:90px;">Total</th>
                                    <th>Fecha Pedido</th>
                                    <th>Acciones</th>
                                    <th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                {{-- @foreach ($users as $r_users)
                                    <tr>
                                <td>{{$r_users->id}}</td>
                                <td>{{$r_users->name}}</td>
                                <td>{{$r_users->email}}</td>
                                <td>{{$r_users->level}}</td>
                                <td>å
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
<div class="modal fade bd-example-modal-lg" id="modal-pedido" data-backdrop="static" tabindex="-1" role="dialog"
    aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="exampleModalLabel">Creación Pedido</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="ki ki-close"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="formPedido" name="formPedido">
                    <div class="form-group">
                        <label for="">Seleccione al cliente:</label>
                        <select name="cliente_id" id="cliente_id" class="form-control selectpicker" data-size="5"
                            data-live-search="true" tabindex="null">
                            @foreach ($dataCliente as $data)
                                <option value="{{ $data->id }}">{{ $data->nombreCliente }}</option>
                            @endforeach
                        </select>
                        <div class="separator separator-dashed my-5"></div>
                        <label for="">Seleccione al Producto:</label>
                        <select name="producto_id" id="producto_id" class="form-control selectpicker" data-size="5"
                            data-live-search="true" tabindex="null">
                            @foreach ($dataProducto as $data)
                                <option value="{{ $data->id }}">{{ $data->nombreProducto }}-${{ $data->precio }}
                                </option>
                            @endforeach
                        </select>
                        <div class="separator separator-dashed my-5"></div>
                        <label for="">Seleccione el Metodo de Pago:</label>
                        <select name="metodoPago_id" id="metodoPago_id" class="form-control selectpicker" data-size="5"
                            data-live-search="true" tabindex="null">
                            @foreach ($dataMetodoPago as $data)
                                <option value="{{ $data->id }}">{{ $data->tipoPago }}
                                </option>
                            @endforeach
                        </select>
                        <div class="separator separator-dashed my-5"></div>
                        <div class="card-body">
                            <label class="col-form-label col-lg-3 col-sm-12">Glosa Producto </label>
                            <div class="col-lg-9 col-md-9 col-sm-12">

                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-lg-10"></div>
                                        <div class="col-lg-2 ">
                                            <button class="btn btn-danger" id="addPrima"><i
                                                    class="fas fa-plus"></i>Agregar Producto</button>
                                        </div>
                                    </div>
                                </div>
                                <br>

                                <table class="table table-hover table-bordered table-responsive" id="tablaResumen">
                                    <thead>
                                        <tr>
                                            <th style="text-align: center; width:30%;">Item</th>
                                            <th style="text-align: center; width: 2%">Cantidad</th>
                                            <th style="text-align: center; width: 27%">Precio</th>
                                            <th style="text-align: center; width: 10%"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2" valign="middle"><label
                                                    style="text-align: right; font-weight: bold">Monto:</label></td>
                                            <td colspan="1">
                                                <div class="kt-input-icon kt-input-icon--left">
                                                    <input type="text" class="form-control" id="monto"
                                                        name="monto" readonly
                                                        style="padding-left: 0.8rem !important;">

                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light-primary font-weight-bold"
                    data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary font-weight-bold" id="saveBtn">Crear</button>
            </div>

        </div>
    </div>
</div>





@push('scripts')
    <script>
        var KTFormRepeater = function() {
            // Private functions
            var demo1 = function() {
                $('#kt_repeater_1').repeater({
                    initEmpty: true,

                    defaultValues: {
                        'text-input': 'foo'
                    },

                    show: function() {
                        $(this).slideDown();
                    },

                    hide: function(deleteElement) {
                        $(this).slideUp(deleteElement);
                    }
                });
            }
            return {
                // public functions
                init: function() {
                    demo1();
                }
            };
        }();

        $('#agrega_detalle').click(function(e) {
            let data = $("#producto_id option:selected").text().split('-$')
            $('.asd').val(data[0])
            $('.precio').val(data[1])
        });

        jQuery(document).ready(function() {
            KTFormRepeater.init();
        });

        $('document').ready(function() {
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
            var table = $('#tablePedido').DataTable({

                dom: 'Bfrtip',
                buttons: [
                    'copy', 'excel', 'pdf'
                ],
                ajax: "{{ route('pedidos.index') }}",
                columns: [{
                        data: 'id',
                        name: 'id'
                    },
                    {
                        data: 'nombreCliente',
                        name: 'nombreCliente'
                    },
                    {
                        data: 'tipoPago',
                        name: 'tipoPago'
                    },
                    {
                        data: 'total',
                        name: 'total'
                    },
                    {
                        data: 'fecha',
                        name: 'fecha'
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
            $('#createNewPedido').click(function() {
                $('#saveBtn').val("create user");
                $('#producto_id').val('');
                $('#formPedido').trigger("reset");
                $('#modal-pedido').modal('show');

            });
            // initialize btn edit
            $('body').on('click', '.showUser', function() {
                var pedido_id = $(this).data('id');
                
                $('#modalw').modal('show');


            });
            // initialize btn save
            $('#saveBtn').click(function(e) {
                e.preventDefault();
                var filas = $('#tablaResumen tbody tr').length;
                var detalleGlosa = [];
                var idCliente = $("#cliente_id option:selected").val();
                var idMetodoPago = $("#metodoPago_id option:selected").val();
                for (var i = 1; i <= filas; i++) {

                    var aux = [];
                    var item = $(`#item${i}`).val();
                    var cantidad = $(`#cantidad${i}`).val();
                    var precio = $(`#precio${i}`).val();
                    var producto = $(`#producto_id${i}`).val()

                    if (item != 0 || cantidad != 0 || precio != 0||producto!=0) {
                        aux.push(item);
                        aux.push(cantidad);
                        aux.push(precio);
                        aux.push(producto);


                        detalleGlosa.push(aux);
                    }
                }
                var monto = $('#monto').val();
                $(this).html('Save');
                $.ajax({
                    data: {
                        'cliente_id': idCliente,
                        'metodoPago_id':idMetodoPago,
                        'glosaProductos': detalleGlosa,
                        'monto_total': monto
                    },
                    url: "{{ route('pedidos.store') }}",
                    type: "POST",
                    dataType: 'json',
                    success: function(data) {

                        $('#formPedido').trigger("reset");
                        $('#modal-pedido').modal('hide');
                        swal_success();
                        table.draw();

                    },
                    error: function(data) {
                        swal_error();
                        $('#saveBtn').html('Guardado Exitoso');
                    }
                });

            });
            // initialize btn delete
            $('body').on('click', '.deleteUser', function() {
                var producto_id = $(this).data("id");

                Swal.fire({
                    title: 'Estas Seguro de eliminar este Producto?',
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
                            url: "{{ route('productos.store') }}" + '/' + producto_id,
                            success: function(data) {
                                swal_success();
                                table.draw();
                            },
                            error: function(data) {
                                swal_error();
                            }
                        });
                    }
                })
            });

            // statusing


        });
        var x = 0;
        $('#addPrima').click(function(e) {
            e.preventDefault();
            x++;
            let data = $("#producto_id option:selected").text().split('-$')
            var idProducto = $("#producto_id option:selected").val()

            let row = `                                
            <tr>
            <td><input type="text" class="form-control" id="item${x}"" value="${data[0]}"></td>
                <td><input type="number" class="form-control cantidad_dinamico" id="cantidad${x}" onChange="calcularTotal(${data[1].replace(/ /g, "")})";"></td>
                <td><input type="text" class="form-control inputsum" onblur="calcularTotal(${data[1].replace(/ /g, "")})"; id="precio${x}" value="${data[1].replace(/ /g, "")}"disabled></td>  
                <td><input type="hidden" name="producto_id" id="producto_id${x}" value="${idProducto}"></td>    
                <td><button class="btn btn-danger" id="btnEliminarPrima"><i class="flaticon-delete"></i></button></td> 
            </tr>`;
            $('#tablaResumen tbody').append(row);
            //x++;
        });

        $('table').on('click', '#btnEliminarPrima', function(e) {
            e.preventDefault();
            Swal.fire({
                'type': 'question',
                'title': 'Eliminar Item',
                'text': '¿Estás seguro de eliminar este item?.',
                'showCancelButton': true,
                'cancelButtonColor': '#1b112c',
                'cancelButtonText': 'Cancelar',
                'confirmButtonColor': '#fd397a',
                'confirmButtonText': 'Eliminar'

            }).then((result) => {
                if (result.value) {
                    $(this).closest('tr').children('td:first').find('input').val(0);
                    $(this).closest('tr').children('td:nth-child(1)').find('input').val(0);
                    $(this).closest('tr').children('td:nth-child(2)').find('input').val(0);
                    $(this).closest('tr').children('td:nth-child(3)').find('input').val(0);
                    $(this).closest("tr").hide();
                    calcularTotal();
                    Swal.fire({
                        'type': 'success',
                        'title': 'Item Eliminada',
                        'text': 'Item eliminada con éxito.',
                    });
                }
            });
        });


        function calcularTotal() {
            var precio = 0;
            var cantidad = 0;
            sumatoria = 0;
            sum = 0;
            suma = 0;

            for (var i = 1; i <= x; i++) {
                if ($(`#precio${i}`).val() != '' && $(`#cantidad${i}`).val() != '') {
                    sum = 0;
                    sum = parseInt($(`#precio${i}`).val()) * parseInt($(`#cantidad${i}`).val())
                    suma = suma + sum;
                }
            }
            $('#monto').val(suma);
        }

        $("input#precio1").bind('keypress', function(event) {
            var regex = new RegExp("^[0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        });

        $("input#cantidad1").bind('keypress', function(event) {
            var regex = new RegExp("^[0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        });

        $("input.cantidad_dinamico").bind('keypress', function(event) {
            var regex = new RegExp("^[0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        });

        $("input.inputsum").bind('keypress', function(event) {
            var regex = new RegExp("^[0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        });

        function onlyNumbers(campo) {
            $(`#${campo.id}`).keyup(function(e) {
                if (/\D/g.test(this.value)) {
                    this.value = this.value.replace(/\D/g, '');
                }
            });
        }
    </script>
@endpush
