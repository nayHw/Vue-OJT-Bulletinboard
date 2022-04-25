<template>
<v-card>
    <v-card-title>
        Post list
        <v-spacer></v-spacer>
        <div>
            <v-row class="filter-bar">
                <v-form ref="form" class="d-flex" v-on:submit.prevent="filterPosts">
                    <v-text-field label="Search keyword" hide-details="auto" v-model="keyword"></v-text-field> 
                    <v-btn class="post-list-btn mr-4" color="primary" type="submit">Filter</v-btn>
                </v-form>
                <v-btn class="post-list-btn mr-4" color="primary" v-if="isLoggedIn">    
                    <router-link to="/post/create" class="white--text text-decoration-none">
                        Create
                    </router-link>
                </v-btn>    
                <v-btn v-if="isLoggedIn" class="post-list-btn mr-4" color="primary" @click="uploadPost">
                    Upload
                </v-btn>
                <v-btn class="post-list-btn mr-4" color="primary" @click="expotPostList(showList)">
                    <a id="export" class="white--text text-decoration-none" >Download</a>
                </v-btn>
            </v-row>
        </div>
    </v-card-title>
    <v-container>
        <CssLoader v-show="loader"></CssLoader>
        <v-data-table :headers="headers" :items="showList" v-show="!loader">
            <template v-slot:[`item.title`]="{ item }">
                <a v-if="item.id" @click="detailPost(item)">{{item.title}}</a>
            </template>
            <template v-slot:[`item.operation`] = "{ item }">
                <v-row>
                    <div class="operation-btn">
                        <v-btn color="primary" class="post-list-btn">
                            <router-link :to="`/post/${item.id}/edit`" class="white--text text-decoration-none">
                                Edit
                            </router-link>
                        </v-btn>
                    </div>
                    <div class="operation-btn">
                        <v-btn color="error" class="post-list-btn" @click="postDelete(item.id)">Delete</v-btn>
                    </div>
                </v-row>
            </template>
        </v-data-table>
    
        <v-row no-gutters>
            <v-col md="6" offset-md="2">
                <v-dialog v-model="detail_dialog" class="box-shadow">
                    <v-card class="mx-auto" max-width="700">
                        <v-img
                        class="white--text align-end"
                        height="300px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        >
                            <v-card-title>{{postDetail.title}}</v-card-title>
                        </v-img>

                        <v-card-text class="text--primary">
                            <div>{{postDetail.description}}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-card-text color="orange" text>Posted by {{postDetail.created_user_name}}</v-card-text>
                                
                            <v-btn class="float-right"
                            @click="Cancel"
                            >Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        
    </v-container>
    <v-row no-gutters>
        <v-col md="6" offset-md="3">
            <v-dialog v-model="upload_dialog" max-width="500">
                <v-card>
                    <v-card-title>
                        <v-row no-gutters>
                            <v-col cols="12">
                            <v-toolbar color="blue darken-1" dark>Post Upload</v-toolbar>
                            </v-col>
                            <v-col cols="12">
                            <v-form ref="form" v-model="valid" class="mt-10" v-on:submit.prevent="addPost">
                                <v-row>
                                <v-col>
                                    <v-file-input
                                        label="Choose csv file"
                                        v-model="file"
                                        accept=".csv"
                                        outlined
                                        dense
                                    ></v-file-input>
                                </v-col>
                                </v-row>
                                <v-btn
                                class="mr-4"
                                color="primary"
                                type="submit"
                                >Upload</v-btn>
                                <v-btn
                                @click="Cancel"
                                >Cancel</v-btn>
                            </v-form>
                            </v-col>
                        </v-row>
                    </v-card-title>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</v-card>
</template>

<script src="../../services/post/post-list.js">
</script>

<style scoped src="../../assets/css/pages/post/post-list.css">
</style>
<style>
    .v-dialog--active{
        box-shadow: none;
    }
    .v-dialog--active .v-card__text{
        color: rgb(187, 126, 14) !important;
    }
</style>