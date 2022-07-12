'use strict';

function apruebaPuntoVenta (id_spv) {
    $.ajax({
        type: "POST",
        url: "/API/puntoventa/solicitud",
        data: {'id':id_spv},
        dataType: "json",
        
        success: function (response) {
            console.log(response)
            var datos = '';
            var opt = '<option Selected disabled>Seleccione una opcion</option>';
            var opt2='';
            var opt3='';
            var opt4='';
            var opt5='';
            var opt6='';
            var opt7='';
            var opt8='';
            var opt9='';
            var opt10='';
            var opt11='';
            response.estado.forEach(element => {
                opt= opt+ 
                `
                    <option value="${element.id_estado}">${element.name_estado}</option>
                `;
            });

            response.puntoventa.forEach(element2 => {
                opt2= opt2+ 
                `
                ${element2.nombre_spv}
                `;
            });

            response.puntoventa.forEach(element3 => {
                opt3= opt3+ 
                `
                ${element3.direccion_spv}
                `;
            });

            response.puntoventa.forEach(element4 => {
                opt4= opt4+  `
                ${element4.nombre_com}
                `;
            });
            response.puntoventa.forEach(element5 => {
                opt5= opt5+  `
                ${element5.nombre_ciu}
                `;
            });

            response.puntoventa.forEach(element6 => {
                opt6= opt6+  `
                ${element6.nombre_reg}
                `;
            });

            response.puntoventa.forEach(element7 => {
                opt7= opt7+  `
                ${element7.id_spv}
                `;
            });

            response.puntoventa.forEach(element9 => {
                opt8= opt8+  `
                ${element9.id_com}
                `;
            });

            response.puntoventa.forEach(element8 => {
                datos = datos + `
                        ${element8.obs_solicitud}
                `;
            });

            response.puntoventa.forEach(element10 => {
                opt9 = opt9 + `
                        ${element10.id_pun}
                `;
            });

            response.puntoventa.forEach(element11 => {
                opt10 = opt10 + `
                        ${element11.username_usu}
                `;
            });

            response.puntoventa.forEach(element12 => {
                opt11 = opt11 + `
                        ${element12.id_usu}
                `;
            });


            swal.fire({
                title: 'Solicitud de Punto Venta',

                html: `
                <input type="text" id="idSPuntoVenta" value="${opt7}" required class="form-control" hidden />
                <input type="text" id="idComuna" value="${opt8}" required class="form-control" hidden />
                <input type="text" id="idSucursal" value="${opt9}" required class="form-control" hidden />
                <input type="text" id="idUser" value="${opt11}" required class="form-control" hidden />
                <div class="container row">
                    <div class="col-md-6">
                            <label>Nombre Usuario a Asignar</label>
                            <input type="text" id="nombre" value="${opt10}" required class="form-control" disabled />
                        </div>
                        <div class="col-md-6">
                            <label>Nombre del Punto Venta</label>
                            <input type="text" id="nombre" value="${opt2}" required class="form-control" disabled />
                        </div>
                        <div class="col-md-6">
                            <label>Direccion</label>
                            <input type="text" required id="direccion" value="${opt3}" class="form-control"disabled />
                        </div>
                        <div class="col-md-6">
                            <label>Comuna</label>
                            <input type="text" required id="comuna" value="${opt4}"  class="form-control"disabled />
                        </div>
                        <div class="col-md-6">
                            <label>Ciudad</label>
                            <input type="text" required id="ciudad" value="${opt5}"  class="form-control"disabled />
                        </div>
                        <div class="col-md-6">
                            <label>Región</label>
                            <input type="text" required id="region" value="${opt6}"  class="form-control"disabled />
                        </div>

                        <div class="col-md-6">
                            <label>Estado de Proceso</label>
                            <select class="form-control" required id="estado">
                             ${opt}
                            </select>
                        </div>

                        <div class="col-md-12 ">
                            <label>Observacion</label>
                            <input type=text" required id="obs" value="${datos}" class="swal2-input">
                        
                        </div>
                        <input type='text>
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
                                idComuna: $('#idComuna').val(),
                                direccion: $('#direccion').val(),
                                nombre: $('#nombre').val(),
                                idSucursal:$('#idSucursal').val(),
                                idSPuntoVenta: $('#idSPuntoVenta').val(),
                                idUser: $('#idUser').val()
                            });
                    })
       /*              return new Promise((resolve, reject) => {

                        });    */                          
                },
            }).then(function(result) {
                if(result.dismiss == 'cancel'){
                    KTDatatablesDataSourceAjaxClient3.initTable3();
                }else{
                    if(result.value.obs == '' || result.value.estado == null ||result.value.idSPuntoVenta == null || result.value.direccion==null || 
                result.value.nombre==null ||result.value.idComuna==null || result.value.idUser==null )
                {
                    Swal.fire({
                        type: 'error',
                        text: 'Debe agregar una observacion para este proceso y seleccionar un estado',
                        title: 'Error'
                    }).then(function(result) {
                        if(result.value){
                            initTable3();
                        }else{
                            initTable3();
                        }
                    });
                }else{
                  
                        var userData = {
                            'obs': result.value.obs,
                            'estado': result.value.estado,
                            'nombre':result.value.nombre,
                            'direccion':result.value.direccion,
                            'idSPuntoVenta': result.value.idSPuntoVenta,
                            'idSolicitud': result.value.idSolicitud,
                            'idSucursal':result.value.idSucursal,
                            'idComuna' : result.value.idComuna,
                            'idUser' : result.value.idUser
                        }
                        $.ajax({
                            type: "POST",
                            url: "/API/agregar/puntoventa",
                            data: userData,
                            
                            success: function (response) {
                                console.log(response)
                                Swal.fire({
                                    type: 'success',
                                    text: 'Creación de Punto de Venta registrado con exito',
                                    title: 'Creación de Punto de Venta'   
                                }).then(function(result) {
                                    if(result.value){
                                        initTable3();
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



var KTDatatablesDataSourceAjaxClient3 = function () {


    var initTable3 = function () {
        var table = $('#kt_table_6');
        


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
                url: '/API/getSPuntoVenta',
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 10,
                    },
                   

                },
            },
            columns: [

                
                { data: 'nombre_spv' },
                { data: 'direccion_spv' },
                { data: 'razonSocial_emp' },
                { data: 'nombre_pun' },
                { data: 'name_estado' },
                { data: 'id_spv' },



            ],
            columnDefs: [
                {
                    targets: 4,
                    ordentable: true,
                    render: function (data, type, full, meta) {
                        console.log(data)
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
                        console.log(data)
                        return `
                                <button class='btn btn-sm btn-clean btn-icon btn-icon-md' data-container="body" onclick="apruebaPuntoVenta(`+ full.id_spv + `);"><i class="flaticon-search"></i></button>
                                
                                 `;
                    },
                },

            ]

        });

        
        actualizarPuntoVenta("#kt_table_6 tbody", table);
    };

   
    var actualizarPuntoVenta = function (tbody , table) {
        $(tbody).on("click","actualizarPuntoVenta", function(){
            console.log(table)
            if(table.row(this).child.isShown()){
                console.log(table)
                var data = table.row(this).data();
            }else{
                var data = table.row($(this).parents("tr")).data();
                table.ajax.reload();
            }


        })
    }


    

    return {

        //main function to initiate the module
        init: function () {
            initTable3();
        },
    };

}();


jQuery(document).ready(function () {
    KTDatatablesDataSourceAjaxClient3.init();
	/*
	var table = $('#kt_table_1');
	
	CLICK EN EL BTN DATATABLE
	$('#kt_table_1').on( 'click', 'a.btnEliminar', function () {
		var data = $(this).parents('tr');
        console.log(data)
    } );
	*/
});
