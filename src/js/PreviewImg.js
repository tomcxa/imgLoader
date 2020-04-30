const PreviewImgEl = {
    create(src) {
        const element = document.createElement('div');
        element.classList.add('preview-container_img');
        const img = document.createElement('img');
        img.src = src;
        const buttonHTML = `
            <button type="button" class="btn btn-close" data-btn-type="remove">
                <span class="custom-ico close rounded thick" data-btn-type="remove"></span>
            </button>`;
        element.appendChild(img);
        element.insertAdjacentHTML('beforeend', buttonHTML);
        return element;
    },

    bindToDOM(parentEl, el) {
        if (parentEl) {
            parentEl.appendChild(el);
        }
    },
};

export default PreviewImgEl;
