
class Api {
  constructor() {
    this.url = 'https://ec-test-react.herokuapp.com/';
    this.images = [];
    this.size = {};
  }
  requestSize() {
    return fetch(this.url + 'api/v1/items')
    .then(data => data.json());
  }
  requestImages() {
    return fetch(this.url + 'api/v1/pictures').then(data => data.json());
  }
  request() {
    return Promise.all([this.requestImages(), this.requestSize()])
    .then(data =>  data);
  }
}
let api = new Api();
export default api;
/*
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
  }
  render() {
    this.clock.innerHTML = "Timer";
    document.getElementById('start').addEventListener('click', function() {
      document.getElementById('content').innerHTML = "";
      let ff = api.request();
      ff.then(data => {
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
}
let main = new Main();
main.render();
*/