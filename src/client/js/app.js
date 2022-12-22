import * as Vue from "./vue.js";

Vue.createApp({
    data: () => {
        return {
            heading: "Here are some images:",
            headingClass: "h1-header",
            images: [],
        };
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
