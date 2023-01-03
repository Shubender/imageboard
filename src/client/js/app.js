import * as Vue from "./vue.js";
import { imageComponent } from "./modal/modal.js";

Vue.createApp({
    data: () => {
        return {
            heading: "List of images",
            headingClass: "h1-header",
            btn: "btn",
            images: [],
            filename: "",
            file: null,
            description: "",
            username: "",
            imageId: null,
            showModal: false,
            usercomment: "",
            comment: "",
            showMore: true,
        };
    },
    methods: {
        handleSubmit(event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append("filename", this.filename);
            formData.append("file", this.file);
            formData.append("description", this.description);
            formData.append("username", this.username);
            fetch("/upload", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    this.images.unshift(data.userFile);
                });
        },
        handleFileChange(event) {
            console.log(event.target.files);
            this.file = event.target.files[0];
        },
        handleClickImage(event) {
            this.imageId = event.target.id;
            // res.locals.fileData = event.target;
            this.showModal = true;
            // console.log("handleClickImage: ", this.imageId, this.showModal);
            history.pushState({}, "", `/#${this.imageId}`);
        },
        handleCloseImage() {
            this.showModal = false;
            this.imageId = null;
            history.pushState({}, "", "/");
        },
        handleDeleteImage() {
            this.value = this.images.findIndex(
                (image) => image.id === this.imageId
            );
            this.images.splice(this.value, 1);
        },
        loadMoreImages(event) {
            event.preventDefault();
            fetch(`/images/loadmore`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    this.images.push(...data);
                    console.log("New images array (app.js): ", data);
                    if (data.length < 5) {
                        console.log("catch!");
                        this.showMore = false;
                    }
                });
        },
    },
    created() {
        // console.log("Vue app was created");
        fetch("/images")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("data from server: ", data);
                this.images = data;
            });
    },
    mounted() {
        // console.log("Testing Mount");
        if (!this.imageId && window.location.hash) {
            this.imageId = window.location.hash.split("#")[1];
            this.showModal = true;
        }
        this.imageId = location.hash.slice(1);
        addEventListener("popstate", () => {
            console.log("route change: ", window.location);
            if (!this.imageId && window.location.hash) {
                this.imageId = window.location.hash.split("#")[1];
                this.showModal = true;
            }
            if (this.imageId && !window.location.hash) {
                this.imageId = null;
                this.showModal = false;
            }
        });
    },
    components: {
        "one-image": imageComponent,
    },
}).mount("#main");
