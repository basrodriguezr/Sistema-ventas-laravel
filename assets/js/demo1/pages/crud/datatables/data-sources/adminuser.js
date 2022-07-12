
'use strict';

var idEmpresa = '';

$("#kt_select3_2").change(function (e) {
    e.preventDefault();
    idEmpresa = $('#kt_select3_2').val();
    if (idEmpresa != '') {
        $("#x").removeAttr("hidden");
        KTDatatablesDataSourceAjaxClient3.init();
    }
});


var KTDatatablesDataSourceAjaxClient3 = function () {


    var initTable3 = function () {
        var table = $('#kt_table_22');


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
                url: 'admin/userAll',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 10,
                    },
                    idE: idEmpresa
                },
            },
            columns: [

                { data: 'idUsuario' },
                { data: 'Username' },
                { data: 'Nombres' },
                { data: 'Apellidos' },
                { data: 'nombreEmpresa' },
                { data: 'NombreSucursal' },
                { data: 'TipoUsuario' },
                { data: 'Estado' },
                { data: 'Actions', responsivePriority: -1 },



            ],
            columnDefs: [
                {
                    targets: 6,
                    ordentable: true,
                    render: function (data, type, full, meta) {

                        if (data == 'Administrador')
                            return '<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill">' + data + '</span>';
                        if (data == 'Trabajador')
                            return '<span class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">' + data + '</span>';

                    },
                },

                {
                    targets: 7,
                    render: function (data, type, full, meta) {
                        var status = {
                            0: { 'title': 'Offline', 'state': 'danger' },
                            2: { 'title': 'Retail', 'state': 'primary' },
                            1: { 'title': 'Online', 'state': 'success' },
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="kt-badge kt-badge--' + status[data].state + ' kt-badge--dot"></span>&nbsp;' +
                            '<span class="kt-font-bold kt-font-' + status[data].state + '">' + status[data].title + '</span>';
                    },
                },

                {
                    targets: -1,
                    title: 'Acciones',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return `
                        <button class="btn btn-sm btn-clean btn-icon btn-icon-md" onclick="editarUserAdmin(${full.idUsuario});" title="Editar Usuario">
                          <i class="la la-edit"></i>
                        </button>
                        
                        <button class="btn btn-sm btn-clean btn-icon btn-icon-md" onclick="editarEstadoAdmin(${full.idUsuario});" title="Editar Estado">
                          <i class="la la-bullseye"></i>
                        </button>
                        `;
                    },
                },
            ]
        });

        actualizarSucursal("#kt_table_12 tbody", table);
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
            initTable3();
        },
    };

}();



jQuery(document).ready(function () {
    idEmpresa = $("#kt_select3_2").val();
    if (idEmpresa != '')
        KTDatatablesDataSourceAjaxClient3.init();


});

