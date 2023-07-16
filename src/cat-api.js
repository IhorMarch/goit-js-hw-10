import axios from 'axios';
export { fetchBreeds };
export { fetchCatByBreed };

function fetchBreeds() {
  return axios.get('/breeds/').then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`images/search?breed_ids=${breedId}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  });
}
    
