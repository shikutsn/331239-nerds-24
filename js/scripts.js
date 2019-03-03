var writeusButton = document.querySelector(".contacts-writeus");

var writeusWindow = document.querySelector(".modal-writeus");
var writeusClose = writeusWindow.querySelector(".modal-close");

var writeusForm = writeusWindow.querySelector(".writeus-form");
var nameField = writeusWindow.querySelector("[name=name]");
var emailField = writeusWindow.querySelector("[name=email]");
var letterField = writeusWindow.querySelector("[name=letter]");

var isStorageSupported = true;
var storagedName = "";
var storagedEmail = "";

try {
  storagedName = localStorage.getItem("name");
  storagedEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupported = false;
}

writeusButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  writeusWindow.classList.add("modal-show");

  if (storagedName) {
    nameField.value = storagedName;
  }
  if (storagedEmail) {
    emailField.value = storagedEmail;
  }

  if (storagedName && storagedEmail) {
    letterField.focus();
  } else if (storagedName) {
    emailField.focus();
  } else {
    nameField.focus();
  }
});

writeusForm.addEventListener("submit", function (evt) {
  if (!nameField.value || !emailField.value || !letterField.value) {
    evt.preventDefault();
    writeusWindow.classList.remove("modal-error");
    void writeusWindow.offsetWidth;
    writeusWindow.classList.add("modal-error");
    //навешиваем класс с ошибкой на поле (подкрашивание красным)
    if (!nameField.value) {
      nameField.classList.add("modal-invalid-field");
    }
    if (!emailField.value) {
      emailField.classList.add("modal-invalid-field");
    }
    if (!letterField.value) {
      letterField.classList.add("modal-invalid-field");
    }
  } else {
    if (isStorageSupported) {
      localStorage.setItem("name", nameField.value);
      localStorage.setItem("email", emailField.value);
    }
  }
});

// если значение в поле поменялось и было подсвечено красным - убираем
nameField.addEventListener("input", function (evt) {
  if (nameField.classList.contains("modal-invalid-field")) {
    nameField.classList.remove("modal-invalid-field");
  }
});

emailField.addEventListener("input", function (evt) {
  if (emailField.classList.contains("modal-invalid-field")) {
    emailField.classList.remove("modal-invalid-field");
  }
});

letterField.addEventListener("input", function (evt) {
  if (letterField.classList.contains("modal-invalid-field")) {
    letterField.classList.remove("modal-invalid-field");
  }
});

function closeModalWindow() {
  if (writeusWindow.classList.contains("modal-show")) {
    writeusWindow.classList.remove("modal-show");
    writeusWindow.classList.remove("modal-error");
  }
}

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeModalWindow();
  }
});

writeusClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModalWindow();
});
