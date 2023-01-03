import { commentsComponent } from "./comments.js";

export const imageComponent = {
    data() {
        return {
            imageData: {},
            usercomment: "",
            comment: "",
            imageId: "",
        };
    },

    props: ["id"],

    // vue error - two components (not for me!)
    template: `
        <div id="backdrop" v-on:click="handleCloseImage"></div>
        <div id="popup">
            <h2>{{imageData.title}}</h2>  
            <img v-bind:src="imageData.url">            
            <p><b>Description:</b>{{imageData.description}}</p>
            <p><b>Uploaded</b> by <b>{{imageData.username}}</b> on {{imageData.created_at?.slice(0, 10)}}</p>
            <comments v-bind:id="id"></comments>
        </div>
    `,

    methods: {
        handleCloseImage(event) {
            this.$emit("closed", event.target.value);
        },
    },

    emits: ["closed"],

    mounted() {
        console.log("modal.js mounted, image Id: ", this.id);
        fetch(`/image/${this.id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("imageData: ", data);
                this.imageData = data;
            });
    },
    components: {
        comments: commentsComponent,
    },
};
