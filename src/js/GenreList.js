const axios = require("axios/dist/axios.min.js"); // node
import Notiflix from 'notiflix';

// Класс + ключ
const API_KEY = '347a4b587b74ee2a22d09434547acda6'
const URL = 'https://api.themoviedb.org/3';

// передаємо класс селектору куди будемо вставляти лист жанрів
export default class GenreList {
  constructor({selector, url, query}) {
    this.select = this.getSelect(selector);
    this.genres = [];
    this.t = [{id: 1, name: 'tt'}, {id: 14, name: 'rrtt'}]

    this.url = URL + url;
    this.params = { 
      api_key: API_KEY,
      query: query, ///'language=en',
    };
  }

  getSelect(selector) {
    return document.querySelector(selector);
  }

  // Отримати масив об'єктів cпискe жанрів
  async getGenreList() {
    const params = new Object(this.params);

    const {data} = await axios.get(this.url, { params });

    if (this.genres.length === 0) {
      data.genres.forEach(e => this.genres.push(e))
    }
    
    // console.log('genres',this.genres);

    return data.genres; 
  }

  // створити html-розмітку для всіх строк селекту
  async createGenreList() {
    try {

      //--url 'https://api.themoviedb.org/3/genre/movie/list?language=en'
      const data = await this.getGenreList();
     
      return data.reduce(
           (acc, data) => {
            return acc + this.createGenreSelectRow(data)
          }, "");
    
    } catch (error) {
      this.onError(error);  
    }
  }

  // cтворення html-строки для селекту
  createGenreSelectRow(data){
    return `<option value="${data.id}">${data.name}</option>`;
  }

  // сформувати селект
  async outMarkupGenreList() { 
    try {
      const markup = await this.createGenreList();
      this.update(markup);
  
      return markup;
    } catch (error) {
      this.onError(error);  
    }
  }

  // записати дані у селект
  update(data) {
    if (!data) { 
      return
    }
      
    this.select.insertAdjacentHTML("beforeend", data);
  }

  //  findIdtoName(aGenre, genreList) {
  //   console.log(this.genres);
  //   this.genres.forEach(item => console.log(item));
  //   this.t.forEach(item => console.log(item));

  //   const result = aGenre.map(item => {
  //     console.log('aGenry',item);
  //     console.log('this.genres',this.genres);

  //     const obj = this.genres.find(el => el.id === item);
  //     console.log(obj);
  //     return obj ? obj.name : null;
  //   })

    // const result = await aGenre.filter(item =>
    //   this.genres.find(element => {
    //     if (element.id === item){
    //       return element.name
    //     }
    //   }))

  //   return result;
  // }

  // якщо помилка
  onError(error){
    console.log(error);
  } 
      
}
