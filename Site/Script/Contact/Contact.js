const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");


// Message dynamique
const feedback = document.createElement("p");
form.appendChild(feedback);



// Validation et envoi simulé
form.addEventListener("submit", function(e) {
    e.preventDefault(); // empêche le rechargement

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (name === "" || email === "" || message === "") {
        feedback.textContent = "Tous les champs sont obligatoires.";
        feedback.style.color = "red";
        return;
    }

    if (!emailRegex.test(email)) {
        feedback.textContent = "L'email n'est pas valide.";
        feedback.style.color = "red";
        return;
    }

    if (message.length < 10) {
        feedback.textContent = "Le message doit contenir au moins 10 caractères.";
        feedback.style.color = "red";
        return;
    }

    // Si tout est bon
    feedback.textContent = "Merci pour votre message !";
    feedback.style.color = "green";

    form.reset();
    counter.textContent = "0 caractères";
});

