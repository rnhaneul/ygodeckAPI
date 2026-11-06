function renderAltArt(card) {
  const artContainer = document.getElementById("art-container");

  for (let i = 0; i < card.card_images.length; i++) {
    const element = card.card_images[i];
    const image = document.createElement("img");
    const imageUrl = element.image_url;

    image.src = imageUrl;
    artContainer.appendChild(image)
  }

  console.log(artContainer)
}

async function getCard(name) {
  try {
    const container = document.getElementById("single-card-info");
    if (!container) return;

    const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`);

    const card = response.data?.data?.[0];
    if (!card) {
      container.innerHTML = "No details available.";
      return;
    }
    const imgSrc = `https://images.ygoprodeck.com/images/cards/${card.id}.jpg`;

    renderAltArt(card)
    render(card, container, imgSrc)
  } catch (err) {
    console.error(err.message);
  }
}

function render(card, container, imgSource) {
  const img = document.createElement("img");
  const imageUrl = card.card_images?.[0]?.image_url ?? imgSource;

  const details = document.createElement("div");
  details.setAttribute("id", "cardFullDetails");

  const list = document.createElement("ul");

  list.append(
    makeItem("NAME", card.name || "N/A"),
    makeItem("ARCHETYPE", card.archetype),
    makeItem("ATK", card.atk),
    makeItem("DEF", card.def),
    makeItem("LEVEL", card.level),
    makeItem("RACE", card.race),
    makeItem("TYPE", card.type),
    makeItem("ATTRIBUTE", card.attribute),
    makeItem("DESCRIPTION", card.desc)
  );

  img.alt = card.name || "Card image";
  if (imageUrl) img.src = imageUrl;
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