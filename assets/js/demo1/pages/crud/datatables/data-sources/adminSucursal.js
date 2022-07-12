'use strict';

var idEmpresa = '';

$("#kt_select7_2").change(function (e) {
    e.preventDefault();
    idEmpresa = $('#kt_select7_2').val();
    if (idEmpresa != '') {
        $("#x").removeAttr("hidden");
        KTDatatablesDataSourceAjaxClient2.init();


    }
});


var KTDatatablesDataSourceAjaxClient2 = function () {

    var initTable2 = function () {
        var table = $('#kt_table_13');

        // begin first table
        table.DataTable({
            responsive: true,
            destroy: true,
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
                url: 'admin/sucursalAll',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 10,
                    },
                    idE: idEmpresa
                },
            },
            columns: [

                { data: 'idSucursal' },
                { data: 'nombreEmpresa'},
                { data: 'nombreSucursal' },
                { data: 'direccionSucursal' },
                { data: 'idComuna'},
                { data: 'actecoSucursal' },
                { data: 'fechaSucursal' },
                { data: 'numeroR'},
                { data: 'codSucursal' },
                { data: 'Actions', responsivePriority: -1 },
            ],
            columnDefs: [
                {
                    targets: -1,
                    title: 'Acciones',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return `
                        <button class="btn btn-sm btn-clean btn-icon btn-icon-md" onclick="editarUser(${full.idSucursal});" title="Editar Usuario">
                          <i class="la la-edit"></i>
                        </button>`;
                    },
                },
            ]
        });

        actualizarSucursal("#kt_table_13 tbody", table);
    };


    var actualizarSucursal = function (tbody, table) {
        $(tbody).on("click", "ActualizarSucursal", function () {
            console.log(table)
            if (table.row(this).child.isShown()) {
                console.log(table)
                var data = table.row(this).data();
            } else {
                var data = table.row($(this).parents("tr")).data();
            }
        })
    }

    return {

        //main function to initiate the module
        init: function () {
            initTable2();
        },
    };

}();



jQuery(document).ready(function () {
    idEmpresa = $("#kt_select7_2").val();
    if (idEmpresa != '')
    KTDatatablesDataSourceAjaxClient2.init();


});
