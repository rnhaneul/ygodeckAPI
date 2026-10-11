// DOM
const searchResults = document.getElementById('searchResults');
const resultImages = document.getElementById('resultImages');
const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchResults.innerHTML = '';
  resultImages.innerHTML = '';
  getCards();
});

// axios params?
const getCards = async () => {
  try {
    const response = await axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php", {
      params: {
        type: myForm.elements.search.value
      }
    });

    const resData = response.data.data;
    console.log(resData);
    resData.forEach(card => {
      searchResults.innerHTML += `
    <ul>
      <li>NAME: <b>${card.name}</b></li>
      <li>ATK: <b>${card.atk}</b></li>
      <li>DEF: <b>${card.def}</b></li>
      <li>LEVEL: <b>${card.level}</b></li>
    </ul>
    `;
    });

    if (card.card_images?.length > 0) {
      card.card_images.forEach(img => {
        const newImg = document.createElement("img");
        newImg.src = img.image_url;
        newImg.className = "cardImgs";
        newImg.title = img.id;
        resultImages.appendChild(newImg);
      });
    }
  } catch (error) {
    console.error(error.status)
  }
}