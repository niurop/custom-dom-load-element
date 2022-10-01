class LoadContent extends HTMLElement {
  src = null;
  #progress = 0.0;
  get progress() {
    return this.#progress;
  }

  load(src = null) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", src || this.src);

    xhr.onload = () => {
      if (xhr.status != 200) {
        throw `Error: [${src}] ${xhr.status}`;
      }
      this.outerHTML = xhr.response;
    };

    xhr.onprogress = (event) => {
      this.#progress = event.loaded / event.total;
    };

    xhr.onerror = () => {
      throw `Error: [${this.src}] other`;
    };

    xhr.send();
  }

  static get observedAttributes() {
    return ["src"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    if (name == "src" && oldValue === null) this.load();
  }
}

customElements.define("load-content", LoadContent);
