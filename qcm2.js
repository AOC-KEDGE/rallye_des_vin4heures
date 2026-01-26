const btnValiderQCM = document.getElementById("valider-qcm");
const formQCM = document.getElementById("form-qcm2");
const resultat = document.getElementById("resultat");

// Empêche de refaire le QCM
if (localStorage.getItem("chateau2_score")) {
  resultat.innerText = "Votre score : " + localStorage.getItem("chateau2_score") + " / 3";
  btnValiderQCM.disabled = true;
}

btnValiderQCM.addEventListener("click", () => {
  if (localStorage.getItem("chateau2_score")) return;

  let score = 0;
  const reponsesCorrectes = { q1: "B", q2: "C", q3: "A" };

  for (let question in reponsesCorrectes) {
    const radios = formQCM.elements[question];
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked && radios[i].value === reponsesCorrectes[question]) {
        score++;
      }
    }
  }

  localStorage.setItem("chateau2_score", score);

  // Log score vers Google Sheet
  logEvent({ chateau: "chateau2", event: "qcm_valide", score });

  alert("Votre score : " + score + " / 3\nRetour à l'accueil.");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 300);
});

// Reset pour tests
const resetBtn = document.getElementById("reset-test");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("chateau2_score");
    resultat.innerText = "";
    btnValiderQCM.disabled = false;
    alert("Reset OK : tu peux refaire le QCM 2.");
  });
}
