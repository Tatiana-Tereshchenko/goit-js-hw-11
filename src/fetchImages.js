// import axios from 'axios';
// import Notiflix from 'notiflix';

// const API_KEY = '35750052-8f7833963258536162b8e8fdc';
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');
// let page = 1;
// const perPage = 40;

// export async function fetchImages(query) {
//     const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
//     try {
//         const response = await axios.get(url);
//         const images = response.data.hits;
//         const totalHits = response.data.totalHits;
//         if (images.length === 0) {
//             throw new Error('No images found');
//         }

//         renderImages(images);
//         if (page * perPage >= totalHits) {
//             loadMoreBtn.style.display = 'none';
//             Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//         } else {
//             loadMoreBtn.style.display = 'block';
//         }
//     }
//     catch (error) {
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     }
// }

// function renderImages(images) {
//     const cards = images.map(image => createImageCard(image));
//     gallery.insertAdjacentHTML('beforeend', cards.join(''));
// }

// function createImageCard(image) {
//     return `
//         <div class="photo-card">
//             <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="160" height="75" />
//             <div class="info">
//                 <p class="info-item"><b>Likes:</b> ${image.likes}</p>
//                 <p class="info-item"><b>Views:</b> ${image.views}</p>
//                 <p class="info-item"><b>Comments:</b> ${image.comments}</p>
//                 <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
//             </div>
//         </div>
//     `;
// }



