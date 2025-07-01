// PX-STATUS : Tracker de séquence clavier ++
let pxSequence = "";
const logThreshold = 6;

document.addEventListener("keydown", (e) => {
  pxSequence += e.key.toUpperCase();

  // 🔍 Log visuel à partir d’une certaine longueur
  if (pxSequence.length >= logThreshold) {
    console.log("[PX:SEQUENCE] => " + pxSequence.slice(-20));
  }

  // 🔓 Séquence reconnue : CORESEED
  if (pxSequence.includes("CORESEED")) {
    console.log("🧠 Noyau PX déverrouillé");
    window.location.href = "PX-CORE.html";
  }

  // 🕹️ Déclenche le mini-jeu ghostrunner
  if (pxSequence.includes("GHOSTRUN")) {
    console.log("👾 Ghostrunner activé");
    document.getElementById("ghostrunner")?.classList.remove("hidden");
  }

  // 💠 Effet visuel cryo temporaire
  if (pxSequence.includes("PXGATE")) {
    console.log("🌀 Passage cryo PX activé");
    document.body.style.transition = "all 0.5s ease";
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
    setTimeout(() => {
      document.body.style.filter = "";
    }, 1000);
  }

  // ⛓️ Taille max du tampon
  if (pxSequence.length > 30) {
    pxSequence = pxSequence.slice(-20);
  }
});
