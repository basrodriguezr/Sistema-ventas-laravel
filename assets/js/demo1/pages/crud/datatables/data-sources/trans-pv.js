'use strict';
var KTDatatablesDataSourceAjaxClient = function() {
	
	var initTable1 = function() {
		var table = $('#kt_table_10');

		// begin first table
		table.DataTable({
			responsive: true,
			language: {
				"decimal": "",
				"emptyTable": "No hay información",
				"info": "Mostrando START a END de TOTAL Entradas",
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
			ajax: {
				url: 'getTransaccionesPv',
				type: 'GET',
				data: {
					pagination: {
						perpage: 50,
					},
				},
			},
			columns: [
				{data: 'nombrepun'},
				{data: 'nombrepv'},
				{data: 'fecha'},
				{data: 'numeroop'},
				{data: 'codigo'},
				{data: 'nombremon'},
				{data: 'monto'},
				{data: 'Acciones', responsivePriority: -1},
			],
			columnDefs: [
				{
					targets: -1,
					title: 'Acciones',
					orderable: false,
					render: function(data, type, full, meta) {
						
						return `
                        <span class="dropdown">
                            <a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown" aria-expanded="true">
                              <i class="la la-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" >
                                <a class="dropdown-item" href="deleteInventario/${full.id_inventario}" onclick="return confirm('Esta seguro que desea eliminar el usuario ${full.descripcion}?')"><i class="fa fa-trash"></i>Eliminar</a>
                                <a class="dropdown-item" href="inventario/${full.id_inventario}"><i class="fa fa-edit"></i>Editar</a>
                            </div>
						</span>
						<a href="inventario/show/${full.id_inventario}" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="View">
                          <i class="la la-edit"></i>
                        </a>
                        `;
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
	/*
	var table = $('#kt_table_1');
	
	CLICK EN EL BTN DATATABLE
	$('#kt_table_1').on( 'click', 'a.btnEliminar', function () {
		var data = $(this).parents('tr');
        console.log(data)
    } );
	*/
});