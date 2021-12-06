$(document).ready(function(){
    $("#btnActualizar").hide();
    AllFragance();
});

const btnActualizar = document.getElementById('btnActualizar');
btnActualizar.addEventListener('onclick',() =>{
    actualizarFragance();
});
//mostrar todas las fragance
function AllFragance(){
    $.ajax({
        url:"http://132.226.255.90:8080/api/fragance/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            listarFrangance(respuesta);
        }
    });
}
//METODO AGREGAR (post) UNA FRAGANCE
function agregarCliente(){
    var availability
    if ($("#availability").val() == "true") {
        availability = true;
    }
    else
        availability = false;
    var datos = {
        reference: $("#reference").val(),
        brand: $("#brand").val(),
        category: $("#category").val(),
        presentation: $("#presentation").val(),
        description: $("#description").val(),
        availability: availability,
        price: parseFloat($("#price").val()) ,
        quantity: parseInt($("#quantity").val()),
        photography: $("#photography").val()
    };
        $.ajax({
        url:"http://132.226.255.90:8080/api/fragance/new",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos),

        success:function(rest) {
            AllFragance();
            alert("Usuario guardado con exito.");
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente.");
        }
        });
}
//Metodo mostrar todas las fragancias desde js a DOM
function listarFrangance(respuesta){
    
    var myTable=`<table class=" table table-info table-striped" border="2">
                <tr>
                <th>reference</th>
                <th>brand</th>
                <th>category</th>
                <th>presentation</th>
                <th>description</th>
                <th>availability</th>
                <th>price</th>
                <th>quantity</th>
                <th>photography</th>
                <th colspan="2" align="center">Acciones</th>
                </tr>`;
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].reference+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
        myTable+="<td>"+respuesta[i].presentation+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
        myTable+="<td>"+respuesta[i].photography+"</td>";
        myTable+="<td> <button class='btn btn-warning' onclick='editarFragance("+respuesta[i].reference+")'>Editar</button>";
        myTable+="<td> <button class='btn btn-danger' onclick='borrarFragance("+respuesta[i].reference+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#tablaFragance").html(myTable);
}
//---------------------------------------
//Metodo (DELETE) borrar una fragance
function borrarFragance(reference){
    console.log('Entro a borrar.')
    console.log(reference)
    let datos={
        id:reference
    };
    let dataToSend=JSON.stringify(datos);
    $.ajax({

        url: "http://132.226.255.90:8080/api/fragance/"+reference,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            AllFragance();
            alert("Fragance borrada con exito.")
        }
    });
}
//--------------------------------------
// Metodo editar (put) una Fragance
function editarFragance(reference){
    $("#btnActualizar").show();
    $("#btnActualizar").hide();
    $("#btnListar").hide();

    $.ajax({
        url:"http://132.226.255.90:8080/api/fragance"+reference,
        type: 'GET',
        dataType: "json",

        success:function(respuesta){
            console.log(respuesta);
                $("#reference").val(respuesta.reference),
                $("#brand").val(respuesta.brand)
                $("#category").val(respuesta.category),
                $("#presentation").val(respuesta.presentation),
                $("#description").val(respuesta.description),
                $("#price").val(respuesta.price),
                $("#quantity").val(respuesta.quantity),
                $("#photography").val(respuesta.photography)     
        },
        error:function(xhr,status){
            console.log(status);
        },
    });
}
//Metodo (UPDATE) para Fragance
function actualizarFragance(){
    $("#btnGuardar").show();
    $("#btnListar").show();
    $("#btnActualizar").hide();
    var datos = {
        reference: $("#reference").val(),//referencia para actualizar el producto.
        brand: $("#brand").val(),
        category: $("#category").val(),
        presentation: $("#presentation").val(),
        description: $("#description").val(),
        availability: $("#availability").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val()
    };
    let dataToSend=JSON.stringify(datos);
    $.ajax({
        url:"http://132.226.255.90:8080/api/fragance/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",

        success:function(respuesta){
            formularioFragance.reset();
            AllFragance();
            alert("Fragance actualizado con exito.");
        },
        error:function(xhr,status){
            console.log(status);
        },
    });
} 