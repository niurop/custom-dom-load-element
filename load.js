class Load extends HTMLElement {
  #reader = new FileReader();
  #url = null;
  #result = null;

  load(url) {
    this.#reader.readAsDataURL(file);
    this.#reader.onload = (event) => {
      this.#result = event.target.result;
      console.log(this.#result);
    };
  }

  get result() {
    return this.#result;
  }
}
