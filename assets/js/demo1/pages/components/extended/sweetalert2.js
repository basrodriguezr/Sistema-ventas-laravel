"use strict";

// Class definition
var KTSweetAlert2Demo = function () {

    // Demos
    var initDemos = function () {
        // Sweetalert Demo 1
        $('#kt_sweetalert_demo_1').click(function (e) {
            swal.fire('Good job!');
        });

        // Sweetalert Demo 2
        $('#kt_sweetalert_demo_2').click(function (e) {
            swal.fire("Here's the title!", "...and here's the text!");
        });

        // Sweetalert Demo 3
        $('#kt_sweetalert_demo_3_1').click(function (e) {
            swal.fire("Good job!", "You clicked the button!", "warning");
        });

        $('#kt_sweetalert_demo_3_2').click(function (e) {
            swal.fire("Good job!", "You clicked the button!", "error");
        });

        $('#kt_sweetalert_demo_3_3').click(function (e) {
            swal.fire("Good job!", "You clicked the button!", "success");
        });

        $('#kt_sweetalert_demo_3_4').click(function (e) {
            swal.fire("Good job!", "You clicked the button!", "info");
        });

        $('#kt_sweetalert_demo_3_5').click(function (e) {
            swal.fire("Good job!", "You clicked the button!", "question");
        });

        // Sweetalert Demo 4
        $('#kt_sweetalert_demo_4').click(function (e) {
            swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Confirm me!",
                confirmButtonClass: "btn btn-brand"
            });
        });

        // Sweetalert Demo 5
        $('#kt_sweetalert_demo_5').click(function (e) {
            swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                type: "success",

                buttonsStyling: false,

                confirmButtonText: "<i class='la la-headphones'></i> I am game!",
                confirmButtonClass: "btn btn-danger",

                showCancelButton: true,
                cancelButtonText: "<i class='la la-thumbs-down'></i> No, thanks",
                cancelButtonClass: "btn btn-default"
            });
        });

        $('#kt_sweetalert_demo_6').click(function (e) {
            swal.fire({
                position: 'top-right',
                type: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
        });

        //MODULOS PERFIL ADMINISTRADOR//

        $('#usuario_sweet').click(function (e) {
            e.preventDefault();
            prueba1();

            /*  */
        });


        $('#userTrabajador').click(function (e) {
            e.preventDefault();
            userTrabajador();

            /*  */
        });

        $('#usuario_admin').click(function (e) {
            e.preventDefault();
            prueba2();

            /*  */
        });




        $('#puntos_sweet').click(function (e) {
            e.preventDefault();
            puntos();

            /*  */
        });

        $('#empresa_sweet').click(function (e) {
            e.preventDefault();
            empresa();

            /*  */
        });

        $('#listempresa_sweet').click(function (e) {
            e.preventDefault();
            listEmpresas();

            /*  */
        });

        $('#plan_ventas').click(function (e) {
            e.preventDefault();
            plan_ventas();
        });

        ///////MODULO ESTADOS FUNCTION///////

        $('#estado_plan_sweet').click(function (e) {
            e.preventDefault();
            estado_plan_sweet();
        });

        $('#estado_sucursal_sweet').click(function (e) {
            e.preventDefault();
            estado_sucursal_sweet();
        });

        $('#estado_pos_sweet').click(function (e) {
            e.preventDefault();
            estado_pos_sweet();
        });









        ///////////////////AJAX DE MODULOS DE ESTADOS/////////////////////////

        function estado_plan_sweet() {
            $('#estadoCambioPlan').DataTable({

            });
            $.ajax({
                type: "POST",
                url: "/admin/estadosolicitud/planes",
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    var datos = '';
                    var datos2 = '';

                    response.cambio.forEach(element => {
                        datos2 = datos2 + `     
                                    ${element.nombre_plan}
                        `;
                    });
                    response.plan.forEach(element => {
                        datos = datos + `
                                <tr>
                                    <td class="align-middle">${element.username_usu}</td>
                                    <td class="align-middle">${element.razonSocial_emp}</td>
                                    <td class="align-middle">${element.nombre_plan}</td>
                                    <td class="align-middle">${datos2}</td>
                                    <td class="align-middle">${element.name_estado}</td>
                                    
                                    <td class="align-top"><button id="btnEditar_Plan" datos="${element.id_sol}" class="btn btn-success btnEdit" style="margin-top : -.5%"><i class="flaticon-eye"></i></button></td>
                                </tr>
                        `;
                    });
                    swal.fire({
                        title: 'Estado Solicitud Cambio de Plan',
                        html: `
                        <table class="table table-hover" id="estadoCambioPlan">
                            <thead>
                        <th>Nombre Usuario</th>
                        <th>Nombre Empresa</th>
                        <th>Plan Actual</th>
                        <th>a Cambiar</th>
                        <th>Estado Solicitud</th>
                        <th>Observación</th>
                        </thead>
                            <tbody>
                                ${datos}
                            </tbody>
                        </table>
                        `,
                        animation: true,
                        width: 700,
                    })
                    $('.btnEdit').click(function (e) {
                        e.preventDefault();
                        obsPlan($(this).attr('datos'));
                    });
                }
            });
        }

        function obsPlan(id_sol) {
            $.ajax({
                type: "POST",
                url: "/admin/obsPlan",
                data: { "id": id_sol },
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    var datos = '';
                    response.forEach(element => {
                        datos = datos + `
                        ${element.obs_solicitud}
                        `;
                    });
                    swal.fire({
                        title: 'Observacion de la Solicitud de Cambio de Plan',
                        html: `
                        <div class="container row">
                                            

                        <div class="col-md-12 ">
                            <label>Observación</label>
                            <input type="text" style="text-align:right" required id="obs" value="${datos}" class="form-control"  disabled/></td>
                        </div>
                         </div>  
                        
                        `,
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then(function (result) {
                        if (result.value) {
                            estado_plan_sweet();
                        }
                    })
                }

            })
        }

        //////////AJAX DE MODULO DE CONSULTA DE ESTADO DE SUCURSALES/////////
        function estado_sucursal_sweet() {
            $.ajax({
                type: "POST",
                url: "/admin/estadosolicitud/sucursal",
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    var datos = '';
                    response.forEach(element => {
                        datos = datos + `
                                <tr>
                                    <td class="align-middle">${element.nombre_pun}</td>
                                    <td class="align-middle">${element.direccion_pun}</td>
                                    <td class="align-middle">${element.razonSocial_emp}</td>
                                    <td class="align-middle">${element.nombre_com}</td>
                                    <td class="align-middle">${element.name_estado}</td>
                                    
                                    <td class="align-top"><button id="btnEditar_Sucursal" datos="${element.id_su}" class="btn btn-success btnEdit2" style="margin-top : -.5%"><i class="flaticon-eye"></i></button></td>
                                </tr>
                        `;
                    });
                    swal.fire({
                        title: 'Estado Solicitud Sucursal Nueva',
                        html: `
                        <table class="table table-hover">
                            <thead>
                        <th>Nombre Sucursal</th>
                        <th>Direccion Sucursal</th>
                        <th>Empresa</th>
                        <th>Comunar</th>
                        <th>Estado Solicitud</th>
                        <th>Observación</th>
                        </thead>
                            <tbody>
                                ${datos}
                            </tbody>
                        </table>
                        `,
                        animation: true,
                        width: 700,
                    })
                    $('.btnEdit2').click(function (e) {
                        e.preventDefault();
                        obsSucursal($(this).attr('datos'));
                    });
                }
            });
        }

        function obsSucursal(id_su) {
            $.ajax({
                type: "POST",
                url: "/admin/obsSucursal",
                data: { "id": id_su },
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    var datos = '';
                    response.forEach(element => {
                        datos = datos + `
                        ${element.obs_solicitud}
                        `;
                    });
                    swal.fire({
                        title: 'Observacion de la Solicitud de Cambio de Plan',
                        html: `
                        <div class="container row">
                                            

                        <div class="col-md-12 ">
                            <label>Observación</label>
                            <input type="text" required id="obs" value="${datos}" class="form-control" disabled/></td>
                        </div>
                         </div>  
                        
                        `,
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then(function (result) {
                        if (result.value) {
                            estado_sucursal_sweet();
                        }
                    })
                }

            })
        }


        //////////AJAX DE MODULO DE CONSULTA DE ESTADO DE PUNTOS DE VENTAS/////////

        function estado_pos_sweet() {
            $.ajax({
                type: "POST",
                url: "/admin/estadosolicitud/POS",
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    var datos = '';
                    response.forEach(element => {
                        datos = datos + `
                                <tr>
                                    <td class="align-middle">${element.username_usu}</td>
                                    <td class="align-middle">${element.nombre_pun}</td>
                                    <td class="align-middle">${element.nombre_spv}</td>
                                    <td class="align-middle">${element.direccion_spv}</td>
                                    <td class="align-middle">${element.razonSocial_emp}</td>
                                    <td class="align-middle">${element.nombre_com}</td>
                                    <td class="align-middle">${element.name_estado}</td>
                                    <td class="align-middle">${element.obs_solicitud}</td>
                                    
                                    <td class="align-top"><button id="btnEditar_Sucursal" datos="${element.id_spv}" class="btn btn-success btnEdit2" style="margin-top : -.5%"><i class="flaticon-eye"></i></button></td>
                                </tr>
                        `;
                    });
                    swal.fire({
                        title: 'Estado Solicitud Sucursal Nueva',
                        html: `
                        <table class="table table-hover">
                            <thead>
                        <th>Nombre Usuario a asignar</th>
                        <th>Nombre Sucursal Solicitante</th>
                        <th>Nombre Punto de Venta</th>
                        <th>Direccion Punto de Venta</th>
                        <th>Empresa</th>
                        <th>Comuna</th>
                        <th>Estado Solicitud</th>
                        <th>Observación</th>
                        </thead>
                            <tbody>
                                ${datos}
                            </tbody>
                        </table>
                        `,
                        animation: true,
                        width: 1100,
                    })
                    $('.btnEdit2').click(function (e) {
                        e.preventDefault();
                        obsPOS($(this).attr('datos'));
                    });
                }
            });
        }

        function obsPOS(id_spv) {
            $.ajax({
                type: "POST",
                url: "/admin/obsPOS",
                data: { "id": id_spv },
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    var datos = '';
                    response.forEach(element => {
                        datos = datos + `
                        ${element.obs_solicitud}
                        `;
                    });
                    swal.fire({
                        title: 'Observacion de la Solicitud de Cambio de Plan',
                        html: `
                        <div class="container row">
                                            

                        <div class="col-md-12 ">
                            <label>Observación</label>
                            <input type="text" required id="obs" value="${datos}" class="form-control" disabled/></td>
                        </div>
                         </div>  
                        
                        `,
                        confirmButtonText: 'OK',
                        reverseButtons: true
                    }).then(function (result) {
                        if (result.value) {
                            estado_pos_sweet();
                        }
                    })
                }

            })
        }






        ///////////////////////////////////////////AJAX DE INFORMACION DE EMPRESA///////////////////////////////////////

        function empresa() {
            $.ajax({
                type: "POST",
                url: "/API/getEmpresa",
                dataType: "json",
                success: function (response) {
                    var datos = '';
                    response.forEach(element => {
                        datos = datos + `
                                <tr>
                                <th>Rut Empresa :<td>${element.rut_emp}</td></th> 
                                </tr>
                                <tr>
                                <th>Digito Verificador:<td>${element.dv_emp}</td></th> 
                                </tr>
                                <tr>
                                <th>Razon Social:<td>${element.razonSocial_emp}</td></th> 
                                </tr>
                                <tr>
                                <th>Dirección:<td>${element.direccion_emp}</td></th> 
                                </tr>
                                <tr>
                                <th>Correo Electronico:<td>${element.mail_emp}</td></th> 
                                </tr>
                                <tr>
                                <th>Telefono:<td>${element.telefono_emp}</td></th> 
                                </tr>
                                <tr>
                                <th>Giro:<td>${element.giro_emp}</td></th> 
                                </tr>
                                <tr>
                                <th>Sitio Web:<td>${element.web_emp}</td></th> 
                                </tr>
                                <tr>
                                <th>Plan Contratado:<td>${element.nombre_plan}</td></th> 
                                </tr>                                
                        `;
                    });
                    swal.fire({
                        title: 'Información Empresa',
                        html: `
                        <th><button id="btnAjusteE" class="btn btn-brand" onclick="window.location.href='/admin/ajustes/user/3'">Ajuste de Información</button></th>
                        <table class="table table-hover">
                            <tbody>
                                ${datos}
                            </tbody>
                            
                        </table>
                        `,
                        animation: true,
                        width: 500,
                    })
                    $('#btnAjusteE').click(function (e) {
                        e.preventDefault();

                    });
                }
            });

        }

        //////////////////////////////////////////////AJAX DE INFORMACION DE SUCURSALES//////////////////////////////////////////////////////
        function puntos() {
            $.ajax({
                type: "POST",
                url: "/API/getSucursales",
                dataType: "json",
                success: function (response) {
                    var datos = '';
                    response.forEach(element => {
                        datos = datos + `
                                <tr>
                                    <td> ${element.nombre_pun}</td>
                                    <td> ${element.direccion_pun}</td>
                                    <td>${element.nombre_com}</td>
                                    <td>${element.nombre_ciu}</td>
                                    <td>${element.nombre_reg}</td>
                                </tr>
                        `;
                    });

                    swal.fire({
                        title: 'Sucursales',
                        html: `
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre Sucursal</th>
                                    <th>Direccion Sucursal</th>
                                    <th>Comuna</th>
                                    <th>Ciudad</th>
                                    <th>Region</th>
                                    <th><button id="btnAgregarP" class="btn btn-brand">Solicitar</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${datos}
                            </tbody>
                        </table>
                        `,
                        animation: false,
                        width: 1000,


                    })
                    $('#btnAgregarP').click(function (e) {
                        e.preventDefault();
                        puntosForm();

                    });
                }
            });

        }
        ////////////////////////////////////////////////////AJAX PERFIL ADMINISTRADOR DE USUARIO TIPO TRABAJADOR DE EMPRESA////////////////////////////////
        function prueba2() {
            $.ajax({
                type: "POST",
                url: "/API/usuarios/listAdmin",
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    var datos = '';
                    response.usuarios.forEach(element => {
                        if (element.estado == 1) var check = '<input type="checkbox" class="estado" id="' + element.id + '" checked="checked" name="">';
                        else var check = '<input type="checkbox" class="estado" id="' + element.id + '" name="">';
                        datos = datos + `
                                <tr>
                                    <td> ${element.user}</td>
                                    <td> ${element.tipo}</td>
                                    <td> ${element.nombreEmpresa}</td>
                                    <td>
                                        <span class="kt-switch kt-switch--outline kt-switch--icon kt-switch--success">
                                            <label>
                                                ${check}
                                                <span></span>
                                            </label>
                                        </span>
                                    </td>
                                </tr>
                        `;
                    });

                    swal.fire({
                        title: 'Usuarios',
                        html: `
                        <th><button id="btnAgregar_usu" class="btn btn-brand">Agregar</button></th>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre usuario</th>
                                    <th>Tipo usuario</th>
                                    <th>Empresa asociada</th>
                                    
                                    <th>Habilitar</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                ${datos}
                            </tbody>
                        </table>
                        `,
                        animation: true,
                        width: 600,


                    })
                    $('.estado').change(function (e) {
                        e.preventDefault();
                        var id = $(this).attr('id');
                        var estado = $(this)
                        Swal.fire({
                            type: 'question',
                            text: 'Esta seguro que desea realizar esta accion?',
                            title: 'Confirmar',
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: 'Confirmar',

                        }).then(function (result) {
                            if (result.value) {
                                if (estado.prop('checked')) {
                                    var dat = {
                                        'id': id,
                                        'estado': 1
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: "/API/cambio/estado",
                                        data: dat,
                                        dataType: "json",
                                        success: function (response) {
                                            Swal.fire({
                                                type: 'success',

                                            }).then(function (result) {
                                                if (result.value) {
                                                    prueba1();
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    var dat = {
                                        'id': id,
                                        'estado': 0
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: "/API/cambio/estado",
                                        data: dat,
                                        dataType: "json",
                                        success: function (response) {
                                            Swal.fire({
                                                type: 'success',

                                            }).then(function (result) {
                                                if (result.value) {
                                                    prueba1();
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                            else {
                                prueba1();
                            }
                        });

                    });
                    $('#btnAgregar_usu').click(function (e) {
                        e.preventDefault();
                        prueba();

                    });
                }
            });

        }


        //////////////////////////////////////////////AJAX DE INFORMACION DE ESTADO DE USUARIOS///////////////////////////////////////////////////
        function prueba1() {
            $.ajax({
                type: "POST",
                url: "/API/usuarios/listAdmin",
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    var datos = '';
                    response.usuarios.forEach(element => {
                        if (element.estado == 1) var check = '<input type="checkbox" class="estado" id="' + element.id + '" checked="checked" name="">';
                        else var check = '<input type="checkbox" class="estado" id="' + element.id + '" name="">';
                        datos = datos + `
                                <tr>
                                    <td> ${element.user}</td>
                                    <td> ${element.tipo}</td>
                                    <td> ${element.nombreEmpresa}</td>
                                    <td>
                                        <span class="kt-switch kt-switch--outline kt-switch--icon kt-switch--success">
                                            <label>
                                                ${check}
                                                <span></span>
                                            </label>
                                        </span>
                                    </td>
                                </tr>
                        `;
                    });

                    swal.fire({
                        title: 'Usuarios',
                        html: `
                        <th><button id="btnAgregar_usu" class="btn btn-brand">Agregar</button></th>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre usuario</th>
                                    <th>Tipo usuario</th>
                                    <th>Empresa asociada</th>
                                    
                                    <th>Habilitar</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                ${datos}
                            </tbody>
                        </table>
                        `,
                        animation: true,
                        width: 600,


                    })
                    $('.estado').change(function (e) {
                        e.preventDefault();
                        var id = $(this).attr('id');
                        var estado = $(this)
                        Swal.fire({
                            type: 'question',
                            text: 'Esta seguro que desea realizar esta accion?',
                            title: 'Confirmar',
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: 'Confirmar',

                        }).then(function (result) {
                            if (result.value) {
                                if (estado.prop('checked')) {
                                    var dat = {
                                        'id': id,
                                        'estado': 1
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: "/API/cambio/estado",
                                        data: dat,
                                        dataType: "json",
                                        success: function (response) {
                                            Swal.fire({
                                                type: 'success',

                                            }).then(function (result) {
                                                if (result.value) {
                                                    prueba1();
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    var dat = {
                                        'id': id,
                                        'estado': 0
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: "/API/cambio/estado",
                                        data: dat,
                                        dataType: "json",
                                        success: function (response) {
                                            Swal.fire({
                                                type: 'success',

                                            }).then(function (result) {
                                                if (result.value) {
                                                    prueba1();
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                            else {
                                prueba1();
                            }
                        });

                    });
                    $('#btnAgregar_usu').click(function (e) {
                        e.preventDefault();
                        prueba();

                    });
                }
            });

        }


        ///////////////////////////AJAX DE USUARIO POR EMPRESA Y ASOCIADOS A UNA SUCURSAL SOLO DE TIPO TRABAJADOR//////////////////
        function userTrabajador() {
            $.ajax({
                type: "POST",
                url: "/API/usuariosListAdminEmpresa",
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    var datos = '';
                    response.usuarios.forEach(element => {
                        if (element.estado == 1) var check = '<input type="checkbox" class="estado" id="' + element.id + '" checked="checked" name="">';
                        else var check = '<input type="checkbox" class="estado" id="' + element.id + '" name="">';
                        datos = datos + `
                                <tr>
                                    <td> ${element.user}</td>
                                    <td> ${element.tipo}</td>
                                    <td> ${element.nombreEmpresa}</td>
                                    <td>
                                        <span class="kt-switch kt-switch--outline kt-switch--icon kt-switch--success">
                                            <label>
                                                ${check}
                                                <span></span>
                                            </label>
                                        </span>
                                    </td>
                                </tr>
                        `;
                    });

                    swal.fire({
                        title: 'Usuarios',
                        html: `
                        <th><button id="btnAgregar_usu" class="btn btn-brand">Agregar</button></th>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre usuario</th>
                                    <th>Tipo usuario</th>
                                    <th>Empresa asociada</th>
                                    
                                    <th>Habilitar</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                ${datos}
                            </tbody>
                        </table>
                        `,
                        animation: true,
                        width: 600,


                    })
                    $('.estado').change(function (e) {
                        e.preventDefault();
                        var id = $(this).attr('id');
                        var estado = $(this)
                        Swal.fire({
                            type: 'question',
                            text: 'Esta seguro que desea realizar esta accion?',
                            title: 'Confirmar',
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: 'Confirmar',

                        }).then(function (result) {
                            if (result.value) {
                                if (estado.prop('checked')) {
                                    var dat = {
                                        'id': id,
                                        'estado': 1
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: "/API/cambio/estado",
                                        data: dat,
                                        dataType: "json",
                                        success: function (response) {
                                            Swal.fire({
                                                type: 'success',

                                            }).then(function (result) {
                                                if (result.value) {
                                                    userTrabajador();
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    var dat = {
                                        'id': id,
                                        'estado': 0
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: "/API/cambio/estado",
                                        data: dat,
                                        dataType: "json",
                                        success: function (response) {
                                            Swal.fire({
                                                type: 'success',

                                            }).then(function (result) {
                                                if (result.value) {
                                                    userTrabajador();
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                            else {
                                userTrabajador();
                            }
                        });

                    });
                    $('#btnAgregar_usu').click(function (e) {
                        e.preventDefault();
                        addUserTrabajador();

                    });
                }
            });

        }



        function addUserTrabajador() {
            $.ajax({
                type: "POST",
                url: "/API/tipoUsuariosAdmin",
                dataType: "json",
                success: function (response) {
                    var opt = '<option Selected disabled>Seleccione una opcion</option>';
                    response.tipo.forEach(element => {
                        opt = opt +
                            `
                            <option value="${element.id_tu}">${element.descripcion_tu}</option>
                        `;
                    });
                    var opt2 = '<option Selected disabled>Seleccione una opcion</option>';
                    response.empresa.forEach(element2 => {
                        opt2 = opt2 +
                            `
                            <option value="${element2.id_emp}">${element2.razonSocial_emp}</option>
                        `;
                    });

                    var opt3 = '<option Selected disabled>Seleccione una opcion</option>';
                    response.sucursal.forEach(element3 => {
                        opt3 = opt3 +
                            `
                            <option value="${element3.id_pun}">${element3.nombre_pun}</option>
                        `;
                    });
                    swal.fire({
                        title: 'Agregar usuario',
                        html: `
                            <div class="container row">
                                <div class="col-md-6">
                                    <label>Nombre Usuario</label>
                                    <input type="text" id="nombreUser" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Nombres</label>
                                    <input type="text" id="nombres" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Apellidos</label>
                                    <input type="text" id="apellidos" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Rut Usuario</label>
                                    <input type="number" id="rut" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>DV Usuario</label>
                                    <input type="text" id="dv" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Telefono</label>
                                    <input type="number" id="telefono" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Email</label>
                                    <input type="email" id="email" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Tipo de Usuario</label>
                                    <select class="form-control" required id="tipoUser">
                                     ${opt}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label>Contraseña</label>
                                    <input type="password" required id="password" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Confirmar contraseña</label>
                                    <input type="password" required id="Cpassword" class="form-control" />
                                </div>

                                <div class="col-md-6">
                                    <label>Empresa asociada</label>
                                    <select class="form-control" required id="empresa">
                                     ${opt2}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label>Sucursal asociada</label>
                                    <select class="form-control" required id="sucursal">
                                    ${opt3}
                                    </select>
                                </div>
                            </div>
                        `,
                        animation: false,
                        width: 1000,
                        showCancelButton: true,
                        confirmButtonText: 'Solicitar',
                        cancelButtonText: 'Cancelar',
                        preConfirm: function (value) {

                            return new Promise((resolve, reject) => {
                                resolve({
                                    user: $('#nombreUser').val(),
                                    nombre: $('#nombres').val(),
                                    apellido: $('#apellidos').val(),
                                    rut: $('#rut').val(),
                                    dv: $('#dv').val(),
                                    telefono: $('#telefono').val(),
                                    email: $('#email').val(),
                                    tipo: $('#tipoUser').val(),
                                    empresa: $('#empresa').val(),
                                    password: $('#password').val(),
                                    sucursal: $('#sucursal').val(),
                                    Cpassword: $('#Cpassword').val()
                                });
                            });
                        },
                    }).then(function (result) {
                        if (result.dismiss == 'cancel') {
                            userTrabajador();
                        } else {
                            if (result.value.user == '' || result.value.nombre == '' || result.value.apellido == '' || result.value.rut == '' || 
                            result.value.dv == '' || result.value.telefono == '' || result.value.email == '' || result.value.tipo == null || 
                            result.value.password == '' || result.value.Cpassword == ''||result.value.sucursal=='') {
                                Swal.fire({
                                    type: 'error',
                                    text: 'Todos los campos son requierdos',
                                    title: 'Error'
                                }).then(function (result) {
                                    if (result.value) {
                                        addUserTrabajador();
                                    }
                                });
                            } else {
                                if (result.value.password != result.value.Cpassword) {
                                    Swal.fire({
                                        type: 'warning',
                                        text: 'Las contraseñas no coinciden',
                                        title: 'Error'
                                    }).then(function (result) {
                                        if (result.value) {
                                            addUserTrabajador();
                                        }
                                    });

                                } else {
                                    var userData = {
                                        'user': result.value.user,
                                        'nombre': result.value.nombre,
                                        'apellido': result.value.apellido,
                                        'rut': result.value.rut,
                                        'dv': result.value.dv,
                                        'telefono': result.value.telefono,
                                        'email': result.value.email,
                                        'tipo': result.value.tipo,
                                        'empresa': result.value.empresa,
                                        'password': result.value.password,
                                        'sucursal': result.value.sucursal
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: "/API/agregar/user",
                                        data: userData,
                                        success: function (response) {
                                            Swal.fire({
                                                type: 'success',
                                                text: 'El usuario se registro con exito',
                                                title: 'Usuario agregado'
                                            }).then(function (result) {
                                                if (result.value) {
                                                    userTrabajador();
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        }


                    });
                }
            });
        }




        ///////////////////////////////////////////////////////////AJAX DE listado DE Empresas///////////////////////////////////////////////////////
        function listEmpresas() {
            $.ajax({
                type: "POST",
                url: "/API/getEmpresaAll",
                dataType: "json",
                success: function (response) {

                    console.log(response)
                    var datos = '';
                    response.forEach(element => {
                        datos = datos + `
                                        <tr>
                                            <td> ${element.rut_emp}</td>
                                            <td> ${element.dv_emp}</td>
                                            <td> ${element.razonSocial_emp}</td>
                                            <td> ${element.direccion_emp}</td>
                                            <td> ${element.nombre_com}</td>
                                            <td> ${element.mail_emp}</td>
                                            <td> ${element.telefono_emp}</td>
                                            <td> ${element.giro_emp}</td>
                                            <td> ${element.web_emp}</td>
                                            <td> ${element.nombre_plan}</td>
                                            
                                        </tr>
                                `;
                    });
                    swal.fire({
                        title: 'Listado de Empresas',
                        html: `
                                <th><button id="btnAgregar_usu" class="btn btn-brand">Agregar</button></th>
                                <table class="table table-hover">
                                    <thead>    
                                        <tr>
                                            <th>Rut Empresa</th>
                                            <th>DV</th>
                                            <th>Razon Social</th>
                                            <th>Dirección</th>
                                            <th>Comuna</th>
                                            <th>Correo Electronico</th>
                                            <th>Telefono</th>
                                            <th>Giro</th>
                                            <th>Sitio Web</th>
                                            <th>Plan Contratado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${datos}
                                    </tbody>
                                    
                                </table>
                                `,
                        animation: true,
                        width: 1500,
                    })
                        ;
                    $('#btnAgregar_usu').click(function (e) {
                        e.preventDefault();
                        listPrueba();


                    });
                }
            });

        }

        ////////////////////////////Creacion de  Empresas////////////////////////////



        function listPrueba() {
            $.ajax({
                type: "POST",
                url: "/API/comunas",
                dataType: "json",
                success: function (response) {

                    var opt = '<option Selected disabled>Seleccione una opcion</option>';
                    response.comuna.forEach(element => {
                        opt = opt +
                            `
                            <option value="${element.id_com}">${element.nombre_com}</option>
                        `;

                    });

                    var opt2 = '<option Selected disabled>Seleccione una opcion</option>';
                    response.plan.forEach(element2 => {
                        opt2 = opt2 +
                            `
                            <option value="${element2.id_con}">${element2.nombre_plan}</option>
                        `;

                    });

                    swal.fire({
                        title: 'Agregar Empresa',
                        html: `
                            <div class="container row">
                                <div class="col-md-6">
                                    <label>Rut Empresa</label>
                                    <input type="number" id="rut" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>DV</label>
                                    <input type="number" id="dv" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Razon Social</label>
                                    <input type="text" id="razon" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Dirección</label>
                                    <input type="text" id="direccion" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Comuna</label>
                                    <select class="form-control" required id="comuna" >
                                     ${opt}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label>Actividad Economica</label>
                                    <input type="number" id="acteco" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Número Resolución</label>
                                    <input type="number" id="nroresol" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Codigo Sucursal SII</label>
                                    <input type="number" id="csi" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Correo Electronico</label>
                                    <input type="text" id="email" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Telefono</label>
                                    <input type="number" id="telefono" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Giro</label>
                                    <input type="text" id="giro" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Sitio Web</label>
                                    <input type="text" id="web" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                <label>Plan Inicial</label>
                                <select class="form-control" required id="plan" >
                                 ${opt2}
                                </select>
                            </div>
                                
                            </div>
                            
                               
                                
                        `,

                        animation: false,
                        width: 1000,
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Solicitar',
                        onOpen: () => {
                            $('#comuna1').select2({
                                data: ["Piano", "Flute", "Guitar", "Drums", "Photography"],
                                tags: true,
                                maximumSelectionLength: 10,
                                tokenSeparators: [',', ' '],
                                placeholder: "Select or type keywords"
                            });
                        },
                        preConfirm: function (value) {

                            return new Promise((resolve, reject) => {
                                resolve({
                                    rut: $('#rut').val(),
                                    dv: $('#dv').val(),
                                    razon: $('#razon').val(),
                                    direccion: $('#direccion').val(),
                                    comuna: $('#comuna').val(),
                                    acteco: $('#acteco').val(),
                                    nroresol: $('#nroresol').val(),
                                    csi: $('#csi').val(),
                                    email: $('#email').val(),
                                    telefono: $('#telefono').val(),
                                    giro: $('#giro').val(),
                                    web: $('#web').val(),
                                    plan: $('#plan').val()
                                });


                            });

                        },
                    }).then(function (result) {
                        console.log(result)
                        if (result.dismiss == 'cancel') {
                            listEmpresas();
                        } else {
                            if (result.value.rut == '' || result.value.dv == '' || result.value.csi == '' || result.value.razon == ''
                                || result.value.direccion == '' || result.value.acteco == '' || result.value.nroresol == '' || result.value.email == '' ||
                                result.value.telefono == '' || result.value.giro == '' || result.value.web == '' || result.value.plan == '') {
                                Swal.fire({
                                    type: 'error',
                                    text: 'Todos los campos son requierdos',
                                    title: 'Error'
                                }).then(function (result) {
                                    if (result.value) {
                                        listPrueba();
                                    }
                                });


                            } else {
                                var userData = {
                                    'rut': result.value.rut,
                                    'dv': result.value.dv,
                                    'razon': result.value.razon,
                                    'direccion': result.value.direccion,
                                    'comuna': result.value.comuna,
                                    'acteco': result.value.acteco,
                                    'nroresol': result.value.nroresol,
                                    'csi': result.value.csi,
                                    'email': result.value.email,
                                    'telefono': result.value.telefono,
                                    'giro': result.value.giro,
                                    'web': result.value.web,
                                    'plan': result.value.plan
                                }
                            }


                            $.ajax({
                                type: "POST",
                                url: "/API/agregar/empresa",
                                data: userData,

                                success: function (response) {
                                    console.log(response)
                                    Swal.fire({
                                        type: 'success',
                                        text: 'La empresa se registro con exito',
                                        title: 'Empresa agregada'
                                    }).then(function (result) {
                                        if (result.value) {
                                            listEmpresas();
                                        }
                                    });
                                }
                            });

                        }



                    });

                }
            });



        }




        ////////////////////////////////////AJAX DE INFORMACION DE REGION//////////////////////////////////
        function puntosForm() {
            $.ajax({
                type: "POST",
                url: "/API/getRegionCiudadComuna",
                dataType: "json",
                success: function (response) {
                    var opt = '<option Selected disabled>Seleccione una opcion</option>';
                    response.regiones.forEach(element => {
                        opt = opt +
                            `
                            <option value="${element.id_reg}">${element.nombre_reg}</option>
                        `;
                    });
                    var optCiu = '<option Selected disabled>Seleccione una opcion</option>';
                    response.ciudades.forEach(element => {
                        optCiu = optCiu +
                            `
                            <option value="${element.id_ciu}">${element.nombre_ciu}</option>
                        `;
                    });
                    var optCom = '<option Selected disabled>Seleccione una opcion</option>';
                    response.comunas.forEach(element => {
                        optCom = optCom +
                            `
                            <option value="${element.id_com}">${element.nombre_com}</option>
                        `;
                    });

                    swal.fire({
                        title: 'Solicitar Sucursal',
                        html: `
                            <div class="container row">
                                <div class="col-md-6">
                                    <label>Nombre Sucursal</label>
                                    <input type="text" id="nombreUser" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Direccion Sucursal</label>
                                    <input type="text" id="direccion" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Regiones</label>
                                    <select class="form-control" required id="region">
                                     ${opt}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label>Ciudades</label>
                                    <select class="form-control" required id="ciudad">
                                     ${optCiu}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label>Comunas</label>
                                    <select class="form-control" required id="comuna">
                                     ${optCom}
                                    </select>
                                </div>
                            </div>
                        `,
                        animation: false,
                        width: 1000,
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Solicitar',
                        preConfirm: function (value) {
                            return new Promise((resolve, reject) => {
                                resolve({
                                    nombre: $('#nombreUser').val(),
                                    direccion: $('#direccion').val(),
                                    comuna: $('#comuna').val()

                                });
                            });
                        },
                    }).then(function (result) {
                        console.log(result)
                        if (result.dismiss == 'cancel') {
                            puntos();
                        } else {

                            if (result.value.nombre == '' || result.value.direccion == null || result.value.comuna == '') {
                                Swal.fire({
                                    type: 'error',
                                    text: 'Todos los campos son requierdos',
                                    title: 'Error'
                                }).then(function (result) {
                                    if (result.value) {
                                        puntosForm();
                                    }
                                });
                            } else {
                                var userData = {
                                    'nombre': result.value.nombre,
                                    'direccion': result.value.direccion,
                                    'comuna': result.value.comuna
                                }
                                $.ajax({
                                    type: "POST",
                                    url: "/API/setSolicitudS",
                                    data: userData,
                                    success: function (response) {
                                        Swal.fire({
                                            type: 'success',
                                            text: 'La solicitud de agregar una Sucursal ha sido ingresada exitosamente',
                                            title: 'Solicitud de Sucursal'
                                        }).then(function (result) {
                                            if (result.value) {
                                                puntos();
                                            }
                                        });
                                    }
                                });
                            }
                        }


                    });
                    $("#region").change(function (e) {
                        e.preventDefault();

                        var dat = {
                            'id': $("#region").val()
                        }
                        $.ajax({
                            type: "POST",
                            url: "API/getCiudad",
                            data: dat,
                            dataType: "json",
                            success: function (response) {
                                var optC = '<option>Seleccione una ciudad</option>'
                                response.forEach(element => {
                                    optC = optC + `
                                    
                                        <option value="${element.id_ciu}">${element.nombre_ciu}</option>
                                    `;
                                });
                                $("#ciudad").empty().append(optC);
                            }
                        });
                    });

                    $("#ciudad").change(function (e) {
                        e.preventDefault();

                        var dat = {
                            'id': $("#ciudad").val()
                        }
                        $.ajax({
                            type: "POST",
                            url: "API/getComuna",
                            data: dat,
                            dataType: "json",
                            success: function (response) {
                                var optC = '<option>Seleccione una comuna</option>'
                                response.forEach(element => {
                                    optC = optC + `
                                        <option value="${element.id_com}">${element.nombre_com}</option>
                                    `;
                                });
                                $("#comuna").empty().append(optC);
                            }
                        });
                    });
                }
            });
        }





        ///////////////////////////////////////////TABLA DE TIPOS DE USUARIOS/////////////////////////////////////////
        function prueba() {
            $.ajax({
                type: "POST",
                url: "/API/tipoUsuarios",
                dataType: "json",
                success: function (response) {
                    var opt = '<option Selected disabled>Seleccione una opcion</option>';
                    response.tipo.forEach(element => {
                        opt = opt +
                            `
                            <option value="${element.id_tu}">${element.descripcion_tu}</option>
                        `;
                    });
                    var opt2 = '<option Selected disabled>Seleccione una opcion</option>';
                    response.empresa.forEach(element2 => {
                        opt2 = opt2 +
                            `
                            <option value="${element2.id_emp}">${element2.razonSocial_emp}</option>
                        `;
                    });
                    swal.fire({
                        title: 'Agregar usuario',
                        html: `
                            <div class="container row">
                                <div class="col-md-6">
                                    <label>Nombre Usuario</label>
                                    <input type="text" id="nombreUser" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Nombres</label>
                                    <input type="text" id="nombres" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Apellidos</label>
                                    <input type="text" id="apellidos" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Rut Usuario</label>
                                    <input type="number" id="rut" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>DV Usuario</label>
                                    <input type="number" id="dv" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Telefono</label>
                                    <input type="number" id="telefono" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Email</label>
                                    <input type="email" id="email" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Tipo de Usuario</label>
                                    <select class="form-control" required id="tipoUser">
                                     ${opt}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label>Contraseña</label>
                                    <input type="password" required id="password" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Confirmar contraseña</label>
                                    <input type="password" required id="Cpassword" class="form-control" />
                                </div>

                                <div class="col-md-6">
                                    <label>Empresa asociada</label>
                                    <select class="form-control" required id="empresa">
                                     ${opt2}
                                    </select>
                                </div>
                            </div>
                        `,
                        animation: false,
                        width: 1000,
                        showCancelButton: true,
                        confirmButtonText: 'Solicitar',
                        cancelButtonText: 'Cancelar',
                        preConfirm: function (value) {

                            return new Promise((resolve, reject) => {
                                resolve({
                                    user: $('#nombreUser').val(),
                                    nombre: $('#nombres').val(),
                                    apellido: $('#apellidos').val(),
                                    rut: $('#rut').val(),
                                    dv: $('#dv').val(),
                                    telefono: $('#telefono').val(),
                                    email: $('#email').val(),
                                    tipo: $('#tipoUser').val(),
                                    empresa: $('#empresa').val(),
                                    password: $('#password').val(),
                                    Cpassword: $('#Cpassword').val()
                                });
                            });
                        },
                    }).then(function (result) {
                        if (result.dismiss == 'cancel') {
                            prueba1();
                        } else {
                            if (result.value.user == '' || result.value.nombre == '' || result.value.apellido == '' || result.value.rut == '' || result.value.dv == '' || result.value.telefono == '' || result.value.email == '' || result.value.tipo == null || result.value.password == '' || result.value.Cpassword == '') {
                                Swal.fire({
                                    type: 'error',
                                    text: 'Todos los campos son requierdos',
                                    title: 'Error'
                                }).then(function (result) {
                                    if (result.value) {
                                        prueba();
                                    }
                                });
                            } else {
                                if (result.value.password != result.value.Cpassword) {
                                    Swal.fire({
                                        type: 'warning',
                                        text: 'Las contraseñas no coinciden',
                                        title: 'Error'
                                    }).then(function (result) {
                                        if (result.value) {
                                            prueba();
                                        }
                                    });

                                } else {
                                    var userData = {
                                        'user': result.value.user,
                                        'nombre': result.value.nombre,
                                        'apellido': result.value.apellido,
                                        'rut': result.value.rut,
                                        'dv': result.value.dv,
                                        'telefono': result.value.telefono,
                                        'email': result.value.email,
                                        'tipo': result.value.tipo,
                                        'empresa': result.value.empresa,
                                        'password': result.value.password
                                    }
                                    $.ajax({
                                        type: "POST",
                                        url: "/API/agregar/user",
                                        data: userData,
                                        success: function (response) {
                                            Swal.fire({
                                                type: 'success',
                                                text: 'El usuario se registro con exito',
                                                title: 'Usuario agregado'
                                            }).then(function (result) {
                                                if (result.value) {
                                                    prueba1();
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        }


                    });
                }
            });
        }

        //////////////////////////////////////AJAX DE INFORMACION DE SOLICITUD DE PLANES////////////////////////////////////

        $('#plan_sweet').click(function (e) {
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: "/API/planes",
                dataType: "json",
                success: function (response) {
                    var data = [];
                    response.planes.forEach(element => {
                        data[element.id_con] = element.nombre_plan
                    });
                    swal.fire({
                        title: 'Solicitar cambio de plan',
                        text: 'Seleccione un plan',
                        input: 'select',
                        inputOptions: data,
                        inputValue: response.seleccion,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Solicitar'
                    }).then(function (result) {
                        if (result.value) {
                            var dat = {
                                'id_con': result.value
                            }
                            $.ajax({
                                type: "POST",
                                url: "/API/solicitudPlanes",
                                data: dat,
                                dataType: "json",
                                success: function (response) {
                                    swal.fire(
                                        'Solicitud enviada!',
                                        response.mensaje,
                                        'success'
                                    )
                                }
                            });

                        }
                    });

                }
            });
        });


        //////////////////////////AJAX DE LISTADO DE PUNTOS DE VENTAS///////////////////////////////
        function plan_ventas() {
            $.ajax({
                type: "POST",
                url: "/API/getPuntoVentaAdmin",
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    var datos = '';
                    response.forEach(element => {
                        datos = datos + `
                                <tr>
                                    <td> ${element.username_usu}</td>
                                    <td> ${element.nombre_pun}</td>
                                    <td> ${element.direccion_pun}</td>
                                    <td>${element.nombre_com}</td>
                                    <td>${element.nombre_ciu}</td>
                                    <td>${element.nombre_reg}</td>
                                </tr>
                        `;
                    });

                    swal.fire({
                        title: 'Puntos de Ventas',
                        html: `
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre Usuario a Asignar</th>
                                    <th>Nombre Punto de Venta</th>
                                    <th>Direccion Punto de Venta</th>
                                    <th>Comuna</th>
                                    <th>Ciudad</th>
                                    <th>Region</th>
                                    <th>Usuario</th>
                                    <th><button id="btnAgregarP" class="btn btn-brand">Solicitar</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${datos}
                            </tbody>
                        </table>
                        `,
                        animation: false,
                        width: 1000,


                    })
                    $('#btnAgregarP').click(function (e) {
                        e.preventDefault();
                        puntosVentasForm();

                    });
                }
            });

        }


        function puntosVentasForm() {
            $.ajax({
                type: "POST",
                url: "/API/getRegionCiudadComuna",
                dataType: "json",
                success: function (response) {
                    var opt = '<option Selected disabled>Seleccione una opcion</option>';
                    response.regiones.forEach(element => {
                        opt = opt +
                            `
                            <option value="${element.id_reg}">${element.nombre_reg}</option>
                        `;
                    });
                    var optCiu = '<option Selected disabled>Seleccione una opcion</option>';
                    response.ciudades.forEach(element => {
                        optCiu = optCiu +
                            `
                            <option value="${element.id_ciu}">${element.nombre_ciu}</option>
                        `;
                    });
                    var optCom = '<option Selected disabled>Seleccione una opcion</option>';
                    response.comunas.forEach(element => {
                        optCom = optCom +
                            `
                            <option value="${element.id_com}">${element.nombre_com}</option>
                        `;
                    });

                    var optUsu = '<option Selected disabled>Seleccione una opcion</option>';
                    response.usuarios.forEach(element => {
                        optUsu = optUsu +
                            `
                            <option value="${element.id_usu}">${element.username_usu}</option>
                        `;
                    });


                    swal.fire({
                        title: 'Solicitar Punto de Venta',
                        html: `
                            <div class="container row">
                                <div class="col-md-6">
                                    <label>Nombre Punto de Venta</label>
                                    <input type="text" id="nombreUser" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Direccion Punto de Venta</label>
                                    <input type="text" id="direccion" required class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label>Regiones</label>
                                    <select class="form-control" required id="region">
                                     ${opt}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label>Ciudades</label>
                                    <select class="form-control" required id="ciudad">
                                     ${optCiu}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label>Comunas</label>
                                    <select class="form-control" required id="comuna">
                                     ${optCom}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label>Usuario Trabajador</label>
                                    <select class="form-control" required id="user">
                                     ${optUsu}
                                    </select>
                                </div>
                            </div>
                        `,
                        animation: false,
                        width: 1000,
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Solicitar',
                        preConfirm: function (value) {
                            return new Promise((resolve, reject) => {
                                resolve({
                                    nombre: $('#nombreUser').val(),
                                    direccion: $('#direccion').val(),
                                    comuna: $('#comuna').val(),
                                    user: $('#user').val()

                                });
                            });
                        },
                    }).then(function (result) {
                        if (result.dismiss == 'cancel') {
                            plan_ventas();
                        } else {

                            if (result.value.nombre == '' || result.value.direccion == null || result.value.comuna == '' || result.value.user == '') {
                                Swal.fire({
                                    type: 'error',
                                    text: 'Todos los campos son requierdos',
                                    title: 'Error'
                                }).then(function (result) {
                                    if (result.value) {
                                        puntosVentasFormForm();
                                    }
                                });
                            } else {
                                var userData = {
                                    'nombre': result.value.nombre,
                                    'direccion': result.value.direccion,
                                    'comuna': result.value.comuna,
                                    'user': result.value.user
                                }
                                $.ajax({
                                    type: "POST",
                                    url: "/API/setPuntoVenta",
                                    data: userData,
                                    success: function (response) {
                                        Swal.fire({
                                            type: 'success',
                                            text: 'La solicitud de agregar un Punto de Venta ha sido ingresada exitosamente',
                                            title: 'Solicitud de Punto de Venta'
                                        }).then(function (result) {
                                            if (result.value) {
                                                plan_ventas();
                                            }
                                        });
                                    }
                                });
                            }

                        }


                    });
                    $("#region").change(function (e) {
                        e.preventDefault();

                        var dat = {
                            'id': $("#region").val()
                        }
                        $.ajax({
                            type: "POST",
                            url: "API/getCiudad",
                            data: dat,
                            dataType: "json",
                            success: function (response) {
                                var optC = '<option>Seleccione una ciudad</option>'
                                response.forEach(element => {
                                    optC = optC + `
                                    
                                        <option value="${element.id_ciu}">${element.nombre_ciu}</option>
                                    `;
                                });
                                $("#ciudad").empty().append(optC);
                            }
                        });
                    });

                    $("#ciudad").change(function (e) {
                        e.preventDefault();

                        var dat = {
                            'id': $("#ciudad").val()
                        }
                        $.ajax({
                            type: "POST",
                            url: "API/getComuna",
                            data: dat,
                            dataType: "json",
                            success: function (response) {
                                var optC = '<option>Seleccione una comuna</option>'
                                response.forEach(element => {
                                    optC = optC + `
                                        <option value="${element.id_com}">${element.nombre_com}</option>
                                    `;
                                });
                                $("#comuna").empty().append(optC);
                            }
                        });
                    });
                }
            });
        }


        $('#kt_sweetalert_demo_9').click(function (e) {
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    // result.dismiss can be 'cancel', 'overlay',
                    // 'close', and 'timer'
                } else if (result.dismiss === 'cancel') {
                    swal.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                    )
                }
            });
        });

        $('#kt_sweetalert_demo_10').click(function (e) {
            swal.fire({
                title: 'Sweet!',
                text: 'Modal with a custom image.',
                imageUrl: 'https://unsplash.it/400/200',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                animation: false
            });
        });

        $('#kt_sweetalert_demo_11').click(function (e) {
            swal.fire({
                title: 'Espere mientras procesamos sus datos!',
                text: 'Esto puede tardar un tiempo por la cantidad de datos...',
                timer: 5000,
                onOpen: function () {
                    swal.showLoading()
                }
            }).then(function (result) {
                if (result.dismiss === 'timer') {
                    console.log('I was closed by the timer')
                }
            })
        });
    };

    return {
        // Init
        init: function () {
            initDemos();
        },
    };
}();

// Class Initialization
jQuery(document).ready(function () {
    KTSweetAlert2Demo.init();
});
