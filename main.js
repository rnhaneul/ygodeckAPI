const searchResults = document.getElementById('searchResults');
const resultImages = document.getElementById('resultImages');
const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const searchTerm = myForm.elements.search.value.trim();

  if (!searchTerm) {
    console.log("Please enter a search value.");
    return;
  }

  searchResults.innerHTML = '';
  resultImages.innerHTML = '';

  try {
    const response = await axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php", {
      params: {
        fname: searchTerm
      }
    });

    const cards = response.data.data || [];

    if (!cards.length) {
      searchResults.innerHTML = "<p>No cards found.</p>";
      return;
    }

    cards.forEach(card => {
      const cardInfo = `
        <ul>
          <li>NAME: <b>${card.name || "N/A"}</b></li>
          <li>ATK: <b>${card.atk ?? "N/A"}</b></li>
          <li>DEF: <b>${card.def ?? "N/A"}</b></li>
          <li>LEVEL: <b>${card.level ?? "N/A"}</b></li>
        </ul>
      `;

      searchResults.innerHTML += cardInfo;

      if (Array.isArray(card.card_images) && card.card_images.length > 0) {
        card.card_images.forEach(img => {
          const newImg = document.createElement("img");
          newImg.src = img.image_url;
          newImg.className = "cardImgs";
          newImg.title = img.id || "card";
          resultImages.appendChild(newImg);
        });
      }
    });
  } catch (error) {
    console.error("Error fetching cards:", error.response?.status || error.message);
  }
});