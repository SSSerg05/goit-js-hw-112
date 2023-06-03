import Gallery from './Gallery.js';
import GenreList from './GenreList.js';

// elements in html
const refs = {
  out: document.querySelector(".gallery"),
}

const movies = new Gallery({
  selector: ".gallery",
  url: '/trending/movie/day',
  query: 'language=en'
});

movies.onMarkup();



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
