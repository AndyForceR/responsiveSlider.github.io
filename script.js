const slider = document.querySelector(".slider");
const cards = document.querySelectorAll(".card");

let isDragging = false,
  startX,
  startScrollLeft;

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
  console.log(scrollLeft);
  const cardWidth = slider.offsetWidth / 3;
  const activeCardIndex = Math.round(scrollLeft / cardWidth);
  console.log(activeCardIndex);

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
