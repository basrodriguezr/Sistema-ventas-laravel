'use strict';

function apruebaSolicitud(id_sol) {
    $.ajax({
        type: "POST",
        url: "/API/cambio/plan",
        data: { 'id': id_sol },
        dataType: "json",

        success: function (response) {

            var datos = '';
            var opt = '<option Selected disabled>Seleccione una opcion</option>';
            var opt2 = '';
            var opt3 = '';
            var opt4 = '';
            var opt5 = '';
            var opt6 = '';
            var opt7 = '';
            response.estado.forEach(element => {
                opt = opt +
                    `
                    <option value="${element.id_estado}">${element.name_estado}</option>
                `;
            });

            response.upPlan.forEach(element2 => {
                opt2 = opt2 +
                    `
                ${element2.razonSocial_emp}
                `;
            });

            response.upPlan.forEach(element3 => {
                opt3 = opt3 +
                    `
                ${element3.nombre_plan}
                `;
            });

            response.nuevoPlan.forEach(element4 => {
                opt4 = opt4 + `
                ${element4.nombre_plan}
                `;
            });
            response.upPlan.forEach(element5 => {
                opt5 = opt5 + `
                ${element5.id_PlanSol}
                `;
            });

            response.upPlan.forEach(element6 => {
                opt6 = opt6 + `
                ${element6.idAjustePlan}
                `;
            });

            response.upPlan.forEach(element7 => {
                opt7 = opt7 + `
                ${element7.idSolicitudPlan}
                `;
            });

            response.upPlan.forEach(element7 => {
                datos = datos + `
                        ${element7.obs_solicitud}
                `;
            });

            swal.fire({
                title: 'Solicitud de Cambio de Plan',
                html: `
                <input type="text" id="idSolicitud" value="${opt7}" required class="form-control" hidden />
                <input type="text" id="ajuste" value="${opt6}" required class="form-control" hidden />
                <input type="text" id="PlanCambioId" value="${opt5}" required class="form-control" hidden />
                <div class="container row">
                        <div class="col-md-6">
                            <label>Razon Social</label>
                            <input type="text" id="razon" value="${opt2}" required class="form-control" disabled />
                        </div>
                        <div class="col-md-6">
                            <label>Plan Actual</label>
                            <input type="text" required id="plan" value="${opt3}" class="form-control"disabled />
                        </div>
                        <div class="col-md-6">
                            <label>Plan a Cambiar</label>
                            <input type="text" required id="planC" value="${opt4}"  class="form-control"disabled />
                        </div>

                        <div class="col-md-6">
                            <label>Estado de Proceso</label>
                            <select class="form-control" required id="estado">
                             ${opt}
                            </select>
                        </div>
                        <div class="col-md-12 ">
                            <label>Observacion</label>
                            <input type="text" required id="obs" value="${datos}" class="form-control"/></td>
                        </div>
                </div>                                
                `,
                animation: false,
                width: 1000,
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                preConfirm: function (value) {

                    return new Promise((resolve, reject) => {
                        resolve({
                            estado: $('#estado').val(),
                            obs: $('#obs').val(),
                            ajuste: $('#ajuste').val(),
                            plancambio: $('#PlanCambioId').val(),
                            idSolicitud: $('#idSolicitud').val()
                        });
                    });
                },
            }).then(function (result) {

                if (result.dismiss == 'cancel') {
                    initTable1();
                } else {
                    if (result.value.obs == '' || result.value.estado == null || result.value.ajuste == null || result.value.plancambio == null || result.value.idSolicitud == null) {
                        Swal.fire({
                            type: 'error',
                            text: 'Debe agregar una observacion para este proceso y seleccionar un estado',
                            title: 'Error'
                        }).then(function (result) {
                            if (result.value) {
                                apruebaSolicitud();
                            }
                        });
                    } else {

                        var userData = {
                            'obs': result.value.obs,
                            'estado': result.value.estado,
                            'ajuste': result.value.ajuste,
                            'plancambio': result.value.plancambio,
                            'idSolicitud': result.value.idSolicitud
                        }
                        $.ajax({
                            type: "PUT",
                            url: "/API/update/plan",
                            data: userData,

                            success: function (response) {


                                Swal.fire({
                                    type: 'success',
                                    text: 'Actualización de Plan registrado con exito',
                                    title: 'Modificación de Plan'
                                }).then(function (result) {
                                    console.log(result)
                                    if (result.value) {
                                        //window.location.replace('admin/solicitudes');
                                        //KTDatatablesDataSourceAjaxClient.initTable1.reload();
                                        KTDatatablesDataSourceAjaxClient.initTable1.clear().draw();
                                        KTDatatablesDataSourceAjaxClient.initTable1.rows.add(response);
                                        KTDatatablesDataSourceAjaxClient.initTable1.draw(false);
                                    }
                                });
                            }
                        });

                    }

                }


            });
        }
    });
}


var KTDatatablesDataSourceAjaxClient = function () {


    var empresa = 0;
    var sucursal = 0;
    var usuario = 0;

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
                url: 'API/getPlanALL',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 10,
                    },
                    empresa: empresa

                },
            },
            columns: [

                { data: 'username_usu' },
                { data: 'razonSocial_emp' },
                { data: 'nombre_plan' },
                { data: 'id_con' },
                { data: 'name_estado' },
                { data: 'id_sol' },



                /* {data: 'monto'}, */


            ],
            columnDefs: [
                {
                    targets: 4,
                    ordentable: true,
                    render: function (data, type, full, meta) {

                        if (data == 'Proceso')
                            return '<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill">' + data + '</span>';
                        if (data == 'Rechazado')
                            return '<span class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">' + data + '</span>';
                        if (data == 'Aceptado')
                            return '<span class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">' + data + '</span>';

                    },
                },

                {
                    targets: 5,
                    title: "Accion",
                    render: function (data, type, full, meta) {

                        return `
                                <button class='btn btn-sm btn-clean btn-icon btn-icon-md' data-container="body" onclick="apruebaSolicitud(`+ full.id_sol + `);"><i class="flaticon-search"></i></button>
                                
                                 `;
                    },
                },

            ]

        });


        actualizarPlan("#kt_table_2 tbody", table);
    };


    var actualizarPlan = function (tbody, table) {
        $(tbody).on("click", "ActualizarPlan", function () {

            if (table.row(this).child.isShown()) {

                var data = table.row(this).data();
            } else {
                var data = table.row($(this).parents("tr")).data();
            }


        })
    }




    return {

        //main function to initiate the module
        init: function () {
            initTable1();
        },



    };

}();

////////////////////////////////* DATATABLE DE SOLICITUD DE SUCURSALES *///////////////////////////










jQuery(document).ready(function () {
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


