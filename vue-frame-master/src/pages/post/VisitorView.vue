<template>
  <div class="d-flex">
    <v-card class="mr-3" max-width="300" v-for="post in showList" :key="post.id">
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
        color="primary" @click="back">
        <a v-if="post.id" :href="`/post/${post.id}/detail`" class="white--text text-decoration-none">View Detail</a>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default{
  data(){
    return{
      showList: [],
      postList:[],
    }
  },
  mounted() {
      this.$axios
          .get("/posts")
          .then((response) => {
              this.postList = response.data;
              this.showList = this.postList.filter(post=>{
                  return (
                      post.deleted_user_id == null && post.deleted_at == null
                  );
              });
          })
          .catch((err) => {
              console.log(err);
          });
          console.log(this.showList);
  },
}
</script>

