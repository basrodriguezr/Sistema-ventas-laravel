'use strict';

var idSucursal = '';

$("#kt_select2_1").change(function (e) {
	e.preventDefault();
	idSucursal = $('#kt_select2_1').val();
	console.log(idSucursal)
	KTDatatablesDataSourceAjaxClient.init();
});

var KTDatatablesDataSourceAjaxClientFecha = function (e) {

	var x = sessionStorage.getItem('rangoFecha1');
	var y = sessionStorage.getItem('rangoFecha2');

	var initTable2 = function (x, y) {
		var table = $('#kt_table_4');
		// begin first table//
		table.DataTable({
			responsive: true,
			destroy: true,
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
			sDom: "B<'row'><'row'<'col-md-10'l><'col-md-2'f>r>t<'row'<'col-md-3'i>><'row'<'#colvis'>p>",
			buttons: [
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
			ajax: {
				url: 'admin/getTransPv',
				type: 'GET',
				data: {
					pagination: {
						perpage: 10,
					},
					idS: idSucursal,
					inicio: x,
					final: y
				},
			},
			columns: [
				{ data: 'nombrepun' },
				{ data: 'nombrepv' },
				{ data: 'fecha' },
				{ data: 'numeroFolio' },
				/* { data: 'codigo' }, */
				{
					"render": function (data, type, row) {
						var numero = row["seEnvioNum"];
						var correo = row["seEnvioCorr"];

						if (numero == null && correo == null) {
							return `<span >No hay registro</span>`;
						} else if (numero != null && correo != null) {
							return `<span >${numero} - ${correo}</span>`;
						} else if (numero != null && correo == null) {
							return `<span >${numero}</span>`;
						} else if (numero == null && correo != null) {
							return `<span >${correo}</span>`;
						}
					},
				},
				{
					data: 'rut'
				},
				{
					"render": function (data, type, row) {
						var variable = "$ " + row["monto"] + ".-";
						return `<span style="float:right">${variable}</span>`;
					},
				},
				{
					data: 'archivo',
					title: 'Ver boleta',
					"render": function (data, type, row) {
						var archivo = row["archivo"];
						var clave = btoa(btoa(archivo));
						return `
					<a href="http://18.231.153.213/miboWS/api/documentoDigital?nombreArchivo=${clave}" target="blank" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Ver Boleta">
					  <i class="la la-eye"></i>
					</a>
					`;
						{/* <button title="Editar Boleta" class='btn btn-sm btn-clean btn-icon btn-icon-md form-control'  onclick="editarBoleta(` + row.id_tra + `);" data-container="body" "><i class="flaticon-upload-1"></i></button>             */ }
					},
				},

			],
		});
	};

	return {
		//main function to initiate the module//
		init2: function (x, y) {
			initTable2(x, y);
		},
	};
}();

var KTDatatablesDataSourceAjaxClient = function (e) {
	var x = sessionStorage.getItem('rangoFecha1');
	var y = sessionStorage.getItem('rangoFecha2');


	var initTable1 = function () {
		var table = $('#kt_table_4');

		// begin first table
		table.DataTable({
			responsive: true,
			destroy: true,
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
			sDom: "B<'row'><'row'<'col-md-10'l><'col-md-2'f>r>t<'row'<'col-md-3'i>><'row'<'#colvis'>p>",
			buttons: [
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

			ajax: {
				url: 'admin/getTransPv',
				type: 'GET',
				data: {
					pagination: {
						perpage: 10,
					},
					idS: idSucursal,
					inicio: x,
					final: y
				},
			},
			columns: [
				{ data: 'nombrepun' },
				{ data: 'nombrepv' },
				{ data: 'fecha' },
				{ data: 'numeroFolio' },
				/* 	{ data: 'codigo' }, */
				{
					"render": function (data, type, row) {
						var numero = row["seEnvioNum"];
						var correo = row["seEnvioCorr"];

						if (numero == null && correo == null) {
							return `<span >No hay registro</span>`;
						} else if (numero != null && correo != null) {
							return `<span >${numero} - ${correo}</span>`;
						} else if (numero != null && correo == null) {
							return `<span >${numero}</span>`;
						} else if (numero == null && correo != null) {
							return `<span >${correo}</span>`;
						}
					},
				},
				{
					data: 'rut'
				},
				{
					"render": function (data, type, row) {
						/* return "$ "+row["monto"]+".-"; */
						var variable = "$ " + row["monto"] + ".-";
						return `<span style="float:right">${variable}</span>`;
					},
				},
				{
					data: 'archivo',
					title: 'Ver boleta',
					"render": function (data, type, row) {
						/* console.log(row); */
						var archivo = row["archivo"];
						var clave = btoa(btoa(archivo));
						return `
					<a href="http://18.231.153.213/miboWS/api/documentoDigital?nombreArchivo=${clave}" target="blank" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Ver Boleta">
					    <i class="la la-eye"></i>
					</a>
					
					`;
						{/* <button title="Editar Boleta" class='btn btn-sm btn-clean btn-icon btn-icon-md form-control'  onclick="editarBoleta(` + row.id_tra + `);" data-container="body" "><i class="flaticon-upload-1"></i></button>             */ }
					},
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
	idSucursal = $("#kt_select2_1").val();
	KTDatatablesDataSourceAjaxClient.init();
});

function editarBoleta(e) {
	$.ajax({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		},
		type: "post",
		url: 'admin/getTransById',
		data: {
			'id_tra': e
		},
		success: function (response) {
			var data = JSON.parse(response);
			var d = data[0].fecha;
			document.getElementById("fechaEdit").value = d.replace(' ', 'T');


			$('#sucursalEdit').val(data[0].id_suc);
			$('#puntoVentaEdit').val(data[0].nombrepv);
			/* $('#fechaEdit').val(fecha); */
			$('#ndocumentoEdit').val(data[0].numeroFolio);
			$('#codigoEdit').val(data[0].codigo);
			$('#rutClienteEdit').val(data[0].rut);
			$('#montoEdit').val(data[0].monto);

			$('#modalEditarBoleta').modal('show');
		}
	});
}
$('#btn_editarBoleta').click(function (e) {
	e.preventDefault();

	var sucursalEdit = $('#sucursalEdit').val();
	var puntoVentaEdit = $('#puntoVentaEdit').val();
	var fechaEdit = $('#fechaEdit').val();
	var ndocumentoEdit = $('#ndocumentoEdit').val();
	var codigoEdit = $('#codigoEdit').val();
	var rutClienteEdit = $('#rutClienteEdit').val();
	var montoEdit = $('#montoEdit').val();

	$.ajax({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		},
		type: "POST",
		url: 'admin/update_boleta',
		data: {
			sucursalEdit,
			puntoVentaEdit,
			fechaEdit,
			ndocumentoEdit,
			codigoEdit,
			rutClienteEdit,
			montoEdit
		},
		success: function (response) {
			console.log(response);
			$('#modalEditarBoleta').modal('hide');
		}
	});
});




