var listar1Producto = function () {
    var table = $("#tablaProducto").DataTable({

        lengthMenu: [
            [5, 10, 30, 50, -1],
            [5, 10, 30, 50, "Todo"]
        ],
        destroy: true,
        responsive: true,
        ordentable: true,
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": " START - END de TOTAL ",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de MAX total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar MENU Entradas",
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

        "ajax": {
            "method": "POST",
            "url": "/API/getPuntoVentaAdmin"
        },
        "columns": [

            {
                "data": "username_usu"
            },
            {
                "data": "nombre_pun"
            },
            {
                "data": "direccion_pun"
            },
            {
                "data" : "nombre_com"
			},
			{
                "data" : "nombre_ciu"
			},
			{
                "data" : "nombre_reg"
            },
        ],
        "columnDefs": [
            {
                targets: 6,
                title: "Accion",
                render: function (data, type, full, meta) {
                    return `
                    <button class='btn btn-sm btn-edit btn-icon btn-icon-md' data-container="body" onclick="editar(`+ full.idCotizaciones + `);"><i class="flaticon-edit"></i></button>            
                    <button class='btn btn-sm btn-clean btn-icon btn-icon-md' data-container="body" onclick="eliminar(`+ full.idCotizaciones + `);"><i class="flaticon-delete"></i></button>            
                    `;
                },
            },
        ],
    });
}