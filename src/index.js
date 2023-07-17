export { ref };
import axios from 'axios';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const KEY =
  'live_RzxlvgDPhPOwr0bNUPH6AjS23nuikGv5C1jMtGfmpFNR0mCZxS7x5qqKXUUSykmt';

axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
axios.defaults.headers.common['x-api-key'] = KEY;
const ref = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  info: document.querySelector('.cat-info'),
};

ref.select.hidden = true
ref.error.hidden = true;

ref.loader.insertAdjacentHTML('beforeend', '<span class="load"></span>')

fetchBreeds()
  .then(data => {
    ref.select.hidden = false
    ref.select.insertAdjacentHTML(
      'beforeend', `<option value="" disabled selected  >Please, select Your cat</option`);
    data.map(breed =>
      ref.select.insertAdjacentHTML(
        'beforeend',
        `<option value="${breed.id}">${breed.name}</option>`
      )
    );

  new SlimSelect({
  select: '.breed-select'
})
  })
  .catch(error => {
    ref.error.hidden = false;
    ref.error.innerHTML = ''
    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
  })
  .finally(() => {
    ref.loader.hidden = true;
   
  });

ref.select.addEventListener('change', onChangeClick);

function onChangeClick() {
  const selected = ref.select.value;
   ref.info.innerHTML = ''
   ref.loader.hidden = false;
  fetchCatByBreed(selected)
    .then(data => {
      ref.error.hidden = true;
      ref.loader.hidden = false;
      ref.info.hidden = true;
      ref.info.innerHTML = `<img src=${data[0].url}
      alt=${data[0].breeds[0].name}
      width="400" >
    <h1>${data[0].breeds[0].name}</h1>
    <p>${data[0].breeds[0].temperament}</p>
    <p>${data[0].breeds[0].description}</p>
    `;
    })
    .catch(error => {
      ref.error.hidden = false;
      ref.info.innerHTML = ''
      ref.error.innerHTML = ''
      Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    })
    .finally(() => {
      ref.loader.hidden = true;
      ref.info.hidden = false;
    });
}
