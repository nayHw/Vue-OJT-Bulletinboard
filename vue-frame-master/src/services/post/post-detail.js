
import axios from "axios";

export default {
    data() {
        return {
            showList: []
        };
    },
    created() {
        axios
            .get(`/posts/${this.$route.params.id}`)
            .then(response => {
                this.showList = response.data;
                console.log(this.showList)
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        back(){
            this.$router.push('/post/list');
        }
    }
};