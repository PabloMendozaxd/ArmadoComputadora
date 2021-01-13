// http://demo6292426.mockable.io/ramMemory
// http://demo6292426.mockable.io/processors
'use strict'
class DataRequest {
  constructor(api) {
    this.api = "http://demo6292426.mockable.io/" + api;
  }
  promiseRequest() {
    return new Promise((resolve) => {
      let myRequest = new XMLHttpRequest();
      myRequest.addEventListener("load", function () {
        resolve(JSON.parse(this.responseText));
      });
      myRequest.open("GET", this.api);
      myRequest.send();
    })
  }

  
}

class Components{
  constructor(){
    this.processors = new DataRequest('processors').promiseRequest().then((infoGotten) => {return infoGotten.data})
    this.ramMEmory = new DataRequest('ramMemory').promiseRequest().then((infoGotten) => {console.log(infoGotten.data)})
  }
  processorsSelect(){
    console.log(this.processors)
  }
    
  }

  
// const hola = new DataRequest('processors').promiseRequest().then((infoGotten) => {
//   console.log(infoGotten.data[1])
// })
    