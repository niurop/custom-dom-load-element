class LoadContent extends HTMLElement {
  src = null;

  load(src = null) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", src || this.src);

    xhr.onload = () => {
      if (xhr.status != 200) {
        throw `Error: [${src}] ${xhr.status}`;
      }
      this.outerHTML = xhr.response;
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
