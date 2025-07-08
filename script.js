// Gestion des codes secrets
const secretCodes = {
  "VAULT1": "px-xtr-17.html",
  "PX-006": "fragment-006.html"
};

document.addEventListener("keydown", (e) => {
  window.vaultKeys = (window.vaultKeys || "") + e.key;
  checkSecretCodes();
});