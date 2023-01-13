const backArrow = document.querySelector('.back-arrow');
const forwardArrow = document.querySelector('.forward-arrow');
const photos = document.querySelectorAll('.photos__item');

let currentPhoto = 0;

const changeVisiblity = (photos, activePhoto) => {
  photos.forEach((photo, index) => {
    photo.style = `opacity: ${index === activePhoto ? '1' : '0'}`;
  });
}

const increaseSlide = () => {
  if (currentPhoto  < photos.length -1 ) {
    currentPhoto ++;
  } else {
    currentPhoto = 0;
  }

  changeVisiblity(photos, currentPhoto)
};

const decreaseSlide = () => {
  if (currentPhoto  > 0 ) {
    currentPhoto --;
  } else {
    currentPhoto = photos.length-1;
  }

  changeVisiblity(photos, currentPhoto)
};

backArrow.addEventListener('click', decreaseSlide);
forwardArrow.addEventListener('click', increaseSlide);
