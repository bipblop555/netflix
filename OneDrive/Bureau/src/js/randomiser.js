const TableauGenre = {
  Action: "28",
  Comedy: "35",
  Drama: "18",
  Adventure: "12",
  Fantasy: "14",
  Horror: "27",
  Music: "10402",
  Mystery: "9648",
  Romance: "10749",
  "Science-Fiction": "878",
  Thriller: "53",
  War: "10752",
  Western: "37",
  Documentary: "99",
  Crime: "80",
};
const ToutlesGenresAleatoires = document.querySelectorAll("#BroButton");

const $response = document.querySelector("#response");
const $buttonSurprise = document.querySelector("#filmSurprise");
let $randomid = function () {
  let random = Math.floor(Math.random() * 500);
  console.log(random);
  return random;
};
let $randomnum = function () {
  let randon = Math.floor(Math.random() * 20);
  console.log(randon);
  return randon;
};
let genre;

for (let i = 0; i < ToutlesGenresAleatoires.length; i++) {
  ToutlesGenresAleatoires[i].addEventListener("click", () => {
    console.log(ToutlesGenresAleatoires[i].innerText);
    genre = ToutlesGenresAleatoires[i].innerText;
    console.log(genre);
  });
}

function getresponseDetails(response) {
  fetch(
    `${API_URL}/discover/movie?api_key=${API_KEY}&page=${$randomid()}&with_genres=${
      TableauGenre[genre]
    }`
  )
    .then((response) => response.json())
    .then((response) => {
      let randomget = $randomnum();
      console.log(randomget);

      let $mainContainer = document.createElement("div");
      let $movieTitle = document.createElement("h2");
      let $movieImage = document.createElement("img");
      let $movieText = document.createElement("p");
      //let $movieMoreInfo = document.createElement("button");

      $mainContainer.classList.add("main-container");
      $movieImage.classList.add("main-container-image");
      $movieText.classList.add("main-container-text");
      //$movieMoreInfo.classList.add("btn-more-information");

      $main.appendChild($mainContainer);
      $mainContainer.appendChild($movieTitle);
      $mainContainer.appendChild($movieImage);
      $mainContainer.appendChild($movieText);
      $movieTitle.innerHTML = `
        <h2>${response.results[randomget].title}</h2>`;

      $movieImage.setAttribute(
        "src",
        IMAGES_URL + response.results[randomget].poster_path
      );
      $movieText.textContent = response.results[randomget].overview;
      //$movieMoreInfo.innerText = "More information";
      $movieImage.addEventListener("click", function () {
        $player.classList.add("player-is-active");
        $playerTitle.innerText = response.results[randomget].title;
        $playerSynopsis.innerText = response.results[randomget].overview;
        $playerImage.setAttribute(
          "src",
          IMAGES_URL + response.results[randomget].poster_path
        );
        $playerLanguage.innerText =
          "langue d'origine : " + response.results[randomget].original_language;
        $playerReleaseDate.innerText =
          "date de sortie : " + response.results[randomget].release_date;
        $blur.classList.remove("is-hidden");
      });
    });
}
$buttonSurprise.addEventListener("click", function () {
  getresponseDetails();
  $main.innerHTML = "";
  $blur.classList.add("is-hidden");
  $wholeMenu.classList.toggle("menu-burger-is-active");
});
