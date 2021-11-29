const formulario = document.getElementById('formularioUser');
const inputs = document.querySelectorAll('#formularioUser input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const validarCampos = (e) =>{
    switch (e.target.name) {
        case "numeroIdentificacion":
            if (expresiones.telefono.test(e.target.value)) {
                document.getElementById('numeroIdentificacion').classList.remove('is-invalid')
                document.getElementById('numeroIdentificacion').classList.add('is-valid')
            }
            else{
                document.getElementById('numeroIdentificacion').classList.add('is-invalid')
            }
            break;
        case "nombres":
            if (expresiones.nombre.test(e.target.value)) {
                document.getElementById('nombres').classList.remove('is-invalid')
                document.getElementById('nombres').classList.add('is-valid')
            }
            else{
                document.getElementById('nombres').classList.add('is-invalid')
            }
            break;
        case "direccion":
            if (expresiones.nombre.test(e.target.value)) {
                document.getElementById('direccion').classList.remove('is-invalid')
                document.getElementById('direccion').classList.add('is-valid')
            }
            else{
                document.getElementById('direccion').classList.add('is-invalid')
            }
            break;
        case "numeroCelular":
            
            break;
        case "email":
            
            break;
        case "password":
            
            break;
        case "zonaAsignada":
            
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

});