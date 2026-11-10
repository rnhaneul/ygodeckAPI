const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const username = form.elements.username.value;
  const password = form.elements.password.value;

  const signupMessage = document.getElementById("signup-message");

  try {
    const response = await axios
      .post("http://localhost:5000/signup", {
        username,
        password,
      })

    signupMessage.textContent =
      response.data.message ||
      "Could not connect to the server. Please try again later.";

    form.reset();
    signupForm.closest(".account-card").hidden = true;
    loginForm.closest(".account-card").hidden = false;

    const loginMessage = document.getElementById("login-message");
    loginMessage.textContent = "Account created! You can log in now."

    document.getElementById("login-username").focus();
  } catch (err) {
    signupMessage.textContent = err.response?.data?.message;
    console.error(err.response?.data?.message || err.message);
  }
})

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const username = form.elements.username.value;
  const password = form.elements.password.value;

  const loginMessage = document.getElementById("login-message");

  try {
    const response = await axios
      .post("http://localhost:5000/login", {
        username,
        password,
      });

    loginMessage.textContent =
      response.data.message ||
      "Could not connect to the server. Please try again later.";

    window.location.href = "/";
  } catch (err) {
    loginMessage.textContent = err.response?.data?.message;
    console.error(err.response?.data?.message || err.message);
  }
})