
import Cards from './Game.js'
import api from './Api.js'


class Timer {
  constructor() {
    this.clock = document.getElementById("clock");
  }
  start() {
    let second = 0;
    let minute = 0; 
    let hour = 0;
    this.interval = setInterval(function() {
      let strMin = (minute< 10) ? '0'+minute : ''+minute;
      let strSec = (second< 10) ? '0'+second : ''+second;
      this.clock.innerHTML = "0" + hour + ":" + strMin + ":" + strSec;
      second++;
      if(second == 60){
        minute++;
        second=0;
      }
      if(minute == 60){
        hour++;
        minute = 0;
      }
    },1000);
  }
  stop() {
    clearInterval(this.interval);
  }
}
let timer = new Timer();
export default timer;

class Main {
  constructor() {
    this.clock = document.getElementById("clock");
    this.dBase = [];
  }
  events() {
  	document.body.addEventListener('keydown', event => {
      if (event.key == 'Enter') {
        document.querySelector('.login').style.opacity = 0;
        document.querySelector('.login').style.top = 0;
        document.querySelector('.login').style.height = 0;
      	let name = document.querySelector('input[type="text"]').value;
      	localStorage.setItem("name", name);
     	 	this.dBase.push({name: name, result: 0});
      }
    });

  	document.getElementById('start').addEventListener('click', function() {
      document.getElementById('content').innerHTML = "";
      let data = api.request();
      data.then(data => {
        let images = data[0];        
        let width = (data[1].width%2) ? (data[1].width+1) : data[1].width;
        let height = (data[1].height%2) ? (data[1].height+1) : data[1].height;        
        let size = {width: width, height: height};
        let Game = new Cards(images, size); 
        document.getElementById('size').innerHTML =  size.width + ' : ' + size.height;
        timer.stop();
        timer.start();
        setTimeout(()=>{
          Game.render();
        }, 2000);
      });
    });
  }
  render() {
    this.clock.innerHTML = "Timer";
    this.events();
  }
}
let main = new Main();
main.render();