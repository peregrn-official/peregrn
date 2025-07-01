// secureCheck.js – protection PX
const mintPX = "DK3h83B1nbfTuP4pnAiXeiSQp7mHnZAZVeKa1Xmtpump";
const minPX = 2500; // ex : Petit Faucon requis

(async () => {
  if (!window.solana || !window.solana.isPhantom) {
    alert("🛑 Phantom requis. Redirection PX.");
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
      alert("⛔ Accès refusé. Solde insuffisant.");
      window.location.href = "index.html";
    }
  } catch (e) {
    alert("🛑 Erreur de vérification PX.");
    window.location.href = "index.html";
  }
})();
