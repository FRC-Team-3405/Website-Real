if (document.querySelector("#videoPlayer")) {
    document.querySelector("#videoPlayer a").addEventListener("click", playVideo);
  }
  function playVideo() {
    var player = document.getElementById("videoPlayer");
    var id = player.getAttribute("data-id");
    player.classList.add("loaded");
    var src =
    "https://www.youtube.com/embed/" +
    id +
    "?autoplay=1&autohide=1&rel=0&modestbranding=1&showinfo=0&border=0&wmode=opaque&theme=light&iv_load_policy=3";
    var iframe =
    "<iframe width='100%' height='100%' src='" +
    src +
    "' scrolling='no frameborder='0' allowfullscreen></iframe>";
    player.innerHTML = iframe;
    return false;
  }