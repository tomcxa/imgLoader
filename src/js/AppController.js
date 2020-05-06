import PreviewImgEl from './PreviewImg';

/* eslint-disable no-unused-vars */
const AppController = {
    container: document.querySelector('.file-loader-container'),
    URL: 'http://localhost:7070',
    getElements() {
        return {
            dropArea: this.container.querySelector('.drop-area'),
            fileInput: this.container.querySelector('.file-input'),
            form: this.container.querySelector('.my-form'),
            previewContainer: this.container.querySelector('.preview-container'),
        };
    },

    init() {
        this.addListeners();
        this.setupGallery(this.URL);
    },

    clearGallery() {
        const { previewContainer } = this.getElements();
        previewContainer.innerHTML = '';
    },

    addListeners() {
        const {
            dropArea, fileInput, form, previewContainer,
        } = this.getElements();

        dropArea.addEventListener('dragenter', this.handleDragenter.bind(this));
        dropArea.addEventListener('dragover', this.handleDragover.bind(this));
        dropArea.addEventListener('dragleave', this.handleDragleave.bind(this));
        dropArea.addEventListener('drop', this.handleDrop.bind(this));

        fileInput.addEventListener('change', this.fileInputHandle.bind(this));
        previewContainer.addEventListener('click', async (event) => {
            if (event.target.dataset.btnType === 'remove') {
                const img = event.target.closest('.preview-container_img');
                const { name } = img.dataset;
                const url = `${this.URL}?${name}`;
                await this.deleteImage(url);
                await this.setupGallery(this.URL);
            }
        });
    },

    handleDragenter(event) {
        event.preventDefault();
        event.currentTarget.classList.add('highlight');
    },

    handleDragover(event) {
        event.preventDefault();
        event.currentTarget.classList.add('highlight');
    },

    handleDragleave(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('highlight');
    },

    async handleDrop(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('highlight');

        await this.fileInputHandle(event);
    },

    async fileInputHandle(event) {
        const { form } = this.getElements();
        let formData = new FormData(form);
        if (event.dataTransfer) {
            formData = new FormData();
            const { files } = event.dataTransfer;
            files.forEach((file) => {
                formData.append('file-input', file);
            });
        }

        await this.addImages(this.URL, formData);
        await this.setupGallery(this.URL);
    },

    async syncServer(url) {
        const response = await fetch(url);

        const result = await response.json();
        return result;
    },

    async addImages(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            body: data,
        });

        const result = await response.json();
        return result;
    },

    async deleteImage(url) {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        const result = await response.json();
        return result;
    },

    async setupGallery(url) {
        this.clearGallery();
        const names = await this.syncServer(url);
        names.forEach((name) => {
            const src = `${url}/${name}`;
            const imgContainer = Object.create(PreviewImgEl);
            const el = imgContainer.create(src, name);
            imgContainer.bindToDOM(this.getElements().previewContainer, el);
        });
    },
};

export default AppController;
