<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2>{{ $title }}</h2>

            </div>

            <div class="card-body">
                <div class="col-md-12">
                    <div class="col-lg-3">

                    </div>
                    <div class="table-responsive">
                        <table class="table" id="tableInforme">
                            <thead class="font-weight-bold text-center">
                                <tr>
                                    {{-- <th>No.</th> --}}
                                    <th>Nº Pedido</th>
                                    <th>Cliente</th>
                                    <th>Metodo de Pago</th>
                                    <th style="width:90px;">Total</th>
                                    <th>Fecha Pedido</th>
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


@section('script')
    <script src="{{ asset('/assets/js/demo1/pages/components/extended/sweetalert2.js') }}" type="text/javascript">
    </script>
    <script src="{{ asset('/assets/vendors/custom/datatables/datatables.bundle.js') }}" type="text/javascript"></script>
    <script src="{{ asset('/assets/js/demo1/pages/crud/datatables/data-sources/transpv.js') }}" type="text/javascript">
    </script>

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
                        //initDemos();
                    }
                };
            }();


            /*  var initDemos = function() {
                 $('#kt_sweetalert_demo_11').click(function(e) {
                     swal.fire({
                         title: 'Espere mientras procesamos sus datos!',
                         text: 'Esto puede tardar un tiempo por la cantidad de datos...',
                         timer: 5000,
                         onOpen: function() {
                             swal.showLoading()
                         }
                     }).then(function(result) {
                         if (result.dismiss === 'timer') {
                             console.log('I was closed by the timer')
                         }
                     })
                 });
             }; */


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
                var table = $('#tableInforme').DataTable({

                    dom: 'Bfrtip',
                    buttons: [
                         'excel', 'pdf'
                    ],
                    ajax: "{{ route('ventasdiarias.ventasDiarias') }}",
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

                    ]
                });


            });
        </script>
    @endpush
