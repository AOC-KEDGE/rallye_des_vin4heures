// === CODE DE VALIDATION POUR LE CHÂTEAU ===
const codeChateau3 = "CODE3"; // mettre le code réel que tu mettras dans le QR code

const btnValider = document.getElementById("valider-code");
const inputCode = document.getElementById("code-chateau");
const message = document.getElementById("message-code");
const contenuChateau = document.getElementById("contenu-chateau");

// Vérifie si le participant a déjà validé le code
if (localStorage.getItem("chateau3_access") === "true") {
    document.getElementById("validation-code").style.display = "none";
    contenuChateau.style.display = "block";
}

btnValider.addEventListener("click", () => {
    const codeEntre = inputCode.value.trim();
    if (codeEntre === codeChateau3) {
        localStorage.setItem("chateau3_access", "true");
        message.innerText = "Code correct ! Vous pouvez visiter le château.";
        document.getElementById("validation-code").style.display = "none";
        contenuChateau.style.display = "block";
    } else {
        message.innerText = "Code incorrect. Essayez à nouveau.";
    }
});

// === BOUTON ACCÉDER AU QCM ===
const btnQCM = document.getElementById("btn-qcm");
btnQCM.addEventListener("click", () => {
    window.location.href = "qcm3.html";
});
