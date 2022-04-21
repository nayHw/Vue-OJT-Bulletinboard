import { mapGetters } from "vuex";
export default {
    data() {
        return {
            keyword: '',
            headerList: [
                {
                    text: "ID",
                    align: "start",
                    value: "id",
                },
                {
                    text: "Name",
                    value: "name",
                    width: "10%"
                },
                {
                    text: "Email",
                    value: "email",
                    width: "20%"
                },
                {
                    text: "Address",
                    value: "address",
                    width: "20%"
                },
                {
                    text: "Phone No",
                    value: "phone",
                },
                {
                    text: "User Type",
                    value: "type",
                },
                {
                    text: "Operation",
                    value: "operation",
                },
            ],
            userType : ["Admin","User"],
            userList: [],
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
        // var i = 0;
        this.$axios
            .get("/users")
            .then((response) => {
                this.showList = response.data;
                this.userList =  this.showList.filter(user=>{
                    return (
                        user.deleted_user_id == null && user.deleted_at == null
                    );
                });
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
        filterUser() {
            this.userList = this.showList.filter(user=>{
                if(user.deleted_user_id == null && user.deleted_at == null){
                    return (
                        user.name.toLowerCase().includes(this.keyword.toLowerCase())
                    );
                }
              });
            console.log(this.userList);
        },
        deleteUser(id){
            if(confirm("Are you sure you want to delete this selected user?")){
                var input = {
                    "deleted_user_id": this.$store.getters.userId,
                    "deleted_at": new Date().toJSON().slice(0,10).replace(/-/g,'/')
                }
                this.$axios
                .patch(`/users/${id}/delete`,input)
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
