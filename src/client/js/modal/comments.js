export const commentsComponent = {
    data() {
        return {
            comments: {},
            username: "",
            comment: "",
            time: "",
        };
    },

    template: `
        <div>
            <h2>Add a comment:</h2>
            <form v-on:submit="handleAddComment">
                <span>User name: </span><input type="text" name="username" v-model="username">
                <span>Comment: </span><input type="text" name="comment" v-model="comment">
                <button id="submitcomment">Submit</button>
            </form>
            <h2>All comments:</h2>
            <p class="comments" v-for="comment in comments">    
                <p>User <b>{{comment.username}}</b> wrote:</p>
                <p>"{{comment.comment}}"</p>
                <p>On {{comment.created_at.slice(0, 10)}}</p><br>
            </p>
        </div>    
    `,

    props: ["id"],

    mounted() {
        console.log("comments.js mounted, image Id: ", this.id);
        fetch(`/comments/${this.id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.comments = data;
                console.log("Comments: ", this.comments);
                // this.time = this.comments.created_at.slice(0, 10);
                // console.log("time: ", this.time);
            });
    },

    methods: {
        handleAddComment(event) {
            event.preventDefault();

            const commentData = {
                imageId: this.id,
                username: this.username,
                comment: this.comment,
            };

            console.log("comment data: ", commentData);
            fetch("/image/comments", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentData),
            })
                .then((result) => result.json())
                .then((data) => {
                    console.log("final data: ", data);
                    this.comments.unshift(data);
                });
        },
    },
};
