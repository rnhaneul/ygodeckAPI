const myForm = document.getElementById("signup-form");

myForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target[0].value
  const password = e.target[1].value
  try {
    const params = { username, password }
    const response = await axios
      .get("http://localhost:5000/account", {
        params
      })

    console.log("Test")

    console.log(response);

  } catch (err) {
    console.error("Error doing something??", err.message)
  }
})