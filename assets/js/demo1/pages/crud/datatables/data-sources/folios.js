var KTDatatablesDataSourceAjaxClient2 = function () {


    var initTable2 = function () {
        var table = $('#kt_table_10');


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
                url: '/API/allFolio',
                type: 'GET',
                data: {
                    pagination: {
                        perpage: 10,
                    },


                },
            },
            columns: [

                { data: 'nombreArchivo' },
                { data: 'inicioFolio' },
                { data: 'finFolio' },
                { data: 'created_at' },
                { data: 'tipoDocumento' },
                { data: 'fechaEmision' },


            ],
            columnDefs: [
                {
                    targets: 4,
                    ordentable: true,
                    render: function (data, type, full, meta) {

                        if (data == '39')
                            return '<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill">' + data + '</span>';
                        if (data == '41')
                            return '<span class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">' + data + '</span>';

                    },
                },



            ]

        });


        actualizarSucursal("#kt_table_10 tbody", table);
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
    KTDatatablesDataSourceAjaxClient2.init();

});
