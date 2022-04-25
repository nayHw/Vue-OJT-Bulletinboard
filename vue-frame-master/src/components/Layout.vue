<template>
<v-app>
    <v-card color="lighten-4" flat height="200px" tile>
        <v-toolbar dark color="primary" tile>
            <v-container>
                <v-row>
                    <v-toolbar-title class="title">
                        <a href="/post/list" class="white--text text-decoration-none"><span>{{ title }}</span></a>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div class="route-links" v-if="isLoggedIn">
                        <v-list color="primary">
                            <v-list-item v-if="isLoggedIn" @click="postList()" class="float-left">
                                <v-list-item-title>Posts</v-list-item-title>
                            </v-list-item>
                            <v-list-item v-if="userType == 'Admin'" @click="userList()">
                                <v-list-item-title>Users</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </div>

                    <div class="route-links">
                        <v-menu offset-y v-if="isLoggedIn">
                            <template v-slot:activator="{ on }">
                                <v-btn class="ma-2" text v-on="on">
                                    {{ userName }}
                                    <v-icon>arrow_drop_down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click="showProfile()">
                                    <v-list-item-title>Profile</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="logout()">
                                    <v-list-item-title>Logout</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <router-link class="route-link" :to="{ name: 'login' }" v-if="!isLoggedIn">Login</router-link>
                    </div>
                </v-row>
            </v-container>
        </v-toolbar>
        <v-container>
            <router-view></router-view>
        </v-container>
    </v-card>
</v-app>
</template>

<script src="../services/components/layout.js">
</script>

<style scoped src="../assets/css/components/layout.css">
</style>
