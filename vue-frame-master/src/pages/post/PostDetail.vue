<template>
  <v-card class="mx-auto" max-width="700">
    <v-img
      class="white--text align-end"
      height="300px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>{{showList.title}}</v-card-title>
    </v-img>

    <v-card-text class="text--primary">
      <div>{{showList.description}}</div>
    </v-card-text>

    <v-card-actions>
      <v-card-text color="orange" text>Posted by {{showList.created_user_name}}</v-card-text>
      <v-btn
      color="primary" @click="back">Back</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="../../services/post/post-detail.js">
</script>

