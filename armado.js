// http://demo6292426.mockable.io/ramMemory
// http://demo6292426.mockable.io/processors
"use strict";
class Data {
  constructor() {}//ES necesario?
  requestData(url, defaultDAta) {
    return new Promise((resolve) => {
      let myRequest = new XMLHttpRequest();
      myRequest.addEventListener("load", function () {
        //meter un switch para fresear
        if (status === 404) {
          console.error("Ha ocurrido un error :( ");
        } else {
          resolve(JSON.parse(this.responseText).data);
        }
      });
      myRequest.open("GET", url);
      myRequest.send();
    });
  }
}

