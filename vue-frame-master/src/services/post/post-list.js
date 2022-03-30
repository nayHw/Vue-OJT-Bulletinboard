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
                    width: "20%"
                },
                {
                    text: "Post Desciption",
                    value: "description",
                    width: "40%"
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
                this.showList = this.postList.filter(post=>{
                    return (
                        post.deleted_user_id == null && post.deleted_at == null
                    );
                });
            })
            .catch((err) => {
                console.log(err);
            });
            console.log(this.showList);
    },
    methods: {
        /**
         * This is to filter posts of datatable.
         * @returns void
         */
        filterPosts() {
            this.showList = this.postList.filter(post=>{
                    if(post.deleted_user_id == null && post.deleted_at == null){
                        return (
                            post.title.toLowerCase().includes(this.keyword.toLowerCase()) || 
                            post.description.toLowerCase().includes(this.keyword.toLowerCase()) 
                        );
                    }
            })
            console.log(this.showList);
        },
        postDelete(id){
            if(confirm("Are you sure you want to delete this selected post?")){
                var input = {
                                "deleted_user_id": this.$store.getters.userId,
                                "deleted_at": Date.parse(new Date())
                                // "deleted_at": new Date().toJSON().slice(0,10).replace(/-/g,'/')
                            }
                this.$axios
                .patch(`/posts/${id}/delete`,input)
                .then(() => {
                    this.$router.go(this.$router.currentRoute)
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }
    },
};
