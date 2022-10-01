class Load {
  onstart = null;
  onend = null;
  onprogress = null;
  onerror = null;

  src = null;
  #progress = 0.0;
  get progress() {
    return this.#progress;
  }
  #result = null;
  get result() {
    return this.#result;
  }

  load(src = null) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", src || this.src);

    xhr.onload = () => {
      if (xhr.status != 200) {
        this.onerror && this.onerror(xhr.status);
        return;
      }
      const result = xhr.response;
      this.#result = result;
      this.onend && this.onend(result);
    };

    xhr.onprogress = (event) => {
      const progress = event.loaded / event.total;
      this.#progress = progress;
      this.onprogress && this.onprogress(progress);
    };

    xhr.onerror = () => {
      this.onerror && this.onerror("other");
    };

    xhr.send();

    this.onstart && this.onstart();
  }
}
