'use strict';
var KTDatatablesDataSourceAjaxClient = function() {

    var initTable1 = function() {
        var table = $('#kt_table_1');

        // begin first table
        table.DataTable({
            responsive: true,
            language: {
                "decimal": "",
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
                url: 'admin/getFaena',
                type: 'GET',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            columns: [
                { data: 'nombre' },
                { data: 'descripcion' },
                { data: 'fecha' },
                { data: 'usuario' },
                { data: 'Actions', responsivePriority: -1 },
            ],
            columnDefs: [{
                    targets: -1,
                    title: 'Acciones',
                    orderable: false,
                    render: function(data, type, full, meta) {
                        return `
                        <span class="dropdown">
                            <a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown" aria-expanded="true">
                              <i class="la la-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
							<a class="dropdown-item" href="/admin/faena/${full.id}/edit" "><i class="la la-edit"></i> Editar</a>
                                <a class="dropdown-item" href="/admin/faena/${full.id}/delete" onclick="return confirm('¿Seguro que desea eliminar la faena ${full.nombre}?')"><i class="la la-trash"></i> Eliminar</a> 
                            </div>
                        </span>
                        <a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="View">
                          <i class="la la-edit"></i>
                        </a>`;
                    },
                },
                {
                    targets: -3,
                    render: function(data, type, full, meta) {
                        var status = {
                            1: { 'title': 'Pending', 'class': 'kt-badge--brand' },
                            2: { 'title': 'Delivered', 'class': ' kt-badge--danger' },
                            3: { 'title': 'Canceled', 'class': ' kt-badge--primary' },
                            4: { 'title': 'Success', 'class': ' kt-badge--success' },
                            5: { 'title': 'Info', 'class': ' kt-badge--info' },
                            6: { 'title': 'Danger', 'class': ' kt-badge--danger' },
                            7: { 'title': 'Warning', 'class': ' kt-badge--warning' },
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                    },
                },
                {
                    targets: -2,
                    render: function(data, type, full, meta) {
                        var status = {
                            1: { 'title': 'Online', 'state': 'danger' },
                            2: { 'title': 'Retail', 'state': 'primary' },
                            3: { 'title': 'Direct', 'state': 'success' },
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="kt-badge kt-badge--' + status[data].state + ' kt-badge--dot"></span>&nbsp;' +
                            '<span class="kt-font-bold kt-font-' + status[data].state + '">' + status[data].title + '</span>';
                    },
                },
            ],
        });
    };

    return {

        //main function to initiate the module
        init: function() {
            initTable1();
        },

    };

}();

jQuery(document).ready(function() {
    KTDatatablesDataSourceAjaxClient.init();
});