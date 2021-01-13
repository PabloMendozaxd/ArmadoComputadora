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

class PC {
  body;
  request;
  ramSelected;
  processorSelected;
  processors;
  rams;
  constructor() {
    this.body = document.body;
    this.request = new Data();
    this.ramSelected = undefined;
    this.processorSelected = undefined;
  }
  inicia() {
    const DIV = this.createDiv();
    this.createEncabezado("Armado de computadora", DIV);
    const BUTTON_RAM = this.createButtonWithText("Memorias RAM");
    const BUTTON_PROCESSORS = this.createButtonWithText("Procesadores");
    DOM.addEventListener(BUTTON_RAM, "click", () => {
      this.setRams(
        this.request.requestData("http://demo6292426.mockable.io/ramMemory")
      );
    });
    DOM.addEventListener(BUTTON_PROCESSORS, "click", () => {
      this.setRams(
        this.request.requestData("http://demo6292426.mockable.io/processors")
      );
    });
    DOM.appendChild(DIV, BUTTON_RAM);
    DOM.appendChild(DIV, BUTTON_PROCESSORS);
    DOM.appendChild(this.body, DIV);
  }
  setRams(promise) {
    promise.then((data) => {
      this.createEncabezado("Selecciona una Memoria RAM");
      this.rams = data.map((item, index) => {
        item.type = "ram";
        return this.createReferenceObject(item, index);
      });
    });
  }
  setProcessors(promise) {
    promise.then((data) => {
      this.createEncabezado("Selecciona Procesador");
      this.rams = data.map((item, index) => {
        item.type = "procesador";
        return this.createReferenceObject(item, index);
      });
    });
  }
  createReferenceObject(item, index) {
    return {
      element: this.createButtonWithData(item),
      index: index,
      name: item.name,
    };
  }
  createButtonWithData(item) {
    const BUTTON = this.createButton();
    DOM.setTextContent(BUTTON, item.name);
    DOM.appendChild(this.body, BUTTON);
    DOM.addEventListener(BUTTON, "click", () => {
      if (item.type === "ram") {
        this.ramSelected = item;
        this.muestraRamSeleccionada();
      } else {
        this.processorSelected = item;
        this.muestraProcesadorSeleccionado();
      }
      if (this.ramSelected && this.processorSelected) {
        this.createEncabezado("Componentes de la computadora:");
        this.createParagraph("RAM: " + JSON.stringify(this.ramSelected));
        this.createParagraph(
          "Procesador: " + JSON.stringify(this.processorSelected)
        );
      }
    });
    return BUTTON;
  }
  muestraRamSeleccionada() {
    this.createEncabezado("Memoria RAM seleccionada: ");
    this.createParagraph(JSON.stringify(this.ramSelected));
  }
  muestraProcesadorSeleccionado() {
    this.createEncabezado("Procesador seleccionado: ");
    this.createParagraph(JSON.stringify(this.processorSelected));
  }
  createEncabezado(title, mainNode) {
    const H1 = this.createH1();
    DOM.setTextContent(H1, title);
    DOM.appendChild(mainNode || this.body, H1);
  }
  createParagraph(content) {
    const PARAGRAPH = DOM.createNode("p");
    DOM.setTextContent(PARAGRAPH, content);
    DOM.appendChild(this.body, PARAGRAPH);
  }
  createButton() {
    return DOM.createNode("button");
  }
  createButtonWithText(text) {
    const BUTTON = DOM.createNode("button");
    DOM.setTextContent(BUTTON, text);
    return BUTTON;
  }
  createH1() {
    return DOM.createNode("h1");
  }
  createDiv() {
    return DOM.createNode("div");
  }
}

const prueba = new PC();
prueba.inicia()
