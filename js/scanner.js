document.addEventListener("DOMContentLoaded", () => {
    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText, decodedResult) => {
            // Validation réussie
            document.getElementById("result").innerText = "Présence validée";
            document.getElementById("result").classList.add("success");

            // Envoyer les données au backend
            fetch("http://127.0.0.1:5000/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ qr_data: decodedText }),
            })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
            })
            .catch((error) => {
                console.error("Erreur:", error);
            });

            // Arrêter la caméra
            html5QrCode.stop();
        },
        (errorMessage) => {
            // Erreur de validation
            document.getElementById("result").innerText = "Erreur : veuillez rescanner";
            document.getElementById("result").classList.add("error");
        }
    ).catch((err) => {
        console.error("Erreur lors de l'ouverture de la caméra :", err);
    });
});

