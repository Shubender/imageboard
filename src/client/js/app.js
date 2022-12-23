import * as Vue from "./vue.js";

Vue.createApp({
    data: () => {
        return {
            heading: "List of images",
            headingClass: "h1-header",
            images: [],
            filename: "",
            file: null,
            description: "",
            username: "",
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
