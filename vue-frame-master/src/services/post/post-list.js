import { mapGetters } from "vuex";
export default {
    data() {
        return {
            postInfo: null,
            dialogTitle: "",
            dialog: false,
            isDeleteDialog: false,
            keyword: '',
            headerList: [
                {
                    text: "ID",
                    align: "start",
                    value: "id",
                },
                {
                    text: "Post Title",
                    value: "title",
                },
                {
                    text: "Post Desciption",
                    value: "description",
                },
                {
                    text: "Posted User",
                    value: "created_user_name",
                },
                {
                    text: "Operation",
                    value: "operation",
                },
            ],
            postList: [],
            showList: [],
        };
    },
    computed: {
        ...mapGetters(["isLoggedIn"]),
        headers() {
            if (!this.isLoggedIn) {
                return this.headerList.slice(0, this.headerList.length - 1);
            } else {
                return this.headerList;
            }
        },
    },
    mounted() {
        this.$axios
            .get("/posts")
            .then((response) => {
                this.postList = response.data;
                this.showList = this.postList;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        /**
         * This is to filter posts of datatable.
         * @returns void
         */
        filterPosts() {
            this.showList = this.postList.filter(post=>{
                return (
                    post.title.toLowerCase().includes(this.keyword.toLowerCase()) || 
                    post.description.toLowerCase().includes(this.keyword.toLowerCase()) 
                );
              });
            console.log(this.showList);
        },
        postDelete(id){
            if(confirm("Are you sure you want to delete this selected post?")){
                this.$axios
                    .delete(`/posts/${id}/delete`)
                    .then(() => {
                        this.$router.go(this.$router.currentRoute)
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            }
        }
    },
};
