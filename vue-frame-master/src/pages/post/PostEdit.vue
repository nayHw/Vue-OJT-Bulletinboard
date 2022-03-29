<template>
  <div>
      <v-row no-gutters>
          <v-col md="6" offset-md="3">
          <v-card class="mt-8">
              <v-card-title>
                  <v-row no-gutters>
                      <v-col cols="12">
                      <v-toolbar color="blue darken-1" dark>Post Edit</v-toolbar>
                      </v-col>
                      <v-col cols="12">
                      <v-form ref="form" class="mt-10">
                          <v-row>
                            <v-col>
                                <v-text-field
                                label="Title"
                                v-model="editPost.title"
                                :rules="titleRules"
                                required
                                placeholder="Enter post title"
                                outlined
                                ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                                <v-textarea
                                label="Description"
                                v-model="editPost.description"
                                :rules="descriptionRules"
                                required
                                placeholder="Enter post description"
                                outlined
                                ></v-textarea>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="3" class="mt-2">
                              <v-checkbox
                                v-model="editPost.status"
                                label="Active"
                                value="editPost.status"
                              ></v-checkbox>
                            </v-col>
                          </v-row>
                          <v-btn
                          class="mr-4"
                          color="primary"
                          :disabled="editPost.title === '' || editPost.description === ''"
                          @click="dialogBox"
                          >Update Post</v-btn>
                          <v-btn
                          @click="clear"
                          :disabled="editPost.title === '' && editPost.description === ''"
                          >Clear</v-btn>
                      </v-form>
                      </v-col>
                  </v-row>
              </v-card-title>
          </v-card>
          </v-col>
      </v-row>
      <v-row no-gutters>
          <v-col md="6" offset-md="3">
              <v-dialog v-model="dialog" max-width="500">
                  <v-card>
                      <v-card-title>
                          <v-row no-gutters>
                              <v-col cols="12">
                              <v-toolbar color="blue darken-1" dark>Post Confirm</v-toolbar>
                              </v-col>
                              <v-col cols="12">
                              <v-form ref="form" v-model="valid" class="mt-10" v-on:submit.prevent="updatePost">
                                  <v-row>
                                  <v-col>
                                      <v-text-field
                                      label="Title"
                                      v-model="editPost.title"
                                      :rules="titleRules"
                                      required
                                      placeholder="Enter post title"
                                      outlined
                                      disabled="true"
                                      ></v-text-field>
                                  </v-col>
                                  </v-row>
                                  <v-row>
                                  <v-col>
                                      <v-textarea
                                      label="Description"
                                      v-model="editPost.description"
                                      :rules="descriptionRules"
                                      required
                                      placeholder="Enter post description"
                                      outlined
                                      disabled="true"
                                      ></v-textarea>
                                  </v-col>
                                  </v-row>
                                  <v-btn
                                  class="mr-4"
                                  color="primary"
                                  type="submit"
                                  >Confirm</v-btn>
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
  </div>
</template>

<script src="../../services/post/post-edit.js">
</script>
