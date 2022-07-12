'use strict';

var idEmpresa = '';
var idSucursal = '';
var idUsuario = '';



$("#empresa").change(function (e) {
	e.preventDefault();
	idEmpresa = $('#empresa').val();
	console.log(idEmpresa)
	KTDatatablesDataSourceAjaxClient.init();

});


$("#sucursal").change(function (e) {
	e.preventDefault();
	idSucursal = $('#sucursal').val();
	console.log(idSucursal)
	KTDatatablesDataSourceAjaxClient.init();

});

$("#usuario").change(function (e) {
	e.preventDefault();
	idEmpresa = $('#usuario').val();
	console.log(idEmpresa)
	KTDatatablesDataSourceAjaxClient.init();

});

var KTDatatablesDataSourceAjaxClient = function () {



	var initTable1 = function () {

		var table = $('#kt_table_2');

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
				url: 'admin/getAllTrans',
				type: 'GET',
				data: {
					pagination: {
						perpage: 15,
					},
					idE: idEmpresa,
					idS: idSucursal,
					idU: idUsuario

				},
			},
			columns: [
				{ data: 'nombreEmpresa' },
				{ data: 'nombrepun' },
				{ data: 'nombrepv' },
				{ data: 'fecha' },
				{ data: 'numeroop' },
				{ data: 'codigo' },
				{ data: 'nombremon' },
				/* {data: 'monto'}, */
				{
					"render": function (data, type, row) {
						/* return "$ "+row["monto"]+".-"; */
						var variable = "$ " + row["monto"] + ".-";
						return `<span style="float:right">${variable}</span>`;
					},
					"targets": 1
				},

			],

		});

	};

	return {

		//main function to initiate the module
		init: function () {
			initTable1();
		},
	};

}();

jQuery(document).ready(function () {

	idEmpresa = $("#empresa").val();
	idSucursal = $("#sucursal").val();
	idUsuario = $("#usuario").val();
});


