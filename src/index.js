import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import axios from 'axios';




const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.input-search');
let page = 1;
const perPage = 40;
const loadMoreBtn = document.querySelector('.load-more');
// Ключ виводимо в окрему змінну
const API_KEY = '35750052-8f7833963258536162b8e8fdc';
// Створюємо змінну в якій зберігаємо всі зображення

const imagesShown = [];

    async function fetchImages(query) {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    try {
        const response = await axios.get(url);
        const images = response.data.hits;
        const totalHits = response.data.totalHits;
        if (images.length === 0) {
            throw new Error('No images found');
        }
//фільтруємо зображження, якщо вони є в змінній imagesShown, то ми їх не додаємо 
        const newImages = images.filter(image => !imagesShown.includes(image.id));
        imagesShown.push(...newImages.map(image => image.id));
//Додаємо умову щоб при  повторному запиті, попередній запит видаляся
        if (page === 1) {
            gallery.innerHTML = ' ';
        }


        renderImages(images);
        if (page * perPage >= totalHits) {
            loadMoreBtn.style.display = 'none';
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    catch (error) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
}
//функція перебирає масив методом map
function renderImages(images) {
    const cards = images.map(image => createImageCard(image));
    gallery.insertAdjacentHTML('beforeend', cards.join(''));
}
//функція створює розмітку
function createImageCard(image) {
    return `
        <div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="160" height="75" />
            <div class="info">
                <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                <p class="info-item"><b>Views:</b> ${image.views}</p>
                <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
            </div>
        </div>
    `;
}


searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
if (query === '') {
    return;
    }
    fetchImages(query);
}

loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
    const scrollBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
    if (scrollBottom > 50) {
        return;
    }

    page += 1;
    const query = searchInput.value.trim();
    if (query === '') {
        return;
    }
    fetchImages(query);
}