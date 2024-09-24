let index = 0;
let images = [];

const slider = async (newsId) => {
  try {
    const res = await api(`/news/${newsId}/images`);
    images = res;
    const slider = document.querySelector('.slider');
    slider.innerHTML = "";

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imgElem = document.createElement('img');
        imgElem.src = images[i].image;
        imgElem.alt = "News Image";
        slider.appendChild(imgElem);
      }
      updateSlider();
    } else {
      slider.innerHTML = 'No images available';
    }
  } catch (error) {
    console.error('Error loading images:', error);
  }
};

const updateSlider = () => {
  const slider = document.querySelector('.slider');
  const totalImages = images.length;

  const translateX = -(index * 100);
  slider.style.transform = `translateX(${translateX}%)`;

  document.getElementById('prev-slide').disabled = index === 0;
  document.getElementById('next-slide').disabled = index === totalImages - 1;
};

document.getElementById('next-slide').addEventListener('click', () => {
  if (index < images.length - 1) {
    index++;
    updateSlider();
  }
});

document.getElementById('prev-slide').addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});
