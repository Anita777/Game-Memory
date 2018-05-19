
import timer from './App.js';
import main from './App.js';

export default class Cards {
  constructor(images, size) {
    this.size = size;
    this.img = images;
    this.images = [];
    this.visibleCards = [];
    this.matchCards = 0;
    this.url = 'https://ec-test-react.herokuapp.com/';
  }
  generateCardImages(img){
    for (let i = 0; i < this.size.width * this.size.height / 2; i++) {
      this.images[i] = img[i % img.length];
    };
    this.images = this.images.concat(this.images);
    this.shuffle(this.images);
  }
   shuffle(arr) {
    for (let i = arr.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
  }
  createTable(size) {
    let game = document.getElementById('content');
    let str = "";
    for (let i = 0; i < size.height; i++) {
      str += "<div class='rows'>";
      for (let j = 0; j < size.width; j++) {
        str += `<div class='column'></div>`;
      }
      str += "</div>";
    }
    game.innerHTML += str;
    let divs = document.querySelectorAll('.column')
    for (let i=0; i < divs.length; i++) {
      divs[i].innerHTML += `<img src=${this.url}${this.images[i]}>`;
      divs[i].addEventListener('click', this.handleCardClick.bind(this))
    }
  }
  handleCardClick(event) {
    if (!event.target.classList.contains('show') && this.visibleCards.length < 2) {
      event.target.classList.toggle('show');
      this.visibleCards.push(event.target);
      if (this.visibleCards.length === 2) {
        this.checkMatch();
      }
    }
  }
  checkMatch() {
    if (this.visibleCards[0].getAttribute('src') === this.visibleCards[1].getAttribute('src')) {
      this.visibleCards =[];
      this.matchCards += 2;
      if (this.matchCards === this.size.width * this.size.height) {
        timer.stop();
        this.winner(); 
      }
    } else {
      setTimeout(this.unMatched.bind(this), 1500);
    }
  }
  unMatched() {
    this.visibleCards[0].classList.toggle('show');
    this.visibleCards[1].classList.toggle('show');
    this.visibleCards = [];
  }
  winner() {
    setTimeout(()=>{
      let winner = localStorage.getItem("name");
      document.getElementById('content').innerHTML = `<h1> ${winner} - WINNER !!!!</h1>`;
    }, 1000);
  }
  render() {
    this.generateCardImages(this.img);
    this.createTable(this.size);
  }
}
