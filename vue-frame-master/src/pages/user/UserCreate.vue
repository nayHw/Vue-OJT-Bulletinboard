<template>
    <div>
        <v-row no-gutters>
            <v-col md="8" offset-md="2">
                <v-card class="mt-8">
                    <v-card-title>
                        <v-row no-gutters>
                            <v-col cols="12">
                            <v-toolbar color="blue darken-1" dark>User Create</v-toolbar>
                            </v-col>
                            <v-col cols="12">
                            <v-form ref="form" v-model="valid" class="mt-10" autocomplete="off">
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                        label="Name"
                                        v-model="newUser.name"
                                        :rules="nameRules"
                                        required
                                        placeholder="Enter name"
                                        outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                        label="Email"
                                        v-model="newUser.email"
                                        :rules="emailRules"
                                        required
                                        placeholder="Enter email"
                                        outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                        label="Password"
                                        v-model="newUser.password"
                                        :rules="passwordRules"
                                        required
                                        placeholder="Enter password"
                                        outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                        label="Phone No"
                                        v-model="newUser.phone"
                                        :rules="phoneRules"
                                        required
                                        placeholder="Enter phone number"
                                        outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6"> 
                                        <v-menu
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="newUser.dob"
                                                label="Date of birth"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                placeholder="1999-04-20"
                                                outlined
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker
                                            v-model="newUser.dob"
                                            @input="menu2 = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select
                                        v-model="newUser.type"
                                        :items="userType"
                                        :rules="[v => !!v || 'Item is required']"
                                        label="User Type"
                                        required
                                        placeholder="Choose Type"
                                        outlined
                                        ></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-textarea
                                        label="Address"
                                        v-model="newUser.address"
                                        :rules="addressRules"
                                        required
                                        placeholder="Enter Address"
                                        outlined
                                        ></v-textarea>
                                    </v-col>
                                    <v-col cols="6">
                                         <v-file-input
                                            label="Profile"
                                            placeholder="Choose Profile Image"
                                            prepend-icon=''
                                            outlined
                                            v-model="newUser.profile"
                                            dense
                                        ></v-file-input>
                                    </v-col>
                                </v-row>
                                <v-btn
                                class="mr-4"
                                color="primary"
                                :disabled="!valid"
                                @click="dialogBox"
                                >Add</v-btn>
                                <v-btn
                                @click="clear"
                                >Clear</v-btn>
                            </v-form>
                            </v-col>
                        </v-row>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        
        <v-row no-gutters>
            <v-col md="8" offset-md="2">
                <v-dialog v-model="dialog" max-width="700">
                    <v-card>
                        <v-card-title>
                            <v-row no-gutters>
                                <v-col cols="12">
                                <v-toolbar color="blue darken-1" dark>User Confirm</v-toolbar>
                                </v-col>
                                <v-col cols="12">
                                <v-form ref="form" v-model="valid" class="mt-10" v-on:submit.prevent="addUser">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                            label="Name"
                                            v-model="newUser.name"
                                            :disabled="true"
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                            label="Email"
                                            v-model="newUser.email"
                                            :disabled="true"
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                            label="Password"
                                            v-model="newUser.password"
                                            :disabled="true"
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                            label="Phone No"
                                            v-model="newUser.phone"
                                            :disabled="true"
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                            label="Date of birth"
                                            v-model="newUser.dob"
                                            :disabled="true"
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-select
                                            v-model="newUser.type"
                                            :items="userType"
                                            value="items.index"
                                            :rules="[v => !!v || 'Item is required']"
                                            label="User Type"
                                            required
                                            outlined
                                            :disabled="true"
                                            ></v-select>

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-textarea
                                            label="Address"
                                            v-model="newUser.address"
                                            :disabled="true"
                                            outlined
                                            ></v-textarea>
                                        </v-col>
                                        <v-col cols="6">
                                            <img id="image">
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

<script src="../../services/pages/user/user-create.js">
</script>
