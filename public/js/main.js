/* 
DOM Elements
*/
const resultsContainer = document.getElementById("searchResults");
const myForm = document.getElementById("myForm");
const filterSelect = document.getElementById("card-filters");
const levelFilter = document.getElementById("level_filter");
const searchInput = document.getElementById("searchInput");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const pageNumbers = document.getElementById("pageNumbers");

/* 
Filter listener/function
*/
filterSelect.addEventListener("change", (e) => {
  if (e.target.value === "level") {
    levelFilter.style.display = "block";
    searchInput.style.display = "none";
    searchInput.value = "";
  } else {
    levelFilter.style.display = "none";
    searchInput.style.display = "block";
    levelFilter.value = "";
  }
});

/* 
  Form submit listener
*/
let sessionCards = [];
const paginationLimit = 10;
let currentPage = 1;

function getTotalPages() {
  return Math.ceil(sessionCards.length / paginationLimit);
}

function renderCurrentPage() {
  resultsContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * paginationLimit;
  const cardsToShow = sessionCards.slice(
    startIndex,
    startIndex + paginationLimit
  );

  cardsToShow.forEach((card) => {
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

    const list = document.createElement("ul");

    function makeItem(label, value) {
      const item = document.createElement("li");
      const boldLabel = document.createElement("strong");

      boldLabel.textContent = `${label}:`;
      item.append(boldLabel, ` ${value ?? "N/A"}`);

      return item;
    }

    list.append(
      makeItem("NAME", card.name || "N/A"),
      makeItem("ATK", card.atk),
      makeItem("DEF", card.def),
      makeItem("LEVEL", card.level)
    );

    const divider = document.createElement("hr");

    const link = document.createElement("a");
    const params = new URLSearchParams({ name: card.name });
    link.href = `/card/details?${params}`;
    link.textContent = "View details";

    details.append(list, divider, link);

    cardWrapper.appendChild(img);
    cardWrapper.appendChild(details);
    resultsContainer.appendChild(cardWrapper);
  });
}

function renderPageButtons() {
  pageNumbers.innerHTML = "";

  const totalPages = getTotalPages();

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = i;
    btn.className = "page-btn";

    if (i === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      renderCurrentPage();
      renderPageButtons();
      updatePaginationButtons();
    });

    pageNumbers.appendChild(btn);
  }
}

function updatePaginationButtons() {
  const pageButtons = document.querySelectorAll(".page-btn");
  const totalPages = getTotalPages();

  pageButtons.forEach((btn, index) => {
    const pageNumber = index + 1;
    btn.classList.toggle("active", pageNumber === currentPage);
    btn.disabled = pageNumber > totalPages;
  });

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage >= totalPages;
}

myForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchType = filterSelect.value;
  const searchTerm = myForm.elements.search.value.trim();
  const levelValue = myForm.elements.level_filter.value;

  if (searchType === "level" && levelValue === "") {
    resultsContainer.textContent = "Please enter a level.";
    return;
  }

  if (searchType !== "level" && searchTerm === "") {
    resultsContainer.textContent = "Please enter a valid search value.";
    return;
  }

  resultsContainer.innerHTML = "";

  try {
    const params = {};

    if (searchType === "name") {
      params.fname = searchTerm;
    } else if (searchType === "level") {
      params.level = Number(levelValue);
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
    sessionCards = cards;
    currentPage = 1;

    if (!cards.length) {
      resultsContainer.innerHTML = "<p>No cards found.</p>";
      pageNumbers.innerHTML = "";
      prevButton.disabled = true;
      nextButton.disabled = true;
      return;
    }

    renderCurrentPage();
    renderPageButtons();
    updatePaginationButtons();
  } catch (error) {
    console.error("Error fetching cards:", error.response?.status || error.message);
  }
});

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderCurrentPage();
    renderPageButtons();
    updatePaginationButtons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

});

nextButton.addEventListener("click", () => {
  if (currentPage < getTotalPages()) {
    currentPage++;
    renderCurrentPage();
    renderPageButtons();
    updatePaginationButtons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});