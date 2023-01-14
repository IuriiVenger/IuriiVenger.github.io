const backArrow = document.querySelector('.back-arrow');
const forwardArrow = document.querySelector('.forward-arrow');
const photos = document.querySelectorAll('.photos__item');
const photosWrapper = document.querySelector('.photos');
const burgerMenu = document.getElementById('burger-menu__icon');
const dropDown = document.querySelector('.header-drop-down');

let activePhoto = 0;

const touchPosition = {
  start: 0,
  end: 0,
};

const onTouchMoving = e => {
  touchPosition.end = e.touches[0].pageX;
};

const onTouchEnded = e => {
  touchPosition.end > touchPosition.start + 50 && decreaseSlide(e);
  touchPosition.end < touchPosition.start - 50 && increaseSlide(e);
  touchPosition.start = 0;
  touchPosition.end = 0;
  photosWrapper.removeEventListener('touchmove', onTouchMoving);
  photosWrapper.removeEventListener('touchend', onTouchEnded);
};

const onTouchStarted = e => {
  if (e.target.className.search('arrow') === -1) {
    touchPosition.start = e.touches[0].pageX;
    photosWrapper.addEventListener('touchmove', onTouchMoving);
    photosWrapper.addEventListener('touchend', onTouchEnded);
  }
};

const changeActivePhoto = (photos, activePhoto) => {
  clearInterval(autoChangePhoto);
  photos.forEach((photo, index) => {
    photo.style = `opacity: ${index === activePhoto ? '1' : '0'}`;
  });
  autoChangePhoto = setInterval(increaseSlide, 5000);
};

const increaseSlide = () => {
  console.log(photos.length);
  if (activePhoto < photos.length - 1) {
    activePhoto++;
  } else {
    activePhoto = 0;
  }

  changeActivePhoto(photos, activePhoto);
};

const decreaseSlide = () => {
  if (activePhoto > 0) {
    activePhoto--;
  } else {
    activePhoto = photos.length - 1;
  }

  changeActivePhoto(photos, activePhoto);
};

const changeDropdownVisiblity = e => {
  e.stopPropagation();
  if (dropDown.classList.contains('visible')) {
    document.removeEventListener('click', clickOutside)
    dropDown.classList.add('hidden');
    dropDown.classList.remove('visible');
  } else {
    document.addEventListener('click', clickOutside);
    dropDown.classList.remove('hidden');
    dropDown.classList.add('visible');
  }
  burgerMenu.classList.toggle('icon-menu');
  burgerMenu.classList.toggle('icon-close');
};

const clickOutside = e => {
  if (e.target.className !== 'header-drop-down visible') {
    changeDropdownVisiblity(e);
  }
};

const addSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });
};

let autoChangePhoto = setInterval(increaseSlide, 5000);

addSmoothScroll()
burgerMenu.addEventListener('click', changeDropdownVisiblity);
backArrow.addEventListener('click', decreaseSlide);
forwardArrow.addEventListener('click', increaseSlide);
photosWrapper.addEventListener('touchstart', onTouchStarted, false);
