//METODO AGREGAR (post) UN USUARIO
function agregarCliente(){
    console.log('paso')
    var datos = {
        identification:$("#numeroIdentidad").val(),
        name:$("#nombres").val(),
        address:$("#direccion").val(),
        cellPhone:$("#numeroCelular").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        zone:$("#zonaAsignada").val(),
        type:$('select option:selected').val()
    };
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos),

        url:"",

        success:function(respuesta) {
           
            console.log(respuesta);
            console.log("Se guardo correctamente");
            alert("Cliente guardado con exito");
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
        }
        });
}
//mostrar (GET) todo los usuarios en la BD
function listarCliente(){
    $.ajax({

        url:"",

        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            listarUsuario(respuesta);
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
        myTable+="<td> <button class='btn btn-warning' onclick='editarCliente("+respuesta[i].id+")'>Editar</button>";
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
    $.ajax({

        url: "",

        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            listarUsuarios(respuesta);
            alert("Cliente borrado con exito")
        }
    });
} 
// Metodo editar (put) un usuario
$(document).ready(function(){
    $("#btnActualizar").hide();
})

function editarCliente(numId){
    $("#btnActualizar").show();
    $("#btnGuardar").hide();
    $("#btnListar").hide();
    var datos ={
        idClient:numId
    };

    $.ajax({
        url:"http://localhost:8080/api/Client/"+numId,
        type: 'GET',
        dataType: "json",

        success:function(respuesta){
            console.log(respuesta);
                $("#numId").val(respuesta.idClient),
                $("#email").val(respuesta.email),
                $("#password").val(respuesta.password)
                $("#name").val(respuesta.name),
                $("#age").val(respuesta.age)
        },
        error:function(xhr,status){
            console.log(status);
        },
    });
}

function actualizarCliente(){
    $("#btnGuardar").show();
    $("#btnListar").show();
    $("#btnActualizar").hide();
    let datos={
        idClient:$("#numId").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()

    };
    console.log(datos);
    let dataToSend=JSON.stringify(datos);
    $.ajax({
        url:"http://localhost:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",

        success:function(respuesta){
            $("#email").val("");
            $("#password").val("");
            $("#name").val("");
            $("#age").val("");
            console.log(respuesta)
            listarCliente();
            alert("Cliente actualizado con exito");
        },

        error:function(xhr,status){
            console.log(status);
        },
    });
}
