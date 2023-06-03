import Gallery from './Gallery.js';
import GenreList from './GenreList.js';

// elements in html
const refs = {
  out: document.querySelector(".gallery"),
}

const movies = new Gallery();
//onMarkup();

/// trending/movie/day || week
//
// cписок фільмів у тренді за день \ неділю
async function getNewCardsTrending() {
  try {
    // day -https://api.themoviedb.org/3/trending/movie/day
    // week - https://api.themoviedb.org/3/trending/movie/week
    const url = '/trending/movie/day';
    const query = 'language=en-US'
    const cards = await movies.getMoviesList(query, url);

    return cards.reduce(
         (acc, data) => acc + createCardGallery(data), "");

  } catch (error) {
    onError(error);  
  }
}

// View Next card gallery
//
async function onMarkup() { 
  try {

    const markup = await getNewCardsTrending();
    updateGallery(markup);
    return markup;

  } catch (error) {
    onError(error);  
  }
}

// Шаблон картки для фільму
//
function createCardGallery( data ) {
  const url = 'https://image.tmdb.org/t/p/w300';
  return `
    <div class="movie-card">
      <img class="image"
        src="${url + data.backdrop_path}" 
        alt="{${data.original_title}}" 
        loading="lazy"
        title="{${data.original_title}}"/>

      <div class="info">
        <p class="info-item">
         <b>Title: </b>${data.original_title}
        </p>
        <p class="info-item">
          <b>Text: </b>${data.overview}
        </p>
        <p class="info-item">
          <b>Release Date: </b>${data.release_date}
        </p>
        <p class="info-item">
          <b>Vote: </b>${data.vote_average}
        </p>
      </div>
    </div>`
}

//=========================
//

const genre = new GenreList({
  selector: ".select",
  url: "/genre/movie/list",
  query: 'language=en'
});

genre.outMarkupGenreList();


const t = async() => {
  let result = await genre.getList();
  return result;
}

// преоразовати усі категорії які є у фільмі з id на назву
async function genresIdToName() {
  try {
    const list = await genre.convertId_to_Name([14,28,12]);
    console.log(list);
    return list;
  } catch (error) {
    onError(error)
  }

}
genresIdToName()


function onError(error) { 
  console.log(error);
}

// // update out
// //
function updateGallery(data) {
  if (!data) { 
    return
  }
    
  refs.out.insertAdjacentHTML("beforeend", data);
}

/// ================================

// // Класс + ключ
// const MovieDB = require('moviedb')('347a4b587b74ee2a22d09434547acda6');

// //'https://api.themoviedb.org/3/search/movie?
// //  query = Alien 
// //  & include_adult=false 
// //  & language=en - US 
// //  & page=1 
// //  & region=France 
// //  & year=2022'
// // Пошук списку фільмів по назві
// MovieDB.searchMovie({ query: 'Zoolander', page: 3 }, (err, res) => {
//   console.log('query: Zoolander');
//   console.log(res);
//   console.log('---------------');
// });

// MovieDB.searchMovie({ query: 'Alien' }, (err, res) => {
//   console.log('query: Alien');
//   console.log(res);
//   console.log('---------------');
// });

// // // Нові очікувані фільми
// MovieDB.miscUpcomingMovies({page: 2}, (err, res) => {
//   console.log('UpcomingMovie');
//   console.log(res);
//   console.log('---------------');
// });

// // // список жанрів
// MovieDB.genreMovieList({}, (err, res) => {
//   console.log('Genre');
//   console.log(res);
//   console.log('---------------');
// })

// // // Фільми по конкретному жанру
// MovieDB.genreMovies({ id: 14, page: 5 }, (err, res) => {
//   console.log(`Movies for Genry.id:14`);  
//   console.log(res);
//   console.log('---------------');
// });


// // //https://api.themoviedb.org/3/configuration/countries
// // Країни
// MovieDB.configurationCountries({ }, (err, res) => {
//   console.log(`Countries`);  
//   console.log(res);
//   console.log('---------------');
// });


// // // інформація по фільму за id
// MovieDB.movieInfo({ id: 840326 }, (err, res) => {
//   console.log(res.title, res.id);
//   console.log(res);
//   console.log('---------------');
// });

// // // Трендові фільми: id = 'day' / 'week'
// MovieDB.trendingMovie({ id: 'day' }, (err, res) => {
//   console.log("trendingMovie");
//   console.log(res);
//   console.log('---------------');
// });
