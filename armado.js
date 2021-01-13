// http://demo6292426.mockable.io/ramMemory
// http://demo6292426.mockable.io/processors
"use strict";
class Data {
  constructor() {} //ES necesario?
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

class DOM {
  static createNode(tag) {
    return document.createElement(tag);
  }
  static addEventListener(element, nameEvento, handler, context) {
    element.addEventListener(nameEvento, handler);
  }
  static appendChild(mainNode, node) {
    mainNode.appendChild(node);
  }
  static setAttribute(node, nameAttribute, value) {
    node.setAttribute(nameAttribute, value);
  }
  static setTextContent(node, textContent) {
    node.textContent = textContent;
  }
}

class PC{
  body
  request
  ramSelected
  processorSelected
  processors
  rams 
  constructor(){
    this.body=document.body
    this.request=new Data()
    this.ramSelected=undefined;
    this.processorSelected=undefined;
  }
  inicia(){
    const div = //metodo para crear div
  }
}