import { mapGetters } from "vuex";
import axios from "axios";

import CssLoader from "../../components/CssLoader.vue"

export default {
    data() {
        return {
            loader:true,
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
    components:{
      CssLoader
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
        setTimeout(() => (this.loader = false), 5000)
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
            if (!arr.length) {
                return;
            }   
            JSONToCSVConvertor(arr, "PostList", true);
            function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
                //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                var CSV = 'sep=,' + '\r\n\n';
                //This condition will generate the Label/Header
                if (ShowLabel) {
                    var row = "";
                    //This loop will extract the label from 1st index of on array
                    for (var index in arrData[0]) {
                        //Now convert each value to string and comma-seprated
                        row += index + ',';
                    }
                    row = row.slice(0, -1);
                    //append Label row with line break
                    CSV += row + '\r\n';
                }
                //1st loop is to extract each row
                for (var i = 0; i < arrData.length; i++) {
                    row = "";
                    //2nd loop will extract each column and convert it in string comma-seprated
                    for (var ind in arrData[i]) {
                        row += '"' + arrData[i][ind] + '",';
                    }
                    row.slice(0, row.length - 1);
                    //add a line break after each row
                    CSV += row + '\r\n';
                }
                if (CSV == '') {        
                    alert("Invalid data");
                    return;
                }   

                ReportTitle.replace(/ /g,"_");   

                //Initialize file format you want csv or xls
                var urencodedUri = 'data:text/csv;charset=utf-8,' + escape(CSV);

                var link = document.getElementById("export");
                link.setAttribute("href", urencodedUri);
                link.setAttribute("download", ReportTitle+".csv");
            }
        }
    },
};
