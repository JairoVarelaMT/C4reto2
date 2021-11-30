function listarCliente(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            listarRespuestaCliente(respuesta);
        }
    });
}

function listarRespuestaCliente(respuesta){

    var myTable=`<table class="table-secondary" border="1">
                <tr>
                <th>Email</th>
                <th>Contraseña</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th colspan="2" align="center">Acciones</th>
                </tr>`;
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button class='btn btn-warning' onclick='editarCliente("+respuesta[i].idClient+")'>Editar</button>";
        myTable+="<td> <button class='btn btn-danger' onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#listado").html(myTable);
}