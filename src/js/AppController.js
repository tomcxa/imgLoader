import PreviewImgEl from './PreviewImg';

/* eslint-disable no-unused-vars */
const AppController = {
    container: document.querySelector('.file-loader-container'),
    getElements() {
        return {
            dropArea: this.container.querySelector('.drop-area'),
            fileInput: this.container.querySelector('.file-input'),
            downloadBtn: this.container.querySelector('.button'),
            previewContainer: this.container.querySelector('.preview-container'),
        };
    },

    init() {
        this.addListeners();
    },

    addListeners() {
        const {
            dropArea, fileInput, downloadBtn, previewContainer,
        } = this.getElements();

        dropArea.addEventListener('dragenter', this.handleDragenter.bind(this));
        dropArea.addEventListener('dragover', this.handleDragover.bind(this));
        dropArea.addEventListener('dragleave', this.handleDragleave.bind(this));
        dropArea.addEventListener('drop', this.handleDrop.bind(this));

        fileInput.addEventListener('change', this.fileInputHandle.bind(this));
        previewContainer.addEventListener('click', (event) => {
            if (event.target.dataset.btnType === 'remove') {
                event.target.closest('.preview-container_img').remove();
            }
        });
    },

    handleDragenter(event) {
        event.preventDefault();
        // event.stopPropagation();
        event.currentTarget.classList.add('highlight');
    },

    handleDragover(event) {
        event.preventDefault();
        // event.stopPropagation();
        event.currentTarget.classList.add('highlight');
    },

    handleDragleave(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('highlight');
    },

    handleDrop(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('highlight');
        const dt = event.dataTransfer;
        const { files } = dt;

        this.fileInputHandle(event);
    },

    fileInputHandle(event) {
        const target = event.dataTransfer || event.currentTarget;
        const files = [...target.files];
        files.forEach((file) => {
            const src = URL.createObjectURL(file);
            const imgContainer = Object.create(PreviewImgEl);
            const el = imgContainer.create(src);
            imgContainer.bindToDOM(this.getElements().previewContainer, el);
            el.addEventListener('load', () => {
                URL.revokeObjectURL(src);
            });
        });
    },

    // previewFile(file) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.addEventListener('load', (e) => {
    //         const img = document.createElement('img');
    //         img.src = reader.result;
    //         this.getElements().previewContainer.appendChild(img);
    //         console.log(e.target.result);
    //     });
    //     reader.addEventListener('error', (e) => {
    //         console.log(e.target.error);
    //     });
    //     // reader.onloadend = () => {
    //     //     const img = document.createElement('img');
    //     //     img.src = reader.result;
    //     //     this.getElements().previewContainer.appendChild(img);
    //     // };
    // },
};

export default AppController;
