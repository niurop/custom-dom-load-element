class Load {
  onstart = () => console.log("Started");
  onend = console.log;
  onprogress = (percent) => {
    console.log(percent);
  };
  onerror = (msg) => {
    console.log("Error: " + msg);
  };

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
      this.onprogress(event.loaded / event.total);
    };

    xhr.onerror = () => {
      this.onerror("other");
    };

    xhr.send();

    this.onstart();
  }
}
