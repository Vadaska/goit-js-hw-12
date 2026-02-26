import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const apiKey = '54780926-f74047f8bb106b77773b760bb';

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(baseURL, {
    params: {
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });

  return response.data;
}
