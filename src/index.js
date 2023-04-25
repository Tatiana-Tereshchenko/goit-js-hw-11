import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import axios from 'axios';
import { fetchImages } from './fetchImages.js';



const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.input-search');
let page = 1;
const perPage = 40;
const loadMoreBtn = document.querySelector('.load-more');


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
    page += 1;
    const query = searchInput.value.trim();
if (query === '') {
    return;
    }
    fetchImages(query);
}

