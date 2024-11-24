const html5QrCode = new Html5Qrcode("reader");

html5QrCode.start(
    { facingMode: "environment" }, // Utiliser la caméra arrière
    { fps: 10, qrbox: 250 }, // Paramètres de lecture du QR Code
    (decodedText) => {
        console.log(`Scanned: ${decodedText}`);
        // Envoie des données au back-end
        fetch('http://localhost:5000/scan', {  // Changez l'URL par celle de votre serveur (ex : Heroku)
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ qrCode: decodedText }),
        })
        .then(response => response.json())
        .then(data => {
            // Redirection vers la page de résultats
            window.location.href = 'result.html';
        })
        .catch(err => console.error('Error:', err));
    },
    (errorMessage) => {
        console.error(`Erreur: ${errorMessage}`);
    }
);
