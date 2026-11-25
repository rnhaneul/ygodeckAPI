// Helper functions
function showAccountSections() {
  const loginSection = document.getElementById("login-section");
  const signupSection = document.getElementById("signup-section");

  if (loginSection) loginSection.hidden = false;
  if (signupSection) signupSection.hidden = false;
}

function hideAccountSections() {
  const loginSection = document.getElementById("login-section");
  const signupSection = document.getElementById("signup-section");

  if (loginSection) loginSection.hidden = true;
  if (signupSection) signupSection.hidden = true;
}

// DOM
document.addEventListener("DOMContentLoaded", async () => {
  const welcomeText = document.getElementById("welcomeText");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.querySelector(".nav-login");
  const signupLink = document.querySelector(".nav-signup");
  const myAccountBtn = document.getElementById("my-account-btn");

  if (welcomeText) welcomeText.hidden = true;
  if (logoutBtn) logoutBtn.hidden = true;
  if (myAccountBtn) myAccountBtn.hidden = true;

  try {
    const response = await axios.get("/login/account");

    if (welcomeText) {
      welcomeText.textContent = `Welcome back, ${response.data.username}.`;
      welcomeText.hidden = false;
    }

    if (myAccountBtn) myAccountBtn.hidden = false;
    if (logoutBtn) logoutBtn.hidden = false;

    if (loginLink) loginLink.hidden = true;
    if (signupLink) signupLink.hidden = true;

    hideAccountSections();

  } catch (err) {
    if (err.response?.status !== 401) {
      console.error("Could not check login status:", err);
    }

    if (welcomeText) {
      welcomeText.textContent = "Guest";
      welcomeText.hidden = false;
    }

    if (logoutBtn) logoutBtn.hidden = true;
    if (myAccountBtn) myAccountBtn.hidden = true;

    if (loginLink) loginLink.hidden = false;
    if (signupLink) signupLink.hidden = false;

    showAccountSections();
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await axios.post("/logout");
        window.location.reload();
      } catch (err) {
        console.error("Could not log out:", err);
      }
    });
  }
});
