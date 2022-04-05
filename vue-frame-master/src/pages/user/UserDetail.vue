<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-spacer></v-spacer>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img 
                v-if="src"
                alt="user"
                :src="src"
              />
              <img
                v-if="!src"
                alt="user 01"
                src="../../assets/logo.png"
              />
            </v-avatar>
            <p class="ml-3">{{name}}</p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">Personal Infomation</div>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.title }}</strong>
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
          <v-btn color="primary" class="float-right mb-5">
            <router-link :to="`/user/${id}/edit`" class="white--text text-decoration-none">
              Edit
            </router-link>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script src="../../services/pages/user/user-detail.js">
</script>


