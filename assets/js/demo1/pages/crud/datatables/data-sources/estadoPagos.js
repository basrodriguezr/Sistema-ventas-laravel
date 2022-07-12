'use strict';

var KTDatatablesDataSourceAjaxClient2 = function () {


    var initTable2 = function () {
        var table = $('#kt_table_32');

        // begin first table
        table.DataTable({
            responsive: true,
            destroy: true,
            order: [[2, 'DESC']],
            language: {
                "decimal": "",
                "destroy": "true",
                "emptyTable": "No hay información",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Entradas",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
            ajax: {
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: 'admin/dataEstado',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 10,
                    },
                },
            },
            columns: [

                { data: 'codestado' },
                { data: 'fechaInicio' },
                { data: 'fechaTermino', },
                { data: 'fechaPago' },
                { data: 'atraso' },
                { data: 'comprobantePago' },
                { data: 'facturaPago' },
                { data: 'idPlanPago' },
                { data: 'estadoPago' },
                { data: 'PagoKhipu' }

            ],
            columnDefs: [

                {
                    targets: 4,
                    ordentable: true,
                    render: function (data, type, full, meta) {
                        if (data == '')
                            return '';
                        if (data <= 0)
                            return '<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill">0</span>';
                        else
                            return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">' + data + '</span>';
                    },
                },

                {
                    targets: 5,
                    ordentable: true,
                    render: function (data, type, full, meta) {
                        if (data == '')
                            return '';
                        if (data == 0)
                            return '-';
                        else {
                            if (full.index == 0) {
                                return `<button type="button" class="btn btn-brand btn-icon" onclick="ComprobantePago('${data}');"><i class="fas fa-file-invoice"></i></button>`;
                            } else {
                                return `<a type="button" class="btn btn-brand btn-icon" href="${data}" target="_blank"><i class="fas fa-file-invoice"></i></a>`;
                            }
                        }

                    },
                },

                {
                    targets: 6,
                    ordentable: true,
                    render: function (data, type, full, meta) {
                        if (data == '')
                            return '';
                        if (data == 0)
                            return '-';
                        else
                            return `<button type="button" class="btn btn-brand btn-icon" onclick="FacturaPago('${data}');"><i class="fas fa-file-invoice-dollar"></i></button>`;
                    },
                },

                {
                    targets: 7,
                    ordentable: true,
                    render: function (data, type, full, meta) {
                        if (data == '')
                            return '';
                        if (data == 1)
                            return '<span >Basico </span>';
                        if (data == 2)
                            return '<span >Pro</span>';
                        if (data == 3)
                            return '<span >Anual</span>';
                        if (data == 5)
                            return '<span >Basico Mensual</span>';
                        if (data == 6)
                            return '<span >Basico Anual</span>';
                        if (data == 7)
                            return '<span >Pro Mensual</span>';
                        if (data == 8)
                            return '<span >Pro Anual</span>';

                    },
                },

                {
                    targets: 8,
                    ordentable: true,
                    render: function (data, type, full, meta) {

                        if (data == '')
                            return '';
                        if (data == 1)
                            return ' <span class="btn btn-bold btn-sm btn-font-sm  btn-label-success">Pagado</span>';
                        if (data == 0)
                            return '<span class="btn btn-bold btn-sm btn-font-sm  btn-label-danger">Impago</span>';

                    },
                },

              

                {
                    targets: 9,
                    ordentable: true,
                    render: function (data, type, full, meta) {
                        if (full.estadoPago == '')
                            return '';
                        if (full.estadoPago == 1) {
                            return '<i class="btn btn-bold btn-sm btn-font-sm  btn-label-success fa fa-check"></i>';
                        } else {
                            return `<button type="button" class="btn btn-bold btn-sm btn-font-sm  btn-label-primary" onclick="PagoKhipu('${full.codestado}');">Pagar</button>`;
                        }
                    },
                },


            ]
        });

        actualizarSucursal("#kt_table_12 tbody", table);
    };


    return {

        //main function to initiate the module
        init: function () {
            initTable2();
        },
    };

}();



jQuery(document).ready(function () {
    KTDatatablesDataSourceAjaxClient2.init();


});
