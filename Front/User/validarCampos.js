const formulario = document.getElementById('formularioUser');
const inputs = document.querySelectorAll('#formularioUser input');

const expresiones = {
	usuario:/^.{8,25}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{1,14}$/ // 7 a 14 numeros
}
const campos = {
    numeroIdentidad: false,
    nombres: false,
    direccion: false,
    numeroCelular: false,
    email: false,
    password: false
}
const validarCampos = (e) =>{
    switch (e.target.name) {
        case "numeroIdentificacion":
            if (expresiones.telefono.test(e.target.value)) {
                document.getElementById('numeroIdentificacion').classList.remove('is-invalid')
                document.getElementById('numeroIdentificacion').classList.add('is-valid')
                document.getElementById('error_numeroIdentificacion').style.display='none';
                campos.numeroIdentidad = true;
            }
            else{
                document.getElementById('numeroIdentificacion').classList.add('is-invalid')
                document.getElementById('error_numeroIdentificacion').classList.add('error')
                document.getElementById('error_numeroIdentificacion').style.display='block';
                campos.numeroIdentidad = false;
            }
            break;
        case "nombres":
            if (expresiones.nombre.test(e.target.value)) {
                document.getElementById('nombres').classList.remove('is-invalid')
                document.getElementById('nombres').classList.add('is-valid')
                document.getElementById('error_nombres').style.display='none';
                campos.nombres = true;
            }
            else{
                document.getElementById('nombres').classList.add('is-invalid')
                document.getElementById('error_nombres').classList.add('error')
                document.getElementById('error_nombres').style.display='block';
                campos.nombres = false;
            }
            
            break;
        case "direccion":
            if (expresiones.usuario.test(e.target.value)) {
                document.getElementById('direccion').classList.remove('is-invalid')
                document.getElementById('direccion').classList.add('is-valid')
                
                campos.direccion = true;
            }
            else{
                document.getElementById('direccion').classList.add('is-invalid')
               
                document.getElementById('error_direccion').style.display='block';
                campos.direccion = false;
            }
            
            break;
        case "numeroCelular":
            if (expresiones.telefono.test(e.target.value)) {
                document.getElementById('numeroCelular').classList.remove('is-invalid')
                document.getElementById('numeroCelular').classList.add('is-valid')
                document.getElementById('error_numeroCelular').style.display='none';
                campos.numeroCelular = true;
            }
            else{
                document.getElementById('numeroCelular').classList.add('is-invalid')
                document.getElementById('error_numeroCelular').classList.add('error')
                document.getElementById('error_numeroCelular').style.display='block';
                campos.numeroCelular = false;
            }
            break;
        case "email":
            if (expresiones.correo.test(e.target.value)) {
                document.getElementById('email').classList.remove('is-invalid')
                document.getElementById('email').classList.add('is-valid')
                document.getElementById('error_email').style.display='none';
                campos.email = true;
            }
            else{
                document.getElementById('email').classList.add('is-invalid')
                document.getElementById('error_email').classList.add('error')
                document.getElementById('error_email').style.display='block';
                campos.email = false;
            }
            break;
        case "password":
            if (expresiones.password.test(e.target.value)) {
                document.getElementById('password').classList.remove('is-invalid')
                document.getElementById('password').classList.add('is-valid')
                document.getElementById('error_password').style.display='none';
                campos.password = true;
            }
            else{
                document.getElementById('password').classList.add('is-invalid')
                document.getElementById('error_password').classList.add('error')
                document.getElementById('error_password').style.display='block';
                campos.password = false;
            }
            break;    
        default:
            break;
    }
}

inputs.forEach((input)=>{
    input.addEventListener('keyup',validarCampos);
    input.addEventListener('blur',validarCampos);
});


formulario.addEventListener('submit', (e) => {
    
    e.preventDefault();
    if(campos.numeroIdentidad && campos.nombres && campos.direccion && campos.numeroCelular && campos.email && campos.password){
        agregarUser();
    }
    else
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos deben estar llenos.'
      })  
    
});