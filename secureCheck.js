// secureCheck.js — Vérification cryogénique PX

const mintPX = "DK3h83B1nbfTuP4pnAiXeiSQp7mHnZAZVeKa1Xmtpump"; // Mint du token PX
const minPX = 2500; // Seuil minimum requis

document.getElementById("connectBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const loader = document.getElementById("loader");

  loader.classList.remove("hidden");
  status.textContent = "";

  try {
    if (!window.solana || !window.solana.isPhantom) {
      status.textContent = "🛑 Phantom Wallet requis.";
      loader.classList.add("hidden");
      return;
    }

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
        ),
      }
    );

    let amount = 0;
    tokenAccounts.value.forEach((acc) => {
      const info = acc.account.data.parsed.info;
      if (info.mint === mintPX) {
        amount = parseFloat(info.tokenAmount.uiAmount);
      }
    });

    loader.classList.add("hidden");

    if (amount >= minPX) {
      const successMsg = document.createElement("div");
      successMsg.style =
        "position:fixed;bottom:20px;right:20px;background:#000000cc;border:1px solid #00ffe1;color:#00ffe1;padding:10px;font-family:monospace;font-size:0.9em;z-index:9999;";
      successMsg.innerHTML = `🚀 Accès confirmé<br>${wallet.slice(
        0,
        4
      )}...${wallet.slice(-4)}<br>💠 ${amount} PX`;
      document.body.appendChild(successMsg);
    } else {
      status.textContent = `⛔ Accès refusé. ${amount} PX trouvés, ${minPX} requis.`;
    }
  } catch (e) {
    loader.classList.add("hidden");
    status.textContent = "❌ Erreur de vérification.";
    console.error("🧪 Erreur secureCheck :", e);
  }
});
