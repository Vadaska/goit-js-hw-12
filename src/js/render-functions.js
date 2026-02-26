import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <p>Likes <br> ${likes}</p>
        <p>Views <br> ${views}</p>
        <p>Comments <br> ${comments}</p>
        <p>Downloads <br> ${downloads}</p>
      </div>
    </li>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// очищення галереї перед новим пошуком
export function clearGallery() {
  galleryContainer.innerHTML = '';
}

// показати лоадер
export function showLoader() {
  loader.classList.remove('hidden');
}

// сховати лоадер
export function hideLoader() {
  loader.classList.add('hidden');
}
