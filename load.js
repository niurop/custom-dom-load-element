class Load {
  onstart = () => console.log("Started");
  onend = console.log;
  onprogress = (percent) => {
    console.log(percent);
  };
  onerror = (msg) => {
    console.log("Error: " + msg);
  };

  #progress = 0.0;
  get progress() {
    return this.#progress;
  }

  load(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = () => {
      if (xhr.status != 200) {
        this.onerror(xhr.status);
        return;
      }

      this.onend(xhr.response);
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
