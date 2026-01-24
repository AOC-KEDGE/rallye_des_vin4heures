const btnValiderQCM = document.getElementById("valider-qcm");
const formQCM = document.getElementById("form-qcm1");
const resultat = document.getElementById("resultat");

// Empêche de refaire le QCM
if (localStorage.getItem("chateau1_score")) {
    resultat.innerText = "Votre score : " + localStorage.getItem("chateau1_score") + " / 2";
    btnValiderQCM.disabled = true;
}

btnValiderQCM.addEventListener("click", () => {
    if (localStorage.getItem("chateau1_score")) return;

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

    localStorage.setItem("chateau1_score", score);
    alert("Votre score : " + score + " / 2\nVous allez être redirigé vers la page d'accueil.");
    window.location.href = "index.html";
});

// === RESET POUR TESTS (à enlever pour la version finale si tu veux) ===
const resetBtn = document.getElementById("reset-test");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("chateau1_score"); // enlève le blocage
    document.getElementById("resultat").innerText = "";
    document.getElementById("valider-qcm").disabled = false;
    alert("Reset OK : tu peux refaire le QCM 1.");
  });
}
