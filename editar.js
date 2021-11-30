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

