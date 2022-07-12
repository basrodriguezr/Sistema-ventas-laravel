'use strict';

var idSucursal = '';

$("#kt_select4_2").change(function (e) {
    e.preventDefault();
    idSucursal = $('#kt_select4_2').val();
    if (idSucursal != '') {
        $("#x").removeAttr("hidden");
        KTDatatablesDataSourceAjaxClient2.init();


    }
});


var KTDatatablesDataSourceAjaxClient2 = function () {


    var initTable2 = function () {
        var table = $('#kt_table_12');


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
                url: 'admin/representanteEmpresaUser',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 10,
                    },
                    idS: idSucursal
                },
            },
            columns: [

                { data: 'idUsuario' },
                { data: 'Username' },
                { data: 'Nombres' },
                { data: 'Apellidos' },
                { data: 'NombreSucursal' },
                { data: 'TipoUsuario' },
                { data: 'Actions', responsivePriority: -1 },


            ],
            columnDefs: [
                {
                    targets: 5,
                    ordentable: true,
                    render: function (data, type, full, meta) {

                        if (data == 'Administrador')
                            return '<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill">' + data + '</span>';
                        if (data == 'Trabajador')
                            return '<span class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">' + data + '</span>';

                    },
                },

                {
                    targets: -1,
                    title: 'Acciones',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return `
                        <button class="btn btn-sm btn-clean btn-icon btn-icon-md" onclick="editarUser(${full.idUsuario});" title="Editar Usuario">
                          <i class="la la-edit"></i>
                        </button>`;
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
            initTable2();
        },
    };

}();



jQuery(document).ready(function () {
    idSucursal = $("#kt_select4_2").val();
    if (idSucursal != '')
    KTDatatablesDataSourceAjaxClient2.init();


});
