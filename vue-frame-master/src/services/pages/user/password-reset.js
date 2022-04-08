export default {
    data: () => ({
        valid: true,
        email: "",
        password: "",
        confirm:"",
        error: "",
        disabled: true,
        // validation rules for user email.
        emailRules: [
            value => !!value || "The email field is required.",
            value => /.+@.+\..+/.test(value) || "E-mail must be valid."
        ],

        // validation rules for password.
        pwdRules: [
            v => !!v || 'Please type password.',
            v => (v && v.length >= 8) || 'minimum 8 characters',
            v=> v.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) || 'at least one number and one special character'
          ],
        // pwdRules: [value => !!value || "The password field is required."]
    }),
    mounted() {
      this.$axios
      .get(`/users/${this.$route.params.id}`)
      .then((response) => {
          this.email = response.data.email;
      })
      .catch((err) => {
          console.log(err);
      });
    },
    methods: {
        /**
         * This to submit password reset form.
         * @returns void
         */
        reset() {
            if(this.password === this.confirm){
                this.$axios
                .patch(`/users/${this.$route.params.id}`,
                    {"password": this.password}
                )
                .then(() => {
                    this.$router.go(-1)
                })
                .catch((err) => {
                    console.log(err);
                });
                
            }else{
                this.password =""
                this.confirm = ""
                this.error = "!password do not match"
            }
            
        }
    }
};
