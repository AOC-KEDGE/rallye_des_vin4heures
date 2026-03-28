document.addEventListener("DOMContentLoaded", () => {

  const CHATEAU_ID = window.location.pathname.split("/").pop().replace(".html", "");

  const btnCode = document.getElementById("btn-code");
  const input = document.getElementById("code");
  const message = document.getElementById("message");
  const qcm = document.getElementById("qcm");
  const btnValider = document.getElementById("valider");

  const heureArrivee = new Date().toLocaleTimeString("fr-FR");

  // Déjà répondu
  if (localStorage.getItem(CHATEAU_ID + "_score")) {
    document.body.innerHTML = `
      <div class="card">
        <h2>Déjà répondu ✅</h2>
        <p>Votre équipe a déjà validé ce QCM.</p>
      </div>
    `;
    return;
  }

  // Code équipe
  btnCode.addEventListener("click", () => {
    const codeEntre = input.value.trim();

    const equipeTrouvee = Object.keys(codesEquipes).find(
      (nom) => codesEquipes[nom] === codeEntre
    );

    if (equipeTrouvee) {
      localStorage.setItem("equipe_nom", equipeTrouvee);

      logEvent({
        chateau: CHATEAU_ID,
        event: "arrivee_scan_qr",
        extra: { heure_arrivee: heureArrivee },
      });

      message.innerText = "Bienvenue " + equipeTrouvee;

      input.style.display = "none";
      btnCode.style.display = "none";

      qcm.style.display = "block";

    } else {
      message.innerText = "Code incorrect";
    }
  });

  // QCM
  btnValider.addEventListener("click", () => {
    let score = 0;

    const toutesLesReponses = {
  chateau1: { q1: "A", q2: "B", q3: "B", q4: "B", q5: "A", q6: "A" }, // 👈 à adapter
  chateau2: { q1: "A", q2: "C", q3: "A", q4: "C", q5: "B", q6: "A" }, // 👈 à adapter
  chateau3: { q1: "C", q2: "A", q3: "B", q4: "B", q5: "A", q6: "B" },
  chateau4: { q1: "A", q2: "A", q3: "C", q4: "B", q5: "B", q6: "C" },
  chateau5: { q1: "C", q2: "A", q3: "A", q4: "B", q5: "B", q6: "C" },
  chateau6: { q1: "A", q2: "B", q3: "C", q4: "B", q5: "B", q6: "B" },
  chateau7: { q1: "B", q2: "A", q3: "A", q4: "C", q5: "C", q6: "B" },
  chateau8: { q1: "B", q2: "A", q3: "A", q4: "B", q5: "A", q6: "B" },
  chateau9: { q1: "C", q2: "A", q3: "C", q4: "B", q5: "B", q6: "A" },
  chateau10: { q1: "C", q2: "C", q3: "C", q4: "A", q5: "B", q6: "A" },
  chateau11: { q1: "C", q2: "C", q3: "B", q4: "B", q5: "C", q6: "B" },
  chateau12: { q1: "C", q2: "A", q3: "C", q4: "C", q5: "B", q6: "A" },
  chateau13: { q1: "B", q2: "B", q3: "A", q4: "B", q5: "C", q6: "A" },
};


const reponses = toutesLesReponses[CHATEAU_ID];

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

    alert("Score : " + score + "/6");

    window.location.href = "index.html";
  });

});