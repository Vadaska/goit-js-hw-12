import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function scrollToGallery() {
  setTimeout(() => {
    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }
  }, 100);
}

async function onSearchSubmit(event) {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'This field cannot be empty',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  loadMoreBtn.classList.add('hidden');
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;

    if (images.length === 0) {
      iziToast.warning({
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
      return;
    }

    createGallery(images);
    currentPage += 1;
    loadMoreBtn.classList.remove('hidden');
  } catch (error) {
    iziToast.error({
      message: 'Сталася помилка при завантаженні зображень.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    input.value = '';
  }
}

async function onLoadMore() {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;

    if (images.length === 0 || currentPage * 15 >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
    }

    createGallery(images);
    currentPage += 1;
    scrollToGallery();
  } catch (error) {
    iziToast.error({
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
