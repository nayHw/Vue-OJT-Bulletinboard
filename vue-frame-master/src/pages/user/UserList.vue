<template>
<v-card>
    <v-card-title>
        Post list
        <v-spacer></v-spacer>
        <div>
            <v-row class="filter-bar">
                <v-form ref="form" class="d-flex" v-on:submit.prevent="filterUser">
                    <v-text-field label="Search keyword" hide-details="auto" v-model="keyword"></v-text-field> 
                    <v-btn class="post-list-btn mr-4" color="primary" type="submit">Filter</v-btn>
                </v-form>
                <v-btn class="post-list-btn mr-4" color="primary">    
                    <router-link to="/user/create" class="white--text text-decoration-none">
                        Create
                    </router-link>
                </v-btn>
            </v-row>
        </div>
    </v-card-title>
    <v-container>
        <v-data-table :headers="headers" :items="userList">
            <template v-slot:[`item.name`]="{ item }">
                <a v-if="item.id" :href="`/user/${item.id}/detail`">{{item.name}}</a>
            </template>
            <template v-slot:[`item.operation`] = "{ item }">
                <v-row>
                    <div class="operation-btn">
                        <v-btn color="primary" class="post-list-btn">
                            <router-link :to="`/user/${item.id}/edit`" class="white--text text-decoration-none">
                                Edit
                            </router-link>
                        </v-btn>
                    </div>
                    <div class="operation-btn">
                        <v-btn color="error" class="post-list-btn" @click="deleteUser(item.id)">Delete</v-btn>
                    </div>
                </v-row>
            </template>
        </v-data-table>
    </v-container>
</v-card>
</template>

<script src="../../services/pages/user/user-list.js">
</script>

<style scoped src="../../assets/css/pages/post/post-list.css">
</style>
