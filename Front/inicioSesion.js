////////////        FUNCION PARA VALIDAR CAMPOS VACIOS       /////////////////////
function validarCamposVacios() {
    if ($("#user").val().length == 0 || $("#password").val().length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos deben estar llenos.'
          })   
        return false;
    } else {
        return true;
    }
}

////////////        FUNCION PARA USUARIO EMAIL VALIDO    /////////////////////
function validarCorreo() {
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido = expReg.test($("#user").val());
    console.log(esValido);
    if (esValido==true) {
        return true;
    } else {
        Swal.fire({//animacion de error
            icon: 'error',
            title: 'Oops...',
            text: 'El correo no tiene un formato valido.'
          })   
        return false;
    }
}

////////////        FUNCION PARA INICIAR SESION DESPUES DE VALIDACIONES    /////////////////////
function iniciarSesion() {
    if (validarCamposVacios()) {
        if(validarCorreo()){
            validarCredenciales();
        }
    }
}

////////////        FUNCION PARA VALIDAR CREDENCIALES       /////////////////////
function validarCredenciales() {
    console.log("Valida credenciales");
    let email = $("#user").val();
    let password = $("#password").val();
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://132.226.255.90:8080/api/user/"+email+"/"+password,
        
        //url:"http://155.248.195.219:8080/api/user" + email + "/" + password,

        success: function (respuesta) {
            console.log(respuesta);
            if (respuesta.id == null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El usuario no existe.'
                  }) 
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido'+respuesta.name,
                    showConfirmButton: false,
                    timer: 1500
                  })
                //alert("Bienvenido " + respuesta.name)
                document.location.href="/Front/menu.html";
            }
        }
    });

}
