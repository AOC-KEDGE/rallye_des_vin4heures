const codeChateau2 = "CODE2"; // code réel du château

const btnValider = document.getElementById("valider-code");
const inputCode = document.getElementById("code-chateau");
const message = document.getElementById("message-code");
const contenuChateau = document.getElementById("contenu-chateau");
const validationBloc = document.getElementById("validation-code");

// 🔒 AU CHARGEMENT : on force toujours la validation
validationBloc.style.display = "block";
contenuChateau.style.display = "none";

btnValider.addEventListener("click", () => {
    const codeEntre = inputCode.value.trim();

    if (codeEntre === codeChateau1) {
        message.innerText = "Code correct ! Vous pouvez visiter le château.";
        validationBloc.style.display = "none";
        contenuChateau.style.display = "block";
    } else {
        message.innerText = "Code incorrect. Essayez à nouveau.";
    }
});

// === BOUTON ACCÉDER AU QCM ===
const btnQCM = document.getElementById("btn-qcm");
btnQCM.addEventListener("click", () => {
    window.location.href = "qcm2.html";
});
