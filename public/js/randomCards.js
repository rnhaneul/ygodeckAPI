async function getRandom() {
  try {
    const container = document.getElementById("single-card-info");
    if (!container) return;

    container.replaceChildren();

    const response = await axios.get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset=0&sort=random&cachebust"
    );

    const card = response.data?.data?.[0];
    if (!card) return;

    render(card, container)
  } catch (error) {
    console.error(error.message);
  }
}


const btn = document.getElementById("random-card-btn");

if (btn) {
  btn.addEventListener("click", () => {
    getRandom();
  })
}
// Create div container with img and card details
function render(card, container) {
  const img = document.createElement("img");
  const details = document.createElement("div");
  details.setAttribute("id", "cardFullDetails");

  const list = document.createElement("ul");

  list.append(
    makeItem("NAME", card.name || "N/A"),
    makeItem("ATK", card.atk),
    makeItem("DEF", card.def),
    makeItem("LEVEL", card.level),
    makeItem("RACE", card.race),
    makeItem("TYPE", card.type),
    makeItem("ATTRIBUTE", card.attribute),
    makeItem("DESCRIPTION", card.desc)
  );

  img.alt = card.name || "Card image";
  img.src = card.card_images?.[0]?.image_url ?? "";
  img.className = "cardImgs";
  img.title = card.name ?? "card";

  details.append(list);
  container.append(img, details);
}

// create list item 
function makeItem(label, value) {
  const item = document.createElement("li");
  const boldLabel = document.createElement("strong");

  boldLabel.textContent = `${label}:`;
  item.append(boldLabel, ` ${value ?? "N/A"}`);

  return item;
}

// getRandom();