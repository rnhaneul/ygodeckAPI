/* 
Get all the information available about selected card from SEARCH
*/
async function getCard(id) {
  try {
    const container = document.getElementById("single-card-info");
    if (!container) return;

    const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);

    const card = response.data?.data?.[0];
    if (!card) {
      container.innerHTML = "No details available."
      return;
    }

    const newImg = document.createElement("img");
    newImg.src = card.card_images?.[0]?.image_url ?? "";
    newImg.className = "cardImgs";
    newImg.title = card.name ?? "card";
    container.appendChild(newImg);

    const cardInfo = `
      <div id="cardFullDetails">
        <ul>
          <li><b>NAME:</b> ${card.name ?? "N/A"}</li>
          <li><b>ATK:</b> ${card.atk ?? "N/A"}</li>
          <li><b>DEF:</b> ${card.def ?? "N/A"}</li>
          <li><b>LEVEL:</b> ${card.level ?? "N/A"}</li>
          <li><b>RACE:</b> ${card.race ?? "N/A"}</li>
          <li><b>TYPE:</b> ${card.type ?? "N/A"}</li>
          <li><b>ATTRIBUTE:</b> ${card.attribute ?? "N/A"}</li>
          <li><b>DESCRIPTION:</b> ${card.desc ?? "N/A"}</li>
        </ul>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", cardInfo);
  } catch (err) {
    console.error(err.message);
  }
}