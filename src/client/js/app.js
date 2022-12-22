import * as Vue from "./vue.js";

Vue.createApp({
    data: () => {
        return {
            heading: "List of images",
            headingClass: "h1-header",
            images: [],
            filename: "",
            file: null,
        };
    },
    methods: {
        handleSubmit(event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append("filename", this.filename);
            formData.append("file", this.file);

            fetch("/upload", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                });
        },
        handleFileChange(event) {
            console.log(event.target.files);
            this.file = event.target.files[0];
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
}).mount("#main");
