// Quand le formulaire est soumis
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi réel du formulaire
    alert(" Votre message a été envoyé avec succès !");
    // Optionnel : réinitialiser le formulaire après l'alerte
    this.reset();
});

// ---- Formatage automatique du numéro de téléphone ----
const telInput = document.getElementById("tel");

telInput.addEventListener("input", function(e) {
    // Supprime tout sauf les chiffres
    let input = e.target.value.replace(/\D/g, "");

    // Limite à 10 chiffres max
    if (input.length > 10) input = input.substring(0, 10);

    // Formate en (xxx) xxx-xxxx
    if (input.length > 6) {
        e.target.value = `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(6)}`;
    } else if (input.length > 3) {
        e.target.value = `(${input.substring(0, 3)}) ${input.substring(3)}`;
    } else if (input.length > 0) {
        e.target.value = `(${input}`;
    }
});


// ---- Validation du courriel ----
const courrielInput = document.getElementById("email");
const courrielHelp = document.getElementById("emailHelp");

courrielInput.addEventListener("input", function () {
  const courriel = courrielInput.value.trim();
  const regexCourriel = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regexCourriel.test(courriel)) {
    // Le courriel est valide → on enlève les erreurs
    courrielInput.classList.remove("is-danger");
    courrielHelp.textContent = "";
  } else {
    // Le courriel est invalide → on affiche le message d’erreur
    courrielInput.classList.add("is-danger");
    courrielHelp.textContent = "Le courriel est invalide";
  }
});
