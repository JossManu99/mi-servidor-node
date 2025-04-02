const validator = require("validator");

const validate = (params) => {
    // Validar el campo 'name' (permitir varios nombres separados por espacios)
    let name = !validator.isEmpty(params.name) &&
        validator.isLength(params.name, { min: 3, max: undefined }) &&
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(params.name);  // Permitir espacios y caracteres especiales

    // Validar el campo 'nick'
    let nick = !validator.isEmpty(params.nick) &&
        validator.isLength(params.nick, { min: 2, max: 60 });

    // Validar el campo 'email'
    let email = !validator.isEmpty(params.email) &&
        validator.isEmail(params.email);

    // Validar el campo 'password'
    let password = !validator.isEmpty(params.password);

    // Validar el campo 'surname' (permitir varios apellidos separados por espacio)
    if (params.surname) {
        let surname = !validator.isEmpty(params.surname) &&
            validator.isLength(params.surname, { min: 3, max: undefined }) &&
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(params.surname);  // Permitir espacios y caracteres especiales

        if (!surname) {
            throw new Error("No se ha superado la validación por apellido incorrecto");
        } else {
            console.log("Validación superada en el apellido");
        }
    }

    // Comprobar si todos los campos requeridos son válidos
    if (!name || !nick || !email || !password) {
        throw new Error("No se ha superado la validación");
    } else {
        console.log("Validación superada");
    }

    return true; // La validación fue exitosa
};

module.exports = validate;
