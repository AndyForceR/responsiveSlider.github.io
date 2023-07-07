const slider = document.querySelector(".slider");
const cards = document.querySelectorAll(".card");
const arrowBtns = document.querySelectorAll(".arrow-btn");
let cardWidth = slider.offsetWidth / 3;

function resizeCardWidth() {
  cardWidth = slider.offsetWidth / 3;
  console.log(cardWidth);
}

window.onresize = resizeCardWidth;

let isDragging = false,
  startX,
  startScrollLeft;

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    slider.style.scrollBehavior = "smooth";
    slider.scrollLeft += btn.id === "prev" ? -cardWidth : cardWidth;
    slider.style.scrollBehavior = "auto";
  });
});

const dragStart = (e) => {
  isDragging = true;
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;

  slider.style.cursor = "grab";
  slider.style.userSelect = "none";
};

const dragging = (e) => {
  if (!isDragging) return;
  const scrollX = startScrollLeft - (e.pageX - startX);
  slider.scrollLeft = scrollX;
};

const dragStop = () => {
  isDragging = false;
  slider.style.cursor = "unset";
  slider.style.userSelect = "unset";

  // Calculate the index of the active card based on the scroll position
  const scrollLeft = slider.scrollLeft;
  // const cardWidth = slider.offsetWidth / 3;
  const activeCardIndex = Math.round(scrollLeft / cardWidth);

  // Calculate the scroll position to snap to the active card
  const scrollSnapPosition = activeCardIndex * cardWidth;

  // Animate the scroll to the snap position
  slider.scrollTo({
    left: scrollSnapPosition,
    behavior: "smooth",
  });
};

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

slider.addEventListener("touchstart", dragStart);
slider.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);
