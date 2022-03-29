
// import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    valid: true,
    // disabled:true,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length > 5) || "name must be greater than 5 characters"
    ],
    addressRules: [
      v => !!v || "Address is required",
      v =>
        (v && v.length > 50) || "address must be greater than 50 characters"
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    phoneRules: [
      v => !!v || "Phone Number is required",
      v =>
        (v && v.length == 11) || "phone number is required"
    ],
    dobRules: [
      v => !!v || "Name is required",
      v => (v && v.length > 5) || "name must be greater than 5 characters"
    ],
    typeRules: [
      v => !!v || "Address is required",
      v =>
        (v && v.length > 50) || "address must be greater than 50 characters"
    ],
    newUser: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      address: ""
    }
  }),
  mounted() {
    // this.newUser.created_user_id = this.$store.getters.userId;
    // this.newUser.created_user_name = this.$store.getters.userName;
  },
  methods: {
    clear() {
      this.newUser.name="";
      this.newUser.email="";
      this.newUser.phone="";
      this.newUser.dob="";
      this.newUser.address="";
    },
    dialogBox() {
      this.dialog = true;
    },
    Cancel(){
        this.dialog = false;
    },
    addUser() {
      var input = this.newUser;
      console.log(input);
      // axios.post("http://localhost:8000/api/users", input).then(() => {
      //   this.newUser = {
      //     name: "",
      //     email: "",
      //     phone: "",
      //     dob: "",
      //     address: ""
      //   };
      //   this.$router.push("/user/list");
      // });
    }
  }
};

