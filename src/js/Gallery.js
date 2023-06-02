const axios = require("axios/dist/axios.min.js"); // node
import Notiflix from 'notiflix';

// Класс + ключ
const API_KEY = '347a4b587b74ee2a22d09434547acda6'
const URL = 'https://api.themoviedb.org/3';

export default class Gallery {
  constructor() {
    this.url = "";
    this.params = { 
      api_key: API_KEY,
      page: this.page,
      query: "",
    };
    this.page = 1;
    this.totalPage = 0;
    this.totalResults = 0;
  }

  async getMovies(query, pathUrl) {
    this.url = (!pathUrl) ? this.url : URL + pathUrl;
    this.params.query = query;

    const params = this.params;
    const { data }  = await axios.get(this.url, { params });

    this.incrementPage();
    
    this.totalPage = data.total_page;
    this.totalResult = data.total_result;

    return data.results; 
  }

  incrementPage() {
    this.page++;
  }

  resetPage() { 
    this.page = 1;
    this.totalPage = 0;
    this.totalResult = 0;
  }

}