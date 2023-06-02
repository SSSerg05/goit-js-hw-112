import Gallery from './Gallery.js';

// elements in html
const refs = {
  out: document.querySelector(".gallery"),
}

const movies = new Gallery();
onMarkup();

/// trending/movie/day
//
async function getNewCards() {
  try {
    const cards = await movies.getMovies('/trending/movie/day','language=en-US');

    return cards.reduce(
         (acc, data) => acc + createCardGallery(data), "");

  } catch (error) {
    throw new Error(error);
  }
}

// View Next card gallery
//
async function onMarkup() { 
  try {
    const markup = await getNewCards();
    updateGallery(markup);

    return markup;
  } catch (error) {
    onError(error);  
  }
}

function createCardGallery( data ) {
  const url = 'https://image.tmdb.org/t/p/w300'
  return `
    <div class="movie-card">
      <img class="image"
        src="${url + data.backdrop_path}" 
        alt="{${data.original_title}}" 
        loading="lazy"
        title="{${data.original_title}}"/>

      <div class="info">
        <p class="info-item">
         <b>Title: </b>${data.vote_average}
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

// Класс + ключ
const MovieDB = require('moviedb')('347a4b587b74ee2a22d09434547acda6');

//'https://api.themoviedb.org/3/search/movie?
//  query = Alien 
//  & include_adult=false 
//  & language=en - US 
//  & page=1 
//  & region=France 
//  & year=2022'
// Пошук списку фільмів по назві
MovieDB.searchMovie({ query: 'Zoolander', page: 3 }, (err, res) => {
  console.log('query: Zoolander');
  console.log(res);
  console.log('---------------');
});

MovieDB.searchMovie({ query: 'Alien' }, (err, res) => {
  console.log('query: Alien');
  console.log(res);
  console.log('---------------');
});

// // Нові очікувані фільми
MovieDB.miscUpcomingMovies({page: 2}, (err, res) => {
  console.log('UpcomingMovie');
  console.log(res);
  console.log('---------------');
});

// Останні фільми
MovieDB.miscLatestMovies({}, (err, res) => {
  console.log('LatesMovie');
  console.log(res);
  сonsole.log('---------------');
});

// // список жанрів
MovieDB.genreMovieList({}, (err, res) => {
  console.log('Genre');
  console.log(res);
    console.log('---------------');
})

// // Фільми по конкретному жанру
MovieDB.genreMovies({ id: 14, page: 5 }, (err, res) => {
  console.log(`Movies for Genry.id:14`);  
  console.log(res);
  console.log('---------------');
});


// //https://api.themoviedb.org/3/configuration/countries
// Країни
MovieDB.configurationCountries({ }, (err, res) => {
  console.log(`Countries`);  
  console.log(res);
  console.log('---------------');
});


// // інформація по фільму за id
MovieDB.movieInfo({ id: 840326 }, (err, res) => {
  console.log(res.title, res.id);
  console.log(res);
  console.log('---------------');
});

// // Трендові фільми: id = 'day' / 'week'
MovieDB.trendingMovie({ id: 'day' }, (err, res) => {
  console.log("trendingMovie");
  console.log(res);
  console.log('---------------');
});

// Составний запит
MovieDB
  .searchMovie({ query: 'Zoolander' }, (err, res) => {
    console.log('Составний запит');
    console.log(res);
  })
  .movieInfo({ id: 123 }, (err, res) => {
    console.log(res);
    console.log('---------------');
  });

// setting french as default language...
//tmdb.setLanguage('uk');
// and resetting to english.
//tmdb.resetLanguage();

//want, but no used
//https://infinite-scroll.com/extras.html#module-loaders

// values
// const PER_PAGE = 40;
// let nextPage = 1;
// let valueForm = '';
// let outGallery = '';

// elements in html
// const refs = {
//   form: document.querySelector(".search-form"),
//   out: document.querySelector(".gallery"),
//   count: document.querySelector(".count"),
// }

// const newGallery = new Gallery();
// const loadMoreBtn = new Buttons({
//   selector: ".btn-load-more",
//   name: "Load More",
//   nameDisable: "Loading...",
//   isHidden: true,
// });

// const searchBtn = new Buttons({
//   selector: ".btn-search",
//   name: "Search",
//   nameDisable: "Search",
//   isHidden: false,
// })

// // events
// refs.form.addEventListener("submit", onFormSubmit);
// refs.form.addEventListener("input", onFormInput);

// loadMoreBtn.button.addEventListener('click', onViewNext);

// // add slider with modal window
// const lightbox = new SimpleLightbox(".gallery a", { /* options */ });
// lightbox.on('show.simplelightbox', function () {
//   // Do something…
//   lightbox.captionDelay = 250;
// });


// // if change input - dont show button
// //
// function onFormInput(event) {
//   const value = refs.form.elements.searchQuery.value.trim();
  
//   if (value === "") {
//     throw new Error("No value in input");
//     return
//   }

//   searchBtn.enable();
//   loadMoreBtn.hide();

//   newGallery.searchQuery = value;

//   clearGallery()
// }


// // user_id:36214966 
// // key 36214966-0d101d8d6f502ad642532aad3
// // username u_ht1qf13txz
// //
// // show gallery
// function onFormSubmit(event) { 
//   const value = newGallery.searchQuery;
  
//   searchBtn.disable();

//   event.preventDefault();

//   if (value === '') {
//     throw new Error("No value in input");
//     return
//   }

//   if (newGallery.page >= 1) {
//     loadMoreBtn.show();
//   }

//   onViewNext()
// }

// // getCardPictures
// //
// async function getNewPictures() {
//   try {
//     const cards = await newGallery.getPictures();
//     const { total, perPage, page } = newGallery;

//     if (!cards) {
//       loadMoreBtn.disable();
//       loadMoreBtn.hide();
//       return "";
//     }

//     if (cards.length === 0) {
//       throw new Error("No data");
//       return;
//     }

//     if (page - 1 === 1) {
//       Notiflix.Notify.success(`Hooray! We found ${total} images.`);
//     }

//     if (total < perPage || total < (page - 1) * perPage) {
//       loadMoreBtn.hide();
//       loadMoreBtn.disable();
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//     }

//     return cards.reduce(
//          (acc, data) => acc + createGallery(data), "");

//   } catch (error) {
//     loadMoreBtn.hide();
//     loadMoreBtn.disable();
//     onError(error);
//   }

// }

// // block for one image-card
// //
// function createGallery(data) {

//   if (!data) { 
//     return
//   }

//   const {
//     webformatURL: smallImg,
//     largeImageURL: fullImg,
//     tags: alt,
//     likes,
//     views,
//     comments,
//     downloads } = data;
  
//   return `
//   <a href="${fullImg}">
//     <div class="photo-card">
//       <img class="image"
//         src="${smallImg}" 
//         alt="{${alt}}" 
//         loading="lazy"
//         title="{${alt}}"/>

//       <div class="info">
//         <p class="info-item">
//          <b>Likes: </b>${likes}
//         </p>
//         <p class="info-item">
//           <b>Views: </b>${views}
//         </p>
//         <p class="info-item">
//           <b>Comments: </b>${comments}
//         </p>
//         <p class="info-item">
//           <b>Downloads: </b>${downloads}
//         </p>
//       </div>
//     </div>
//   </a>`
// }

// // update out count page
// //
// function updateTotal() {

//   if (newGallery.total === 0) {
//     refs.count.innerHTML = "";
//   } else {
//     refs.count.innerHTML = viewCountImages();
//   }
// }

// // clear out
// //
// function clearGallery() { 

//   newGallery.resetPage();

//   refs.out.innerHTML = "";
//   refs.count.innerHTML = "";
// }


// function onError(error) { 

//   loadMoreBtn.disable();
//   loadMoreBtn.hide();
//   Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//   console.log(error);
// }


// // View Next card gallery
// //
// async function onViewNext() { 

//   loadMoreBtn.disable();
  
//   try {
//     const markup = await getNewPictures();
      
//     loadMoreBtn.enable()
//     updateGallery(markup);
//     updateTotal();

//     return markup;
//   } catch (error) {
//     onError(error);  
//   }
// }

// // Show count images
// //
// function viewCountImages() { 
//   const countImages = (newGallery.page - 1) * newGallery.perPage;
//   const totalImages = countImages > newGallery.total ? newGallery.total : countImages;

//   return `
//   <div class="counts">
//     <p>Add pages #${newGallery.page - 1}. Images: 1 - ${totalImages} / Total: ${ newGallery.total }
//   </div>`
// }
