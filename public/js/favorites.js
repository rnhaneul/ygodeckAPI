async function favorites() {
  const favoritesContainer = document.getElementById("favorites-container");

  try {
    const response = await axios.get("/api/account/favorites");
    const favorites = response.data.currentUser.favorites

    console.log(response.data.currentUser.favorites);

    favorites.forEach(element => {
      const cardWrapper = document.createElement("div");
      const cardOptions = document.createElement("div");
      const cardButton = document.createElement("button");
      const divider = document.createElement("br");
      const cardLink = document.createElement("a")
      const img = document.createElement("img");

      cardWrapper.className = "favorite-element";
      cardOptions.className = "element-options";

      img.src = element;
      cardButton.textContent = "Remove from favorites";
      cardLink.textContent = "View Details";

      cardOptions.append(cardButton, divider, cardLink);
      cardWrapper.append(img, cardOptions);
      favoritesContainer.append(cardWrapper);
    });
  } catch (error) {
    console.error("ERROR!", error);
  }
}

favorites();