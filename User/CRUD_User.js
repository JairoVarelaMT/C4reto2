$(document).ready(function(){
    $("#btnActualizar").hide();
    GetAllUsers();
    formulario.reset();
    
});
const btnActualizar = document.getElementById('btnActualizar');
btnActualizar.addEventListener('onclick',() =>{
    actualizarCliente();
});
//METODO AGREGAR (post) UN USUARIO
function agregarUser(){
    console.log('Entro al metodo agregar cliente');
    var datos = {
        id: parseInt($("#numeroIdentificacion").val()),
        identification:$("#numeroIdentificacion").val(),
        name:$("#nombres").val(),
        address:$("#direccion").val(),
        cellPhone:$("#numeroCelular").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        zone:$('#zone').val(),
        type:$('#type').val()
        //
    };
        console.log(datos);   
        $.ajax({
        url:"http://132.226.255.90:8080/api/user/new",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos),
        success:function(rest) {
            alert("Usuario guardado con exito");
            formulario.reset();
            GetAllUsers();
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");

        }
        });
}
//mostrar (GET) todo los usuarios en la BD
function GetAllUsers(){
    
    $.ajax({

        url:"http://132.226.255.90:8080/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            listarUsuarios(respuesta);
        }
    });
}
function listarUsuarios(respuesta){
    
    var myTable=`<table class=" table table-secondary" border="2">
                <tr>
                <th>NumeroIdentidad</th>
                <th>Nombres</th>
                <th>Direccion</th>
                <th>NumeroCelular</th>
                <th>Email</th>
                <th>Password</th>
                <th>Zona</th>
                <th>Tipo usuario</th>
                <th colspan="2" align="center">Acciones</th>
                </tr>`;
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].identification+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].address+"</td>";
        myTable+="<td>"+respuesta[i].cellPhone+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].zone+"</td>";
        myTable+="<td>"+respuesta[i].type+"</td>";
        myTable+="<td> <button class='btn btn-warning' onclick='editarUsuario("+respuesta[i].id+")'>Editar</button>";
        myTable+="<td> <button class='btn btn-danger' onclick='borrarUsuario("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#tablaUsuarios").html(myTable);
}
// metodo eliminar (DELETE)
function borrarUsuario(id){
    let datos={
        id:id
    };
    let dataToSend=JSON.stringify(datos);
    console.log(id);
    $.ajax({
        
        url: "http://132.226.255.90:8080/api/user/"+id,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            formulario.reset();
            GetAllUsers();
            alert("Cliente borrado con exito.")
        }
    });
} 
// Metodo editar (put) un usuario


function editarUsuario(id){
    $("#btnActualizar").show();
    $("#btnActualizar").hide();
    $("#btnListar").hide();

    $.ajax({
        url:"http://132.226.255.90:8080/api/user/"+id,
        type: 'GET',
        dataType: "json",

        success:function(respuesta){
            console.log(respuesta);
                $("#numeroIdentificacion").val(respuesta.identification),
                $("#nombres").val(respuesta.name)
                $("#direccion").val(respuesta.address),
                $("#numeroCelular").val(respuesta.cellPhone),
                $("#email").val(respuesta.email),
                $("#password").val(respuesta.password),
                $("#zonaAsignada").val(respuesta.zone)
                
        },
        error:function(xhr,status){
            console.log(status);
        },
    });
}
//Metodo (UPDATE) para usuario
function actualizarCliente(){
    $("#btnGuardar").show();
    $("#btnListar").show();
    $("#btnActualizar").hide();
    var datos = {
        identification:$("#numeroIdentidad").val(),
        name:$("#nombres").val(),
        address:$("#direccion").val(),
        cellPhone:$("#numeroCelular").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        zone:$('#zone').val(),
        type:$('#type').val()
    };
    
    let dataToSend=JSON.stringify(datos);
    $.ajax({
        url:"http://132.226.255.90:8080/api/user/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",

        success:function(respuesta){
            formulario.reset();
            GetAllUsers();
            alert("Cliente actualizado con exito");
        },

        error:function(xhr,status){
            console.log(status);
        },
    });
}
//Borrar el valor de todos los campos del formulario despues de actualizar.
