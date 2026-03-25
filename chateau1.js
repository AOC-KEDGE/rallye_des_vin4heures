const CHATEAU_ID = "chateau1"; // 👉 changer juste ça pour chaque page

const btnCode = document.getElementById("btn-code");
const input = document.getElementById("code");
const message = document.getElementById("message");
const qcm = document.getElementById("qcm");
const btnValider = document.getElementById("valider");

// Heure arrivée (scan QR)
const heureArrivee = new Date().toLocaleTimeString("fr-FR");

// Vérifie si déjà fait
if (localStorage.getItem(CHATEAU_ID + "_score")) {
  message.innerText = "Vous avez déjà répondu.";
  btnCode.disabled = true;
}

// Validation code équipe
btnCode.addEventListener("click", () => {
  const codeEntre = input.value.trim();

  const equipeTrouvee = Object.keys(codesEquipes).find(
    (nom) => codesEquipes[nom] === codeEntre
  );

  if (equipeTrouvee) {
    localStorage.setItem("equipe_nom", equipeTrouvee);

    // Log arrivée
    logEvent({
      chateau: CHATEAU_ID,
      event: "arrivee_scan_qr",
      extra: { heure_arrivee: heureArrivee },
    });

    message.innerText = "Bienvenue " + equipeTrouvee;
    qcm.style.display = "block";
  } else {
    message.innerText = "Code incorrect";
  }
});

// Validation QCM
btnValider.addEventListener("click", () => {
  if (localStorage.getItem(CHATEAU_ID + "_score")) return;

  let score = 0;

  const reponses = {
    q1: "B",
    q2: "B",
    q3: "B",
  };

  for (let q in reponses) {
    const radios = document.getElementsByName(q);
    for (let r of radios) {
      if (r.checked && r.value === reponses[q]) {
        score++;
      }
    }
  }

  localStorage.setItem(CHATEAU_ID + "_score", score);

  logEvent({
    chateau: CHATEAU_ID,
    event: "qcm_valide",
    score,
  });

  alert("Score : " + score + "/3");

  window.location.href = "index.html";
});
