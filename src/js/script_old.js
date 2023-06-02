import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import Notiflix from 'notiflix';

const axios = require("axios/dist/axios.min.js"); // node
//const axios = require('axios');
const PER_PAGE = 40

const refs = {
  form: document.querySelector(".search-form"),
  out: document.querySelector(".gallery"),
  count: document.querySelector(".count"),
  btnNext: document.querySelector(".load-more"),
}

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", onFormInput);
refs.btnNext.addEventListener("click", onViewNext);

refs.btnNext.classList.add("no-display")
let nextPage = 1;
let valueForm = '';

const lightbox = new SimpleLightbox(".gallery a", { /* options */ });
lightbox.on('show.simplelightbox', function () {
  // Do something…
  lightbox.captionDelay = 250;
});

function onFormInput() { 
  refs.btnNext.classList.add("no-display")
}


// username u_ht1qf13txz
// user_id:36214966 
// key 36214966-0d101d8d6f502ad642532aad3
function onFormSubmit(event) { 
  event.preventDefault();

  if (valueForm !== '') { 
    nextPage = 1
    refs.btnNext.classList.add("no-display")
  }
    
  // Optionally the request above could also be done as
  //https://pixabay.com/api/
  axios.get('https://pixabay.com/api/', {
    params: {
      key: '36214966-0d101d8d6f502ad642532aad3',
      q: valueForm,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: nextPage,
      per_page: PER_PAGE,
    }
  })
  .then(function (response) {
    refs.btnNext.classList.remove("no-display")

    let str = '';
    response.data.hits.forEach(item => {
      str += mask(item);
    });

    refs.out.innerHTML = str;
    lightbox.refresh();

    nextPage++;
    valueForm = refs.form.elements.searchQuery.value.trim();

    refs.count.innerHTML = viewCountImages(response.data);
    Notiflix.Notify.success("Hooray! We found totalHits images.")    

    const { height: cardHeight } = refs.out.firstElementChild.getBoundingClientRect();
    console.dir(cardHeight )

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  })
  .catch(function (error) {
    console.log(error);
  });
 
}

// block for one image-card
function mask(obj) { 
  
  const {
    webformatURL : smallImg,
    largeImageURL: fullImg,
    tags: alt,
    likes,
    views,
    comments,
    downloads } = obj;
  
  return `
  <a href="${fullImg}">
    <div class="photo-card">
      <img class="image"
        src="${smallImg}" 
        alt="{${alt}}" 
        loading="lazy"
        title="{${alt}}"/>

      <div class="info">
        <p class="info-item">
         <b>Likes: </b>${likes}
        </p>
        <p class="info-item">
          <b>Views: </b>${views}
        </p>
        <p class="info-item">
          <b>Comments: </b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads: </b>${downloads}
        </p>
      </div>
    </div>
  </a>`
}

function onViewNext() { 
 
  axios.get('https://pixabay.com/api/', {
    params: {
      key: '36214966-0d101d8d6f502ad642532aad3',
      q: refs.form.elements.searchQuery.value.trim(),
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: nextPage,
      per_page: PER_PAGE,
    }
  })
  .then(function (response) {
    nextPage++;

    let str = '';
    response.data.hits.forEach(item => {
      str += mask(item);
    });

    refs.out.innerHTML = str;
    lightbox.refresh();
    refs.count.innerHTML = viewCountImages(response.data);
    if ((nextPage-1) * PER_PAGE > response.data.totalHits) { 
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
      refs.btnNext.classList.add("no-display")
    }
  })
  .catch(function (error) {
    console.log(error);
  });
 
}


function viewCountImages(obj) { 
  return `
  <div class="counts">
    <p>Images: ${(nextPage - 2) * PER_PAGE + 1} - ${(nextPage - 1) * PER_PAGE} / Total: ${obj.totalHits }
  </div>`
}