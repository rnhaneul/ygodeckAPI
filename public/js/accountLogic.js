const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const signupMessage = document.getElementById("signup-message");
const loginMessage = document.getElementById("login-message");
const signupSection = document.getElementById("signup-section");
const loginSection = document.getElementById("login-section");

// Helper functions

function clearMessage(message) {
  message.textContent = "";
  message.classList.remove("error", "success");
}

function setMessage(element, message, className) {
  element.textContent = message;
  element.classList.remove("error", "success");
  element.classList.add(className);
}

function clearMessageOnInput(form, messageElement) {
  form.elements.username.addEventListener("input", () => {
    messageElement.textContent = "";
    messageElement.classList.remove("error", "success");
  });

  form.elements.password.addEventListener("input", () => {
    messageElement.textContent = "";
    messageElement.classList.remove("error", "success");
  });
}

if (
  !signupForm ||
  !loginForm ||
  !signupMessage ||
  !loginMessage
) {
  console.error("Account form elements could not be found.");
} else {
  clearMessageOnInput(signupForm, signupMessage);
  clearMessageOnInput(loginForm, loginMessage);

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = form.elements.username.value.trim();
    const password = form.elements.password.value;

    if (!username || !password) {
      setMessage(
        signupMessage,
        "Please enter a username and password.",
        "error"
      );
      return;
    }

    try {
      await axios.post("/signup", { username, password });

      form.reset();

      clearMessage(signupMessage);
      clearMessage(loginMessage);

      if (signupSection) signupSection.hidden = true;
      if (loginSection) loginSection.hidden = false;

      setMessage(
        loginMessage,
        "Account created! You can log in now.",
        "success"
      );

      document.getElementById("login-username")?.focus();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Could not connect to the server. Please try again later.";

      setMessage(signupMessage, message, "error");
      console.error(message);
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = form.elements.username.value.trim();
    const password = form.elements.password.value;

    if (!username || !password) {
      setMessage(
        loginMessage,
        "Please enter your username and password.",
        "error"
      );
      return;
    }

    try {
      await axios.post("/login", { username, password });
      window.location.href = "/";
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Could not connect to the server. Please try again later.";

      setMessage(loginMessage, message, "error");
      console.error(message);
    }
  });
}