import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    valid: true,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu2: false,
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
    passwordRules: [
      v => !!v || 'Please type password.',
      v => (v && v.length >= 8) || 'minimum 8 characters',
      v=> v.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) || 'at least one number and one special character'
    ],
    phoneRules: [
      v => !!v || "Phone Number is required",
      v =>
        (v && v.length == 11) || "phone number is required"
    ],
    dobRules: [
      v => !!v || "Dob is required",
      v => (v && v.length > 5) || "dob must be greater than 5 characters"
    ],
    typeRules: [
      v => !!v || "Address is required",
      v =>
        (v && v.length > 50) || "address must be greater than 50 characters"
    ],
    newUser: {
      name: "",
      email: "",
      password: "",
      phone: "",
      dob: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      address: "",
      type:"",
      created_user_id:"",
      profile: "",
      image: ""
    },
    userType : ["Admin","User","Visitor"],
  }),
  mounted() {
    this.newUser.created_user_id = this.$store.getters.userId;
    // this.newUser.created_user_name = this.$store.getters.userName;
  },
  methods: {
    clear() {
      this.newUser.name="";
      this.newUser.email="";
      this.newUser.password="";
      this.newUser.phone="";
      this.newUser.dob="";
      this.newUser.address="";
      this.newUser.profile=""
    },
    dialogBox() {
      this.dialog = true;
      let base64String = "";
      var file = this.newUser.profile;
      var reader = new FileReader();
      reader.onload = function () {
        base64String = reader.result.replace("data:", "")
              .replace(/^.+,/, "");
        document.getElementById("image").setAttribute("src", `data:image/jpeg;base64,${base64String}`);   
        console.log(base64String)
      }
      reader.readAsDataURL(file);
    },
    Cancel(){
        this.dialog = false;
    },
    addUser() {
      this.newUser.profile =  document.getElementById("image").getAttribute("src");
      var input = this.newUser;
      axios.post("http://localhost:8000/register",input).then(() => {
        this.newUser = {
          name: "",
          email: "",
          password: "",
          phone: "",
          dob: "",
          address: "",
          type:"",
          created_user_id:"",
          profile: ""
        }
        setTimeout(()=>{
          this.$router.push("/user/list");
        },2000);
      });
    }
  }
};

