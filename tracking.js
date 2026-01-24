const SHEET_ENDPOINT = "COLLE_ICI_TON_URL_EXEC";

function getEquipe() {
  return localStorage.getItem("equipe_nom") || "inconnue";
}

function logEvent({ chateau, event, score = "", extra = {} }) {
  const payload = {
    equipe: getEquipe(),
    timestamp: new Date().toISOString(),
    chateau,
    event,
    score,
    extra
  };

  const blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
  navigator.sendBeacon(SHEET_ENDPOINT, blob);
}
