const passwordInput = document.getElementById('password');
const createButton = document.getElementById('createButton');
const feedbackEl = document.getElementById('passwordFeedback');
const form = document.querySelector('form.box');

let attemptedSubmit = false; //pour que les requirements ne s'affichent pas au première essai.

function getMissingPasswordRequirements(pw) {
  const missing = []; //Variable
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; //Liste des charactères spéciaux
  const uppercaseRegex = /[A-Z]/; //Liste des majuscules

  //Si requirements is not good, affiche requirement non-respecté
  if (!specialCharRegex.test(pw)) missing.push('At least one special character');
  if (!uppercaseRegex.test(pw)) missing.push('At least one uppercase letter');
  if ((pw || '').length < 8) missing.push('Minimum 8 characters');

  return missing;
}

//Si s'est ok ou pas
function renderPasswordFeedback(show) {
  const pw = passwordInput.value || '';
  const missing = getMissingPasswordRequirements(pw);

  if (missing.length === 0) { //Si la liste de missing requirements est vide = password complète!
    feedbackEl.textContent = 'Password meets all of the requirements!';
    feedbackEl.classList.remove('is-danger');
    feedbackEl.classList.add('is-success');
    feedbackEl.style.display = show ? 'block' : 'none';
  } else {
    feedbackEl.classList.remove('is-success');
    feedbackEl.classList.add('is-danger');
    feedbackEl.innerHTML =
      '<strong>Password requirements:</strong><ul style="margin:0;padding-left:1.25em;">' +
      missing.map(m => `<li>${m}</li>`).join('') +
      '</ul>';
    feedbackEl.style.display = show ? 'block' : 'none';
  }
}

function onPasswordInput() {
  renderPasswordFeedback(attemptedSubmit);
}

if (passwordInput) {
  passwordInput.addEventListener('input', onPasswordInput);
  renderPasswordFeedback(false);
}

function interceptIfInvalid(event) {
  const missing = getMissingPasswordRequirements(passwordInput.value || '');
  if (missing.length > 0) {
    attemptedSubmit = true;
    renderPasswordFeedback(true);
    passwordInput.focus();
    event.preventDefault();
    return true;
  }
  return false;
}

if (form) { //N'execute pas la commande du bouton si les password ne sont pas based
  form.addEventListener('submit', function (event) {
    interceptIfInvalid(event);
  });
} else if (createButton) {
  createButton.addEventListener('click', function (event) {
    interceptIfInvalid(event);
  });
}
