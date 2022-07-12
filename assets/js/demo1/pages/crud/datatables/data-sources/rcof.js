'use strict'

$(document).ready(function () {
    listarRcof();

});

var listarRcof = function () {
    var table = $("#tabla_rcof").DataTable({
        /*  lengthMenu: [
             [5, 10, 30, 50, -1],
             [5, 10, 30, 50, "Todo"]
         ], */

        destroy: true,
        ordentable: true,
        responsive: true,
        bLengthChange: false,
        bPaginate: false,
        bInfo: false,
        /* bAutoWidth: false, */
        language: {
            "Print": "Imprimir",
            "decimal": "",
            "emptyTable": "No hay información",
            "info": " _START_ - _END_ de _TOTAL_ ",
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
        sDom: "B<'row'><'row'<'col-md-10'l><'col-md-2'f>r>t<'row'<'col-md-3'i>><'row'<'#colvis'>p>",
        buttons: [{
            extend: 'pdf',
            text: 'PDF'
        },
        {
            extend: 'excel',
            text: 'EXCEL'
        },
        {
            extend: 'csv',
            text: 'CSV'
        },
        {
            extend: 'print',
            text: 'Imprimir'
        },
        {
            extend: 'copy',
            text: 'Copiar'
        }
        ],
        "ajax": {
            "method": "GET",
            "url": "admin/rcof"
        },
        "columns": [
            {
                "data": "tipo_archivo"
            },
            {
                "data": "fecha_envio"
            },
            {
                "data": "nombre_empresa"
            },
            {
                "data": "track_id"
            },
            {
                render: function (data, type, full, meta) {
                    if(full.estado == 0){
                        return 'Enviado';
                    }else{
                        return full.estado;
                    }
                },
            },
        ],
    });
    table.buttons().container()
        .appendTo($('.col-sm-6:eq(0)', table.table().container()));
}