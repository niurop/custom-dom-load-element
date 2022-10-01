class Load {
  load(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = () => {
      if (xhr.status != 200) {
        console.log("Error: " + xhr.status);
        return;
      }

      console.log(xhr.response);
    };

    xhr.onprogress = (event) => {
      console.log(`Loaded ${event.loaded} of ${event.total}`);
    };

    xhr.onerror = () => {
      console.log("Error: other");
    };

    xhr.send();
  }
}
