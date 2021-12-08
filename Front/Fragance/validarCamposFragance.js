const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{2,50}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{1,14}$/ // 7 a 14 numeros
}
var valor_campos = {
    reference: $("#reference").val(),
    brand: $("#brand").val(),
    category: $("#category").val(),
    presentation: $("#presentation").val(),
    description: $("#description").val(),
    availability: $("#availability").val(),
    price: $("#price").val(),
    quantity: $("#quantity").val(),
    photography: $("#photography").val()
}
var campos = {
    reference: false,
    brand: false,
    category: false,
    presentation: false,
    description:false,
    price: false,
    quantity: false,
}
const formularioFragance = document.getElementById('formularioFragance');

const inputs = document.querySelectorAll('#formularioFragance input');

function validarInputs(expresion, name, id_input ){
   
    if (expresion.test(name)) {
        document.getElementById(id_input).classList.remove('is-invalid')
        document.getElementById(id_input).classList.add('is-valid')
        campos[id_input] = true;
    }
    else{
        document.getElementById(id_input).classList.add('is-invalid')
        campos[id_input] = false;
    }
}
const validarCamposFragance = (e) =>{
    switch (e.target.name) {
        case "reference":
            validarInputs(expresiones.password, e.target.value, 'reference');
            break;
        case "brand":
            validarInputs(expresiones.password, e.target.value,'brand');
            break;
        case "category":
            validarInputs(expresiones.nombre, e.target.value,'category');
            break;
        case "presentation":
            validarInputs(expresiones.password, e.target.value,'presentation');
            break;
        case "description":
            validarInputs(expresiones.password, e.target.value,'description');
            break;
        case "price":
            validarInputs(expresiones.telefono, e.target.value,'price');
            break;
        case "quantity":
            validarInputs(expresiones.telefono, e.target.value,'quantity');
        default:
            break;
    }
}
inputs.forEach((inputs)=>{
    inputs.addEventListener('keyup',validarCamposFragance);
    inputs.addEventListener('blur',validarCamposFragance);
});
formularioFragance.addEventListener('submit', (e) =>{
   e.preventDefault();
    if (campos.reference && campos.brand && campos.category  && campos.presentation  && campos.description  && campos.price  && campos.quantity && $("#photography").val() != "") {   
        agregarCliente();
        formularioFragance.reset();
    }
    else
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos deben estar llenos'
      })   
});



    