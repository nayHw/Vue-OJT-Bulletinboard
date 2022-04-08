<template>
<v-card class="mx-auto" max-width="344">
    <v-card-title class="login-title">
        <span class="title font-weight-light">Password Reset</span>
    </v-card-title>
    <v-form ref="form" v-model="valid" @submit.prevent="reset">
        <v-card-text>
            <div class="login-error" v-if="error">{{error}}</div>
            <div class="login-input">
                <v-text-field v-model="email" :disabled="disabled" type="text" label="Email" :rules="emailRules" hide-details="auto"></v-text-field>
            </div>
            <div class="login-input">
                <v-text-field v-model="password" type="password" label="Password" :rules="pwdRules" hide-details="auto"></v-text-field>
            </div>
            <div class="login-input">
                <v-text-field v-model="confirm" type="password" label="Confirm Password" :rules="pwdRules" hide-details="auto"></v-text-field>
            </div>
        </v-card-text>
        <v-card-actions>
            <div class="login-action">
                <v-spacer></v-spacer>
                <v-btn type="submit" :disabled="!valid" large color="primary">Change</v-btn>
            </div>
        </v-card-actions>
    </v-form>
</v-card>
</template>

<script src="../../services/pages/user/password-reset.js">
</script>

<style scoped src="../../assets/css/pages/user/login..css">

</style>
