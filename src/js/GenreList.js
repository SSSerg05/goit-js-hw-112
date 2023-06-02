const axios = require("axios/dist/axios.min.js"); // node
import Notiflix from 'notiflix';

// Класс + ключ
const API_KEY = '347a4b587b74ee2a22d09434547acda6'
const URL = 'https://api.themoviedb.org/3';

// передаємо класс селектору куди будемо вставляти лист жанрів
export default class GenreList {
  constructor({selector}) {
    this.select = this.getSelect(selector);

    this.url = URL + '/genre/movie/list';
    this.params = { 
      api_key: API_KEY,
      query: "",
    };
  }

  getSelect(selector) {
    return document.querySelector(selector);
  }

  // Отримати масив об'єктів cпискe жанрів
  async getGenreList() {
    this.params.query = 'language=en'
    const params = this.params;
    const {data} = await axios.get(this.url, { params });
    
    console.log(data);

    return data.genres; 
  }

  // створити html-розмітку для всіх строк селекту
  async createGenreList() {
    try {
      //--url 'https://api.themoviedb.org/3/genre/movie/list?language=en'
      const data = await this.getGenreList();
    
      return data.reduce(
           (acc, data) => acc + this.createGenreSelectRow(data), "");
    
    } catch (error) {
      this.onError(error);  
    }
  }

  // cтворення html-строки для селекту
  createGenreSelectRow(data){
    return `<option value="${data.id}">${data.name}</option>`;
  }

  async onMarkupGenreList() { 
    try {
      const markup = await this.createGenreList();
      this.update(markup);
  
      return markup;
    } catch (error) {
      this.onError(error);  
    }
  }

  update(data) {
    if (!data) { 
      return
    }
      
    this.selector.insertAdjacentHTML("beforeend", data);
  }

  onError(error){
    console.log(error);
  } 
      
}
