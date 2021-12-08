////////////        FUNCION PARA VALIDAR CAMPOS VACIOS       /////////////////////
function validarCamposVacios() {
    if ($("#user").val().length == 0 || $("#password").val().length == 0) {
        alert("Todos los campos son obligatorios");
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
        alert("El correo no tiene un formato Valido");
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
        url: "http://localhost:8080/api/user/" + email + "/" + password,
        //url:"http://155.248.195.219:8080/api/user" + email + "/" + password,

        success: function (respuesta) {
            console.log(respuesta);
            if (respuesta.id == null) {
                    alert("No existe el usuario")
            } else {
                alert("Bienvenido " + respuesta.name)
            }
        }
    });

}
