
import axios from "axios";
export default {
    data: () => ({
        valid: true,
        titleRules: [
            v => !!v || 'Titile is required',
            v => (v && v.length > 10) || 'title must be greater than 10 characters',
        ],
        descriptionRules: [
            v => !!v || 'Description is required',
            v => (v && v.length > 20) || 'description must be greater than 20 characters',
        ],
        newItem: {
            title: "",
            description: "",
            created_user_id: "",
            checkbox: false,
            created_user_name: ""
        },

    }),
    created:{

    },
    mounted() {
        this.newItem.created_user_id = this.$store.getters.userId;
        this.newItem.created_user_name = this.$store.getters.userName;
    },
    methods: {
        clear() {
            (this.newItem.title = ""), (this.newItem.description = "");
            alert(this.newItem.created_user_name);
        },
        addItem() {
            var input = this.newItem;
            axios.post("/posts/create", input).then(() => {
                this.newItem = {
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