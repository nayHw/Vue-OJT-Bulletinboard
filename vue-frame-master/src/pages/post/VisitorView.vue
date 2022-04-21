<template>
  <div>
    <CssLoader v-show="loader"></CssLoader>
    <v-row v-show="!loader">
      <v-col cols="md-3"  v-for="post in showList" :key="post.id">
        <v-card class="mr-3">
          <v-img
            class="white--text align-end"
            height="300px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{post.title}}</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>{{post.description}}</div>
          </v-card-text>

          <v-card-actions>
            <v-card-text color="orange" text>Posted by {{post.created_user_name}}</v-card-text>
            <v-btn
            color="primary">
            <a v-if="post.id" :href="`/post/${post.id}/detail`" class="white--text text-decoration-none">View Detail</a>
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import CssLoader from "../../components/CssLoader.vue"
export default{
  data(){
    return{
      loader:true,
      showList: [],
      postList:[],
    }
  },
  components:{
    CssLoader
  },
  mounted() {
      setTimeout(() => (this.loader = false), 1000)
      this.$axios
          .get("/posts")
          .then((response) => {
              this.postList = response.data;
              this.showList = this.postList.filter(post=>{
                  return (
                      post.deleted_user_id == null && post.deleted_at == null && post.status == true
                  );
              });
              console.log(this.showList)
          })
          .catch((err) => {
              console.log(err);
          });
  },
}
</script>
