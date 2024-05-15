
//menu hamburguesa
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () =>{
    nav.classList.add("visible");
})
cerrar.addEventListener("click", () =>{
    nav.classList.remove("visible");
})
//aca termina menu hamgurguesa

//captcha

function generarPreguntaCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    document.getElementById('captcha-question').textContent = `${num1} + ${num2} = ?`;
    document.getElementById('num1').value = num1;
    document.getElementById('num2').value = num2;
}

function verificarCaptcha(event) {
    event.preventDefault(); // Evitar el envío del formulario
    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);
    const respuestaCaptcha = parseInt(document.getElementById('captcha').value);

    if (respuestaCaptcha === num1 + num2) {
        document.querySelector('#msjecaptcha').innerHTML ="Pedido realizado con exito. El delivery pronto estara en su puerta"
    } else {
        document.querySelector('#msjecaptcha').innerHTML = "aptcha incorrecto. Vuelva a intentarlo"
    }
}

window.onload = function() {
    generarPreguntaCaptcha();
    document.getElementById('botonform').addEventListener('click', verificarCaptcha);
};