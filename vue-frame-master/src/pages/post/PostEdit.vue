<template>
  <v-row>
    <v-col>
      <v-dialog transition="dialog-top-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-card class="mt-8">
            <v-card-title>
              <v-row no-gutters>
                <v-col cols="12">
                   <v-toolbar color="primary" dark>Edit Post </v-toolbar>
                </v-col>
                <v-col cols="12">
                  <v-form ref="form" v-model="valid" class="mt-10" v-on:submit.prevent="addItem">
                    <v-row>
                      <v-col cols="2">
                        <v-card-text>Title</v-card-text>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field label="Enter title" v-model="newItem.title" :rules="titleRules" required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">
                        <v-card-text>Description</v-card-text>
                      </v-col>
                      <v-col cols="5">
                        <v-textarea label="Enter Description" v-model="newItem.description" :rules="descriptionRules" required></v-textarea>
                      </v-col>
                    </v-row>
                    <v-checkbox
                        v-model="newItem.checkbox"
                        label="Active"
                        required
                        ></v-checkbox>
                    <v-btn class="mr-4"
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      :disabled="newItem.title === '' || newItem.description === ''"
                    >Add Post</v-btn>
                    <v-btn @click="clear" :disabled="newItem.title === '' && newItem.description === ''">Clear</v-btn>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </template>
        <template v-slot:default="dialog">
          <v-row justify="space-around">
            <v-col cols="8">
              <v-card>
                <v-card-title>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-toolbar color="primary" dark>Create Post Confirm</v-toolbar>
                    </v-col>
                    <v-col cols="12">
                      <v-form ref="form" class="mt-10" v-on:submit.prevent="addItem">
                        <v-row>
                          <v-col cols="2">
                            <v-card-text>Title</v-card-text>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field :disabled="true" v-model="newItem.title"></v-text-field>
                          </v-col> 
                        </v-row>
                        <v-row>
                          <v-col cols="2">
                            <v-card-text>Description</v-card-text>
                          </v-col>
                          <v-col cols="5">
                            <v-textarea :disabled="true" v-model="newItem.description"></v-textarea>
                          </v-col>
                        </v-row>
                        <v-btn class="mr-4" type="submit" color="primary">Confirm</v-btn>
                        <v-btn @click="dialog.value = false">Close</v-btn>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script src="../../services/post/post-edit.js">
</script>
