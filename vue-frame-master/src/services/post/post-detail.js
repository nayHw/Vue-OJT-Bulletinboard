
import axios from "axios";

export default {
    data() {
        return {
            showList: [],
            prevRoute: null
        };
    },
    created() {
        axios
            .get(`/posts/${this.$route.params.id}`)
            .then(response => {
                this.showList = response.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        back(){  
            this.$router.go(-1)
        }
    }
};