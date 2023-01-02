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
            imageId: "",
            showModal: false,
            usercomment: "",
            comment: "",
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
        },
        handleCloseImage() {
            this.showModal = false;
        },
        loadMoreImages(event) {
            event.preventDefault();
            fetch(`/images/loadmore`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log("New images array (app.js): ", data);
                });
        },
    },
    created() {
        console.log("Vue app was created");
        fetch("/images")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("data from server: ", data);
                this.images = data;
            });
    },
    components: {
        "one-image": imageComponent,
    },
}).mount("#main");
