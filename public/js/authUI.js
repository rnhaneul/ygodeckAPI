document.addEventListener("DOMContentLoaded", async () => {
  const welcomeText = document.getElementById("welcomeText");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.querySelector(".nav-login");
  const signupLink = document.querySelector(".nav-signup");

  if (!welcomeText || !logoutBtn) return;

  welcomeText.hidden = true;
  logoutBtn.hidden = true;

  try {
    const response = await axios.get("/myaccount");

    welcomeText.textContent = `Welcome back, ${response.data.username}.`;
    welcomeText.hidden = false;
    logoutBtn.hidden = false;

    if (loginLink) loginLink.hidden = true;
    if (signupLink) signupLink.hidden = true;
  } catch (err) {
    if (err.response?.status !== 401) {
      console.error("Could not check login status:", err);
    }
    welcomeText.textContent = "Guest";
    welcomeText.hidden = false;
    logoutBtn.hidden = true;

    if (loginLink) loginLink.hidden = false;
    if (signupLink) signupLink.hidden = false;
  }

  logoutBtn.addEventListener("click", async () => {
    try {
      await axios.post("/logout");
      window.location.reload();
    } catch (err) {
      console.error("Could not log out:", err);
    }
  });
});