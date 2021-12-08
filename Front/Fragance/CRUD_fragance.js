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
            Swal.fire({
                icon: 'success',
                title: 'La fragance se a agregado correctamente a la base de datos.',
                showConfirmButton: false,
                timer: 1500
              })
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
        }
        });
}
//Metodo (DELETE) borrar una fragance

//--------------------------------------


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
        var referencia = respuesta[i].reference;
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
        myTable+=' <td> <button class="btn btn-warning" onClick="editarFragance(\'' + respuesta[i].reference + '\')" /><i class="bi bi-pencil-square"></i></button>'
        myTable+=' <td> <button class="btn btn-danger" onClick="deleteFragance(\'' + respuesta[i].reference + '\')" /><i class="bi bi-x-octagon-fill"></i></button>'

        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#tablaFragance").html(myTable);

    
}
//---------------------------------------
function deleteFragance(reference){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://132.226.255.90:8080/api/fragance/"+reference,
                type:"DELETE",
                contentType:"application/JSON",
                datatype:"JSON",
                success:function(){
                    formularioFragance.reset();
                    AllFragance();
                }
            }); 
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
   
}
// Metodo editar (put) una Fragance
function editarFragance(reference){
    $("#btnActualizar").show();
    $("#btnGuardar").hide();
    $("#btnListar").hide();

    $.ajax({
        url:"http://132.226.255.90:8080/api/fragance/"+reference,
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
                $("#quantity").val(respuesta.quantity)
                 
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

    if ($("#availability").val() == "true") {
        availability = true;
    }
    else
        availability = false;
        if ($("#photography").val() != "") {
            var datos = {
                reference: $("#reference").val(),//referencia para actualizar el producto.
                brand: $("#brand").val(),
                category: $("#category").val(),
                presentation: $("#presentation").val(),
                description: $("#description").val(),
                availability: availability,
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
                    Swal.fire({
                        icon: 'success',
                        title: 'La fragance a sido actualizada.',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    
                },
                error:function(xhr,status){
                    console.log(status);
                },
            });
        }
        else
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos deben estar llenos'
          })
} 