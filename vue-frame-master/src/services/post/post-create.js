
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    valid: true,
    titleRules: [
      v => !!v || "Titile is required",
      v => (v && v.length > 20) || "title must be greater than 20 characters"
    ],
    descriptionRules: [
      v => !!v || "Description is required",
      v =>
        (v && v.length > 50) || "description must be greater than 50 characters"
    ],
    newPost: {
      title: "",
      description: "",
      created_user_id: "",
      created_user_name: "",
      deleted_user_id: null,
      deleted_at: null,
      status: true
    }
  }),
  mounted() {
    this.newPost.created_user_id = this.$store.getters.userId;
    this.newPost.created_user_name = this.$store.getters.userName;
  },
  methods: {
    clear() {
        this.newPost.title = "";
        this.newPost.description = "";
    },
    dialogBox() {
        if(this.newPost.title.length > 20 && this.newPost.description.length > 50){  
          this.dialog = true;
        }
    },
    Cancel(){
        this.dialog = false;
    },
    addPost() {
      var input = this.newPost;
      axios.post("/posts/create", input).then(() => {
        this.newPost = {
          title: "",
          description: "",
          created_user_id: "",
          created_user_name: "",
          deleted_user_id: "",
          deleted_at: "",
          status: ""
        };
        this.$router.push("/post/list");
      });
    }
  }
};

