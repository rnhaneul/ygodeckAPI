async function favorites() {
  try {
    const response = await axios.get("/api/account/favorites");
    const favorites = response.data.currentUser.favorites
    console.log(response.data.currentUser.favorites);
    favorites.forEach(element => {
      console.log(element);
    });
  } catch (error) {
    console.error("ERROR!!!!!", error);
  }
}

favorites();