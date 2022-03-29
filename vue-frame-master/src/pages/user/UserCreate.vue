<template>
    <div>
        <v-row no-gutters>
            <v-col md="6" offset-md="3">
                <v-card class="mt-8">
                    <v-card-title>
                        <v-row no-gutters>
                            <v-col cols="12">
                            <v-toolbar color="blue darken-1" dark>User Create</v-toolbar>
                            </v-col>
                            <v-col cols="12">
                            <v-form ref="form" class="mt-10">
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                        label="Name"
                                        v-model="newUser.name"
                                        :rules="nameRules"
                                        required
                                        placeholder="Enter name"
                                        outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
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
                                    <v-col>
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
                                    <v-col>
                                        <v-text-field
                                        label="Date of birth"
                                        v-model="newUser.dob"
                                        :rules="dobRules"
                                        required
                                        placeholder="dob"
                                        outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-textarea
                                        label="Address"
                                        v-model="newUser.address"
                                        :rules="addressRules"
                                        required
                                        placeholder="Enter Address"
                                        outlined
                                        ></v-textarea>
                                    </v-col>
                                </v-row>
                                <v-btn
                                class="mr-4"
                                color="primary"
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
            <v-col md="6" offset-md="3">
                <v-dialog v-model="dialog" max-width="500">
                    <v-card>
                        <v-card-title>
                            <v-row no-gutters>
                                <v-col cols="12">
                                <v-toolbar color="blue darken-1" dark>User Confirm</v-toolbar>
                                </v-col>
                                <v-col cols="12">
                                <v-form ref="form" v-model="valid" class="mt-10" v-on:submit.prevent="addUser">
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                            label="Name"
                                            v-model="newUser.name"
                                            :disabled="true"
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                            label="Email"
                                            v-model="newUser.email"
                                            :disabled="true"
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                            label="Phone No"
                                            v-model="newUser.phone"
                                            :disabled="true"
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                            label="Date of birth"
                                            v-model="newUser.dob"
                                            :disabled="true"
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-textarea
                                            label="Address"
                                            v-model="newUser.address"
                                            :disabled="true"
                                            outlined
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

<script src="../../services/pages/user/user-create.js">
</script>
