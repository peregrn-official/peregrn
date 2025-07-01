// PX-STATUS : Tracker de séquence clavier
let pxSequence = "";
const logThreshold = 6; // longueur avant affichage

document.addEventListener("keydown", (e) => {
  pxSequence += e.key.toUpperCase();

  // Affiche la progression si la séquence atteint la taille minimale
  if (pxSequence.length >= logThreshold) {
    console.log("[PX:SEQUENCE] => " + pxSequence.slice(-20));
  }

  // Exemple : action si CORESEED détecté
  if (pxSequence.includes("CORESEED")) {
    console.log("🔓 Séquence CORESEED reconnue");
    // Tu peux ajouter ici un trigger custom
  }

  // Limite la mémoire tampon
  if (pxSequence.length > 30) {
    pxSequence = pxSequence.slice(-15);
  }
});
