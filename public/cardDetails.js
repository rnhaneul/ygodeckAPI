/* 
Get all the information available about selected card from SEARCH
*/
async function getCard(id) {
  try {
    const imgSrc = `https://images.ygoprodeck.com/images/cards/${id}.jpg`;
    const container = document.getElementById("single-card-info");
    if (!container) return;

    const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);

    const card = response.data?.data?.[0];
    if (!card) {
      container.innerHTML = "No details available.";
      return;
    }

    render(card, container, imgSrc)
  } catch (err) {
    console.error(err.message);
  }
}

function render(card, container, imgSource) {
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
  img.src = card.card_images?.[0]?.image_url ?? imgSource;
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