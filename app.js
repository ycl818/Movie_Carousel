const movies = [];
const dataPanel = document.querySelector("#data-panel");
const prevButton = document.querySelector(".card__prev");
const nextButton = document.querySelector(".card__next");
const scrollPerClick = 258;
const movieCard = document.querySelector(".row");

showData();

function renderMovies(data) {
  for (let i = 0; i < data.length; i++) {
    document.getElementById("data-panel").insertAdjacentHTML(
      "beforeend",
      `
       <li class="movie__card slide${i}">
          <img src="${data[i].imgUrl}" alt="" />
          <div class="card__title">${data[i].name}</div>
          <div class="card__info">${data[i].outlineInfo}</div>  
        </li>
    `
    );
  }

  // dataPanel.innerHTML = rawHTML;
}
// GET data
async function showData() {
  fetch("http://localhost:3000/movies")
    .then((response) => response.json())
    .then((json) => {
      movies.push(...json);
      renderMovies(movies);
      console.log(movies);
    })
    .then(() => {
      const popUp = document.querySelectorAll(".movie__card");

      for (let i = 0; i < popUp.length; i++) {
        popUp[i].addEventListener("click", (e) => {
          console.log(e.target);
          const name = "superhero";
          alert(name);
        });
      }
    })
    .catch((err) => console.log(err));
}

let scrollAmount = 0;
prevButton.style.display = "none";
nextButton.addEventListener("click", (e) => {
  prevButton.style.display = "initial";
  movieCard.scrollTo({
    left: (scrollAmount += scrollPerClick),
    behavior: "smooth",
  });
  if (scrollAmount > scrollPerClick * 4) {
    nextButton.style.display = "none";
  }
});

prevButton.addEventListener("click", (e) => {
  nextButton.style.display = "initial";
  movieCard.scrollTo({
    left: (scrollAmount -= scrollPerClick),
    behavior: "smooth",
  });
  if (scrollAmount < 20) {
    scrollAmount = 0;
    prevButton.style.display = "none";
  }
});
