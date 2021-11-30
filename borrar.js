function borrarCliente(numId){
    let datos={
        idClient:numId
    };
    let dataToSend=JSON.stringify(datos);
    $.ajax({
        url:"http://localhost:8080/api/Client/"+numId,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            listarCliente();
            alert("Cliente borrado con exito")
        }
    });
}