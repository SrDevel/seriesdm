export const textValidation = (text) => {
    if (!text) {
        console.error("No se ha ingresado ningún texto");
        return null;
    }
    if (typeof text !== "string") {
        console.error("El texto ingresado no es válido");
        return null;
    }
    return text;
}

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!password) {
        console.error("No se ha ingresado ninguna contraseña");
        return null;
    }
    if (typeof password !== "string") {
        console.error("La contraseña ingresada no es válida");
        return null;
    }
    if (password.length < 6) {
        console.error("La contraseña debe tener al menos 6 caracteres");
        return null;
    }

    if (!passwordRegex.test(password)) {
        console.error("La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número");
        return null;
    }

    return password;
}

export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
        console.error("No se ha ingresado ningún correo electrónico");
        return null;
    }
    if (typeof email !== "string") {
        console.error("El correo electrónico ingresado no es válido");
        return null;
    }
    if (!emailRegex.test(email)) {
        console.error("El correo electrónico ingresado no es válido");
        return null;
    }
    return email;
}

export const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    if (!name) {
        console.error("No se ha ingresado ningún nombre");
        return null;
    }
    if (typeof name !== "string") {
        console.error("El nombre ingresado no es válido");
        return null;
    }
    if (!nameRegex.test(name)) {
        console.error("El nombre ingresado no es válido");
        return null;
    }
    return name;
}

export const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) {
        console.error("No se ha ingresado ningún número de teléfono");
        return null;
    }
    if (typeof phone !== "string") {
        console.error("El número de teléfono ingresado no es válido");
        return null;
    }
    if (!phoneRegex.test(phone)) {
        console.error("El número de teléfono ingresado no es válido");
        return null;
    }
    return phone;
}

export const isValidDate = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date) {
        console.error("No se ha ingresado ninguna fecha");
        return null;
    }
    if (typeof date !== "string") {
        console.error("La fecha ingresada no es válida");
        return null;
    }
    if (!dateRegex.test(date)) {
        console.error("La fecha ingresada no es válida");
        return null;
    }
    return date;
}