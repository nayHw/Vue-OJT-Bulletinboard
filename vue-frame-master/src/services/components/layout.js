import { mapGetters } from "vuex";
import constants from "../../constants";
export default {
    data() {
        return {
            title: constants.APP_TITLE,
        };
    },
    computed: {
        ...mapGetters(["isLoggedIn", "userType", "userName"]),
    },
    methods: {
        postList(){
            this.$router.push('/post/list');
        },
        userList(){
            this.$router.push('/user/list');
        },
        /**
         * This is to log out from system.
         * @returns void
         */
        logout() {
            localStorage.clear();
            this.$router.push("/login");
            // this.$store
            //     .dispatch("logout")
            //     .then(() => {
            //         this.$router.push({ name: "login" });
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        },
        /**
         * This is to route profile page.
         * @returns void
         */
        showProfile() {
            var id = this.$store.getters.userId;
            this.$router.push(`/user/${id}/detail`);
        },
    },
};
