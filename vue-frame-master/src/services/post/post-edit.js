
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    valid: true,
    id: '',
    titleRules: [
      v => !!v || "Titile is required",
      v => (v && v.length > 20) || "title must be greater than 20 characters"
    ],
    descriptionRules: [
      v => !!v || "Description is required",
      v =>
        (v && v.length > 50) || "description must be greater than 50 characters"
    ],
    editPost: {
        title: "",
        description: "",
        created_user_id: "",
        created_user_name: "",
        status:"",
    },
    postList :[]
  }),
  mounted() {
    this.$axios
    .get(`/posts/${this.$route.params.id}/show`)
    .then((response) => {
        this.postList = response.data;
        this.editPost = this.postList;
        console.log(this.editPost);
    })
    .catch((err) => {
        console.log(err);
    });
  },
  methods: {
    clear() {
        this.editPost.title = "";
        this.editPost.description = "";
    },
    dialogBox() {
        if(this.editPost.title.length > 20 && this.editPost.description.length > 50){  
            this.dialog = true;
        }
    },
    Cancel(){
        this.dialog = false;
    },
    updatePost() {
      var input = this.editPost;
      axios.patch(`/posts/${this.$route.params.id}/edit`, input).then(() => {
        this.editPost = {
          title: "",
          description: "",
          created_user_id: "",
          created_user_name: ""
        };
        this.$router.push("/post/list");
      });
    }
  }
};

