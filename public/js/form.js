let btnEnviar = document.getElementById("enviar");
const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form");
let error = document.getElementById("warning");
let nombreError = document.getElementById("nombreError");
let emailError = document.getElementById("emailError");
let telefonoError = document.getElementById("telefonoError");

const expresionesRegulares = {
  nombre: /^([a-zA-Z]{1}[a-zñáéíóú]+[\s]*)+$/,
  email: /^[\w]+@{1}[\w]+\.+[a-z]{2,3}$/,
  telefono: /^\d{9,11}$/,
};
const campos = {
  nombre: false,
  email: false,
  telefono: false,
};
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(
        expresionesRegulares.nombre,
        e.target,
        "nombre",
        "nombreError"
      );
      break;
    case "email":
      validarCampo(expresionesRegulares.email, e.target, "email", "emailError");
      break;
    case "telefono":
      validarCampo(
        expresionesRegulares.telefono,
        e.target,
        "telefono",
        "telefonoError"
      );

      break;
  }
};

const validarCampo = (expresionesRegulares, input, campo, error) => {
  if (expresionesRegulares.test(input.value)) {
    document.getElementById(`${campo}`).style.border = "none";
    document.getElementById(`${error}`).style.display = "none";
    campos[campo] = true;
  } else {
    document.getElementById(`${campo}`).style.border = "2px solid red";
    document.getElementById(`${error}`).style.display = "block";
    campos[campo] = false;
  }
};
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

(function () {
  // https://dashboard.emailjs.com/admin/account, aqui va el public key id
  emailjs.init("olC8JhWOMeJNQ0X1K");
})();
window.onload = function () {
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    // Este es un codigo que se genera en el formulario en el input oculto llamado contact_number
    this.contact_number.value = (Math.random() * 100000) | 0;
    // Aqui van los valores service_id y template_id
    emailjs.sendForm("service_432dhg6", "template_1prx8nm", this).then(
      function () {
        console.log("SUCCESS!");
        alert("El mensaje se envio correctamente");
        formulario.reset();
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Algo fallo, intenta nuevamente.");
      }
    );
  });
};
