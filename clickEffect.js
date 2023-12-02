var area = document.querySelector(".area");
area.addEventListener("click", function (e) {
  let x = e.clientX - this.offsetLeft;
  let y = e.clientY - this.offsetTop;

  let circle = document.createElement("span");
  circle.style.left = x + "px";
  circle.style.top = y + "px";

  area.appendChild(circle);

  setInterval(function () {
    circle.remove();
  }, 1000);
});
