let left_btn = document.getElementsByClassName("fa-chevron-left")[0];
let right_btn = document.getElementsByClassName("fa-chevron-right")[0];
let cards = document.getElementsByClassName("cards")[0];
let search = document.getElementsByClassName("search")[0];
let search_input = document.getElementById("search_input");
let series = document.getElementById("series");
let movies = document.getElementById("movies");
let videoContainer = document.getElementById("video");

right_btn.addEventListener("click", () => {
  cards.scrollLeft += 140;
});
left_btn.addEventListener("click", () => {
  cards.scrollLeft -= 140;
});

// to show all movie data on home
let movie_data = "movie.json";


fetch(movie_data)
  .then((Response) => Response.json())
  .then((data) => {
    data.forEach((ele, i) => {
      let { name, imdb, date, sposter, bposter, genre, url } = ele;
      let card = document.createElement("a");
      card.classList.add("card");
      card.href = `movie.html?movie=${i}`; // Include the movie index in the URL
      card.innerHTML = `
        <img src="${sposter}" alt="${name}" class="poster">
        <div class="rest_card">
          <img src="${bposter}" alt="${name}">
          <div class="cont">
            <h4>${name}</h4>
            <div class="sub">
              <p>${genre} ${date}</p>
              <h3><span>IMDB</span><i class="fa fa-star"></i>${imdb}</h3>
            </div>
          </div>
        </div>
      `;
      cards.appendChild(card);
    });


    document.getElementById("title").innerText = data[0].name;
    document.getElementById("gen").innerText = data[0].genre;
    document.getElementById("date").innerText = data[0].date;
    document.getElementById("rate").innerText = data[0].imdb;
    document.getElementById("type").innerText = data[0].type;
    document.getElementById("short-intro").innerText = data[0].intro;
    const bg_vid = document.createElement("video");
    bg_vid.autoplay = true;
    bg_vid.muted = true;
    bg_vid.loop = true;
    bg_vid.src = data[0].trailer;
    videoContainer.appendChild(bg_vid);

    // search movie from search bar and to show movie in the div
    data.forEach((ele) => {
      let { name, imdb, date, sposter, genre, url } = ele;
      let card = document.createElement("a");
      card.classList.add("card");
      card.href = url;
      card.innerHTML = `
        <img src="${sposter}" alt="${name}">
        <div class="cont">
          <h3>${name}</h3>
          <p>${genre}, ${date} ,<span>IMDB</span>${imdb}</p>
        </div>
        `;
      search.appendChild(card);
    });

    // search filter

    search_input.addEventListener("keyup", () => {
      let filter = search_input.value.toUpperCase();
      let a = search.getElementsByTagName("a");

      for (let index = 0; index < a.length; index++) {
        let b = a[index].getElementsByClassName("cont")[0];
        let Textvalue = b.textContent || b.innerText;
        if (Textvalue.toUpperCase().indexOf(filter) > -1) {
          a[index].style.display = "flex";
          search.style.visibility = "visible";
          search.style.opacity = 1;
        } else {
          a[index].style.display = "none";
        }
        if (search_input.value == 0) {
          search.style.visibility = "hidden";
          search.style.opacity = 0;
        }
      }
    });

    let video = document.getElementsByTagName("video")[0];
    let play = document.getElementById("play");
    play.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        play.innerHTML = `Play  <i class="fa fa-pause"></i>`;
      } else {
        video.pause();
        play.innerHTML = `Watch  <i class="fa fa-play"></i>`;
      }
    });

    // to only series when click
    series.addEventListener("click", () => {
      cards.innerHTML = "";
      let series_array = data.filter((ele) => {
        return ele.type == "series";
      });
      series_array.forEach((ele, i) => {
        let { name, imdb, date, sposter, bposter, genre, url } = ele;
        let card = document.createElement("a");
        card.classList.add("card");
        card.href = url;
        card.innerHTML = `
          <img src="${sposter}" alt="${name}" class="poster">
          <div class="rest_card">
            <img src="${bposter}" alt="${name}">
            <div class="cont">
              <h4>${name}</h4>
              <div class="sub">
                <p>${genre} ${date}</p>
                <h3><span>IMDB</span><i class="fa fa-star"></i>${imdb}</h3>
              </div>
            </div>
          </div>
        `;
        cards.appendChild(card);
      });
    });

    // to show only movies
    movies.addEventListener("click", () => {
      cards.innerHTML = "";
      let movie_array = data.filter((ele) => {
        return ele.type == "movie";
      });
      movie_array.forEach((ele, i) => {
        let { name, imdb, date, sposter, bposter, genre, url } = ele;
        let card = document.createElement("a");
        card.classList.add("card");
        card.href = url;
        card.innerHTML = `
          <img src="${sposter}" alt="${name}" class="poster">
          <div class="rest_card">
            <img src="${bposter}" alt="${name}">
            <div class="cont">
              <h4>${name}</h4>
              <div class="sub">
                <p>${genre} ${date}</p>
                <h3><span>IMDB</span><i class="fa fa-star"></i>${imdb}</h3>
              </div>
            </div>
          </div>
        `;
        cards.appendChild(card);
      });
    });
  });
