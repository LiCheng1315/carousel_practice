const track = document.querySelector('.carousel-track');


first_clone = track.firstElementChild.cloneNode(true);
first_clone.classList.remove('current-slide');
first_clone.id = "fist-clone";
last_clone = track.lastElementChild.cloneNode(true);
last_clone.id = "last-clone";

track.appendChild(first_clone);
track.insertBefore(last_clone, track.firstElementChild);

const slides = Array.from(track.children);

const img_width = track.getBoundingClientRect().width;

const previous_btn = document.querySelector('.slide-left');
const next_btn = document.querySelector('.slide-right');

const dotNav = document.querySelector('.carousel__nav');
const indicator = Array.from(dotNav.children);


function setPosition(slide, index) {
  slide.querySelector('img').style.left = `${img_width * (index-1)}px`;
}

slides.forEach(setPosition);

let index = 1;

function moveToSlide(track, index) {
  track.style.transform = `translateX(${-((index-1) * img_width)}px)`;
}

const changeIndicator = function (current, target) {
  current.classList.remove('current-dot');
  target.classList.add('current-dot');
}

next_btn.addEventListener('click', () => {
  const currentIndicator = document.querySelector('.current-dot');
  let nextIndicator = currentIndicator.nextElementSibling;
  
  if (!nextIndicator) {
    nextIndicator = document.querySelector('.carousel__nav').firstElementChild;
  }
  track.style.transition = "0.5s";
  
  if (++index > slides.length - 1) index = slides.length - 1;
  
  console.log(index);
  moveToSlide(track, index);
  changeIndicator(currentIndicator, nextIndicator);  
})

previous_btn.addEventListener('click', () => {
  const currentIndicator = document.querySelector('.current-dot');
  let prevIndicator = currentIndicator.previousElementSibling;

  if (!prevIndicator) {
    prevIndicator = document.querySelector('.carousel__nav').lastElementChild;
  }

  track.style.transition = "0.5s";
  if (--index < 0) index = 0;

  moveToSlide(track, index);
  changeIndicator(currentIndicator, prevIndicator);
})

track.addEventListener('transitionend', () => {
  if (slides[index].id === "fist-clone") {
    track.style.transition = "none";
    index = 1;
    moveToSlide(track, index);
  }

  if (slides[index].id === "last-clone") {
    track.style.transition = "none";
    index = slides.length - 2;
    moveToSlide(track, index);
  }
})
