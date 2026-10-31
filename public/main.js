const resultsContainer = document.getElementById("searchResults");
const myForm = document.getElementById("myForm");
const filterSelect = document.getElementById("card-filters");
const levelFilter = document.getElementById("level-filter");


filterSelect.addEventListener("change", (ele) => {
  if (ele.target.value === "level") {
    levelFilter.style.display = "block";
  } else {
    levelFilter.style.display = "none";
  }
})

myForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchType = filterSelect.value;
  const searchTerm = myForm.elements.search.value.trim();

  if (!searchTerm) {
    resultsContainer.innerHTML = "Please enter a valid search value.";
    return;
  }

  resultsContainer.innerHTML = "";

  try {
    const params = {};

    if (searchType === "name") {
      params.fname = searchTerm;
    } else if (searchType === "level") {
      params.level = levelFilter.value;
    } else if (searchType === "type") {
      params.type = searchTerm;
    } else if (searchType === "attribute") {
      params.attribute = searchTerm;
    } else if (searchType === "race") {
      params.race = searchTerm;
    }

    const response = await axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php", {
      params,
    });

    const cards = response.data.data || [];

    if (!cards.length) {
      resultsContainer.innerHTML = "<p>No cards found.</p>";
      return;
    }

    cards.forEach((card) => {
      const cardWrapper = document.createElement("div");
      cardWrapper.className = "search-card";

      const img = document.createElement("img");
      if (Array.isArray(card.card_images) && card.card_images.length > 0) {
        img.src = card.card_images[0].image_url;
      } else {
        img.src = "";
      }

      img.alt = card.name || "Card image";

      const details = document.createElement("div");
      details.className = "card-details";

      details.innerHTML = `
        <ul>
          <li><b>NAME:</b> ${card.name || "N/A"}</li>
          <li><b>ATK:</b> ${card.atk ?? "N/A"}</li>
          <li><b>DEF:</b> ${card.def ?? "N/A"}</li>
          <li><b>LEVEL:</b> ${card.level ?? "N/A"}</li>
        </ul>
        <hr/>
        <a href="/card/${card.id}/details">View details</a>
      `;
      if (resultsContainer.children.length > 49) return;
      cardWrapper.appendChild(img);
      cardWrapper.appendChild(details);
      resultsContainer.appendChild(cardWrapper);
    });

  } catch (error) {
    console.error("Error fetching cards:", error.response?.status || error.message);
  }
});