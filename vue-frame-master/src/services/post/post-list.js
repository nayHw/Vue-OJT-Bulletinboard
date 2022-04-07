import { mapGetters } from "vuex";
import axios from "axios";
import JsonExcel from "vue-json-excel";


export default {
    data() {
        return {
            postInfo: null,
            dialogTitle: "",
            dialog: false,
            upload_dialog:false,
            file: '',
            isDeleteDialog: false,
            keyword: '',
            valid: true,
            user_type:'',
            headerList: [
                {
                    text: "ID",
                    align: "start",
                    value: "id",
                },
                {
                    text: "Post Title",
                    value: "title",
                    width: "15%"
                },
                {
                    text: "Post Desciption",
                    value: "description",
                    width: "20%"
                },
                {
                    text: "Posted User",
                    value: "created_user_name",
                    width: "10%"
                },
                {
                    text: "Operation",
                    value: "operation",
                },
            ],
            postList: [],
            showList: []
        };
    },
    component:{
        "downloadExcel" : JsonExcel
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
        
        this.user_type = this.$store.getters.userType;
        this.$axios
            .get("/posts")
            .then((response) => {
                this.postList = response.data;
                this.showList = this.postList.filter(post=>{
                    return (
                        post.deleted_user_id == null && post.deleted_at == null && post.status == true
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
        filterPosts() {
            this.showList = this.postList.filter(post=>{
                    if(post.deleted_user_id == null && post.deleted_at == null){
                        return (
                            post.title.toLowerCase().includes(this.keyword.toLowerCase()) || 
                            post.description.toLowerCase().includes(this.keyword.toLowerCase()) 
                        );
                    }
            })
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
        },
        uploadPost(){
            this.upload_dialog = true
        },
        Cancel(){
            this.upload_dialog = false
        },
        addPost(){
            let csv_file = this.file;
            let reader = new FileReader();
            let created_user_id = this.$store.getters.userId;
            let created_user_name = this.$store.getters.userName;
            reader.onload = function(e){
                const text = e.target.result
                const result = csvToArray(text)
                for(var i=0; i< result.length-1;i++){
                    axios.post("http://localhost:8000/api/posts/create",
                    {
                        "title": result[i].title,
                        "description": result[i].description,
                        "status": true,
                        "created_user_id": created_user_id,
                        "created_user_name": created_user_name,
                        "deleated_user_id": null,
                        "deleated_at": null
                    }).then(() => {
                        console.log('success')
                    })
                }
            }
            reader.readAsText(csv_file)
           
            function csvToArray(str){
                const headers = str.slice(0,str.indexOf("\n")).split(/[,\r]+/)
                
                const rows = str.slice(str.indexOf("\n") + 1).split("\n")
                const arr = rows.map(function(row){
                    const values = row.split(',')
                    const el = headers.reduce(function(object,header,index){
                        object[header] = values[index]
                        return object
                    },{})
                    return el
                })
                return arr
            }
            
            this.upload_dialog= false
            this.$router.go(this.$router.currentRoute)
           
        },
        expotPostList(arr){
            console.log(arr);
            if (!arr.length) {
                return;
            }

            var csvContent = "data:text/csv;charset=utf-8,";
            // headers
            csvContent += objectToCSVRow(Object.keys(arr[0]));
            arr.forEach(function(item){
                csvContent += objectToCSVRow(item);
            }); 
            var encodedUri = encodeURI(csvContent);
            var link = document.getElementById("export");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "postlist.csv");

            function objectToCSVRow(dataObject) {
                
                var dataArray = new Array;
                for (var o in dataObject) {
                    var innerValue = dataObject[o]===null?'':dataObject[o].toString();
                    var result = innerValue.replace(/"/g, '""');
                    result = '/' + result + '/';
                    dataArray.push(result);
                }
                return dataArray.join(' ') + '\r\n';
            }

        }
    },
};
