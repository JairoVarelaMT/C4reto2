function agregarCliente(){
    var datos = {
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val(),
    };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(datos),
        
        url:"http://localhost:8080/api/Client/save",
       
        
        success:function(respuesta) {
            $("#email").val("");
            $("#password").val("");
            $("#name").val("");
            $("#age").val("");
            console.log(respuesta);
            console.log("Se guardo correctamente");
            alert("Cliente guardado con exito");
            listarCliente();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}