'use strict';

function apruebaSolicitudSucursal (id_su) {
    $.ajax({
        type: "POST",
        url: "/API/sucursal/solicitud",
        data: {'id':id_su},
        dataType: "json",
        
        success: function (response) {
          
            var datos = '';
            var datos2 = '';
            var datos3 = '';
            var datos4 = '';
            var datos5 = '';
            var datos6 = '';
            var datos7 = '';
            var opt = '<option Selected disabled>Seleccione una opcion</option>';
           
            response.estado.forEach(element => {
                opt= opt+ 
                `
                    <option value="${element.id_estado}">${element.name_estado}</option>
                `;
            });

            response.sucursal.forEach(element2 => {
                datos= datos+ 
                `
                ${element2.nombre_pun}
                `;
            });
            response.sucursal.forEach(element3 => {
                datos2= datos2+ 
                `
                ${element3.nombre_com}
                `;
            });
            response.sucursal.forEach(element4 => {
                datos3= datos3+ 
                `
                ${element4.direccion_pun}
                `;
            });

            response.sucursal.forEach(element5 => {
                datos4= datos4+ 
                `
                ${element5.obs_solicitud}
                `;
            });

            response.sucursal.forEach(element6 => {
                datos5= datos5+ 
                `
                ${element6.id_su}
                `;
            });
            response.sucursal.forEach(element7 => {
                datos6= datos6+ 
                `
                ${element7.id_com}
                `;
            });
            response.sucursal.forEach(element8 => {
                datos7= datos7+ 
                `
                ${element8.id_emp}
                `;
            });

         
            swal.fire({
                title: 'Solicitud de Sucursal',
                html: `
                <input type="text" id="idEmpresa" value="${datos7}" required class="form-control" hidden />
                <input type="text" id="idSolicitud" value="${datos5}" required class="form-control" hidden />
                <input type="text" id="idComuna" value="${datos6}" required class="form-control" hidden />
               
                <div class="container row">
                        <div class="col-md-6">
                            <label>Nombre Sucursal</label>
                            <input type="text" id="nameSucursal" value="${datos}" required class="form-control" disabled />
                        </div>
                        <div class="col-md-6">
                            <label>Dirección Sucursal</label>
                            <input type="text" required id="direccionSucursal" value="${datos3}" class="form-control"disabled />
                        </div>
                        <div class="col-md-6">
                            <label>Comuna</label>
                            <input type="text" required id="comuna" value="${datos2}"  class="form-control"disabled />
                        </div>

                        <div class="col-md-6">
                            <label>Estado de Proceso</label>
                            <select class="form-control" required id="estado">
                             ${opt}
                            </select>
                        </div>

                        <div class="col-md-12 ">
                            <label>Observacion</label>
                            <input type="text" required id="obs"  value="${datos4}" class="form-control"/>
                            
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
                                idEmpresa: $('#idEmpresa').val(),
                                idSolicitud: $('#idSolicitud').val(),
                                nameSucursal: $('#nameSucursal').val(),
                                obs: $('#obs').val(),
                                direccionSucursal: $('#direccionSucursal').val(),
                                comuna: $('#comuna').val(),
                                estado: $('#estado').val(),
                                idComuna: $('#idComuna').val()
                            });
                        });                             
                },
            }).then(function(result) {
                if(result.dismiss == 'cancel'){
                    sucursales();
                }else{
                    if(result.value.obs == '' || result.value.estado == null ||result.value.idSolicitud == null || result.value.nameSucursal=='' || result.value.direccionSucursal=='' ||
                result.value.comuna== '' ||result.value.idComuna=='' || result.value.idEmpresa=='')
                {
                    Swal.fire({
                        type: 'error',
                        text: 'Debe agregar una observacion para este proceso y seleccionar un estado',
                        title: 'Error'
                    }).then(function(result) {
                        if(result.value){
                            apruebaSolicitudSucursal();
                        }
                    });
                }else{
                  
                        var userData = {
                            'obs': result.value.obs,
                            'estado': result.value.estado,
                            'nameSucursal':result.value.nameSucursal,
                            'comuna': result.value.comuna,
                            'direccionSucursal': result.value.direccionSucursal,
                            'idSolicitud': result.value.idSolicitud,
                            'idComuna': result.value.idComuna,
                            'idEmpresa':result.value.idEmpresa
                        }
                        $.ajax({
                            type: "POST",
                            url: "/API/agregar/sucursal",
                            data: userData,
                            
                            success: function (response) {
                              
                                Swal.fire({
                                    type: 'success',
                                    text: 'Creacion de Sucursal registrada con exito',
                                    title: 'Creacion de Sucursal'   
                                }).then(function(result) {
                                    if(result.value){
                                        sucursales();
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




var KTDatatablesDataSourceAjaxClient2 = function () {

    
    var empresa = 0;
    var sucursal = 0;
    var usuario = 0;

    var initTable2 = function () {
        var table = $('#kt_table_3');


        // begin first table
        table.DataTable({
            responsive: true,
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
                url: '/API/getSolicitudPALL',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 10,
                    },
                   

                },
            },
            columns: [

                { data: 'nombre_pun' },
                { data: 'direccion_pun' },
                { data: 'nombre_com' },
                { data: 'nombre_ciu' },
                { data: 'nombre_reg' },
                { data: 'name_estado' },
                { data: 'id_su' },



            ],
            columnDefs: [
                {
                    targets: 5,
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
                    targets: 6,
                    title: "Accion",
                    render: function (data, type, full, meta) {
                      
                        return `
                                <button class='btn btn-sm btn-clean btn-icon btn-icon-md' data-container="body" onclick="apruebaSolicitudSucursal(`+ full.id_su + `);"><i class="flaticon-search"></i></button>
                                
                                 `;
                    },
                },

            ]

        });

        
        actualizarSucursal("#kt_table_3 tbody", table);
    };

   
    var actualizarSucursal = function (tbody , table) {
        $(tbody).on("click","ActualizarSucursal", function(){
            console.log(table)
            if(table.row(this).child.isShown()){
                console.log(table)
                var data = table.row(this).data();
            }else{
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
	/*
	var table = $('#kt_table_1');
	
	CLICK EN EL BTN DATATABLE
	$('#kt_table_1').on( 'click', 'a.btnEliminar', function () {
		var data = $(this).parents('tr');
        console.log(data)
    } );
	*/
});
