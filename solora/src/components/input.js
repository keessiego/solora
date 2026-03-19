export function initInput(inputElement) {
  if (!inputElement) return;

  // Maak het error element aan als het nog niet bestaat
  let errorDisplay = inputElement.parentNode.querySelector('.sol-error-message');
  if (!errorDisplay) {
    errorDisplay = document.createElement('span');
    errorDisplay.className = 'sol-error-message';
    inputElement.parentNode.appendChild(errorDisplay);
  }

  // Voorkom de standaard browser popup
  inputElement.addEventListener('invalid', (e) => {
    e.preventDefault();
    showError();
  });

  // Check validatie terwijl de gebruiker typt (optioneel, voor betere UX)
  inputElement.addEventListener('input', () => {
    if (inputElement.validity.valid) {
      hideError();
    }
  });

  function showError() {
    let message = "Ongeldige invoer";

    // Specifieke meldingen op basis van type
    if (inputElement.validity.valueMissing) {
      message = "Dit veld is verplicht";
    } else if (inputElement.validity.typeMismatch) {
      if (inputElement.type === 'email') message = "Voer een geldig e-mailadres in";
      if (inputElement.type === 'url') message = "Voer een geldige link in";
    } else if (inputElement.validity.rangeUnderflow) {
      message = `Minimum is ${inputElement.min}`;
    }

    errorDisplay.textContent = message;
    errorDisplay.style.display = 'block';
    inputElement.classList.add('is-invalid');
  }

  function hideError() {
    errorDisplay.style.display = 'none';
    inputElement.classList.remove('is-invalid');
  }
}