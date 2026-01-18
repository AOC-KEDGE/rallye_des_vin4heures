const btnValiderQCM = document.getElementById("valider-qcm");
const formQCM = document.getElementById("form-qcm2");
const resultat = document.getElementById("resultat");

// Empêche de refaire le QCM
if (localStorage.getItem("chateau2_score")) {
    resultat.innerText = "Votre score : " + localStorage.getItem("chateau2_score") + " / 2";
    btnValiderQCM.disabled = true;
}

btnValiderQCM.addEventListener("click", () => {
    if (localStorage.getItem("chateau2_score")) return;

    let score = 0;
    const reponsesCorrectes = { q1: "B", q2: "A" };

    for (let question in reponsesCorrectes) {
        const radios = formQCM.elements[question];
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked && radios[i].value === reponsesCorrectes[question]) {
                score++;
            }
        }
    }

    localStorage.setItem("chateau2_score", score);
    alert("Votre score : " + score + " / 2\nVous allez être redirigé vers la page d'accueil.");
    window.location.href = "index.html";
});