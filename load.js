class Load {
  onstart = () => console.log("Started");
  onend = console.log;
  onprogress = (percent) => {
    console.log(percent);
  };
  onerror = (msg) => {
    console.log("Error: " + msg);
  };

  url = null;
  #progress = 0.0;
  get progress() {
    return this.#progress;
  }
  #result = null;
  get result() {
    return this.#result;
  }

  load(url = null) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url || this.url);

    xhr.onload = () => {
      if (xhr.status != 200) {
        this.onerror(xhr.status);
        return;
      }
      const result = xhr.response;
      this.#result = result;
      this.onend(result);
    };

    xhr.onprogress = (event) => {
      const progress = event.loaded / event.total;
      this.#progress = progress;
      this.onprogress(progress);
    };

    xhr.onerror = () => {
      this.onerror("other");
    };

    xhr.send();

    this.onstart();
  }
}
