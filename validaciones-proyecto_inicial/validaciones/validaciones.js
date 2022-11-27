export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classlist.remove("input-container--invalid");
        input.parentElement.querySelector("input-message-error").innerHTML = ""
    } else {
        input.parentElement.classlist.add("input-container--invalid");
        input.parentElement.querySelector("input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}
const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMisMatch",
    "customError",
]
const mensajeDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "Este campo de correo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo de contracena no puede estar vacio",
        patternMisMatch: "almenos 6 caracteres maximo 12, debe contener una letra minuscula, una mayuscula, un numero y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "La fecha no puede estar en blanco",
        customError: "Debes de tener almenos 18 anios de edad"
    },
    phoneNumber: {
        valueMissing: "El campo de telefono no puede estar vacio",
        patternMisMatch: "El formato de de este campo es XXXXXXXXXX, 10 numeros",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMisMatch: "La direccion debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMisMatch: "La ciudad debe contener entre 10 a 40 caracteres",
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMisMatch: "La estado debe contener entre 10 a 40 caracteres",
    },
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoErrores.forEach((error) => {
        if(input.validity[error]){
            mensaje =mensajeDeError[tipoDeInput][error]
        }
    });
    return mensaje
}
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function validarNacimiento(input) {
    const fechaCliente = new date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 para completar este form!"
    };
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTFFullYear(),
    fecha.getUTFFullMonth(),
    fecha.getUTFFullDate()
    );
    return diferenciaFechas <= fechaActual;
}