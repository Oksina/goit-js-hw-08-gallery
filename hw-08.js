import galleryItems from './gallery-items.js';

const listGallery = createGallery(galleryItems);
const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const button = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');
const imgLightbox = document.querySelector('.lightbox__image');


function createGallery(galleryItems){
    return galleryItems.map(({preview, original, description}) => {
        return `<li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>`
    }).join('')
}


gallery.insertAdjacentHTML('beforeend', listGallery)



gallery.addEventListener('click', onClickHandler);
button.addEventListener('click', onCloseHandler);
overlay.addEventListener('click', onCloseHandler);

function onClickHandler(e) {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") {
        return;
    };
    lightbox.classList.add('is-open');
    imgLightbox.src = e.target.dataset.source;
    imgLightbox.alt = e.target.alt;
    window.addEventListener('keydown', onESCpress);
};
function onCloseHandler() {
    lightbox.classList.remove('is-open');
    imgLightbox.src = "";
    imgLightbox.alt = "";
    window.removeEventListener('keydown', onESCpress);
};



function onESCpress(e) {
    if (e.key === "Escape") {
        onCloseHandler();
    }

};
