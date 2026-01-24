const SHEET_ENDPOINT = "Chttps://script.google.com/macros/s/AKfycbwgbGsRnDZsWNAf609JURw4Qz9IFGX0CZ9Noz6XOVZpPCp9YJtopjsx7a-3OGQ5djWK/exec";

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
