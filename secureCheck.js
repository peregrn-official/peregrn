 // secureCheck.js — version silencieuse (anti-popup)

const mintPX = "DK3h83B1nbfTuP4pnAiXeiSQp7mHnZAZVeKa1Xmtpump";
const minPX = 2500; // Rang minimum requis : Petit Faucon

(async () => {
  if (!window.solana || !window.solana.isPhantom) {
    console.warn("🛑 Phantom requis. Redirection PX.");
    window.location.href = "index.html";
    return;
  }

  try {
    const resp = await window.solana.connect();
    const wallet = resp.publicKey.toString();

    const connection = new solanaWeb3.Connection(
      "https://mainnet.helius-rpc.com/?api-key=d50bd88d-c6aa-4b1b-af8c-9d9bfba9ffe3"
    );

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new solanaWeb3.PublicKey(wallet),
      {
        programId: new solanaWeb3.PublicKey(
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        )
      }
    );

    let amount = 0;
    tokenAccounts.value.forEach((acc) => {
      const info = acc.account.data.parsed.info;
      if (info.mint === mintPX) {
        amount = parseFloat(info.tokenAmount.uiAmount);
      }
    });

    if (amount < minPX) {
      console.warn(`⛔ Accès refusé. PX trouvés : ${amount} < ${minPX}`);
      window.location.href = "index.html";
    } else {
      // ✅ Affichage du rang sur la page
      const infoZone = document.createElement("div");
      infoZone.style.position = "fixed";
      infoZone.style.bottom = "20px";
      infoZone.style.right = "20px";
      infoZone.style.background = "#000000cc";
      infoZone.style.color = "#00ffe1";
      infoZone.style.border = "1px solid #00ffe1";
      infoZone.style.padding = "10px 14px";
      infoZone.style.fontFamily = "monospace";
      infoZone.style.fontSize = "0.9em";
      infoZone.style.zIndex = "9999";
      infoZone.innerHTML = `🛰️ <strong>PX ID confirmé</strong><br>${wallet.slice(0, 4)}...${wallet.slice(-4)}<br>💠 Solde : ${amount} PX`;
      document.body.appendChild(infoZone);
    }

  } catch (e) {
    console.error("🛑 Erreur de vérification PX :", e);
    window.location.href = "index.html";
  }
})();
