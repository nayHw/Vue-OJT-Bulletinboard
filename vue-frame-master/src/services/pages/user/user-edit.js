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
        (v && v.length > 30) || "address must be greater than 50 characters"
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
      profile: ""
    },
    userType : ["Admin","User","Visitor"],
  }),
  computed(){
    if(this.newUser.name){
      this.disabled = false
    }
  },
  mounted() {
    this.$axios
    .get(`/users/${this.$route.params.id}/show`)
    .then((response) => {
        this.newUser = response.data;
    })
    .catch((err) => {
        console.log(err);
    });
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
        if(file.name != ""){
            var reader = new FileReader();
            reader.onload = function () {
                base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "");
                document.getElementById("image").setAttribute("src", `data:image/jpeg;base64,${base64String}`);
                console.log(base64String)
            }
            reader.readAsDataURL(file);
        }else{
            let src =  document.getElementById("profile-img").getAttribute("src");
            document.getElementById("image").setAttribute("src", `${src}`)
        } 
    },
    Cancel(){
        this.dialog = false;
    },
    addUser() {
      this.newUser.profile =  document.getElementById("image").getAttribute("src");
      var input = this.newUser;
      axios.patch(`/users/${this.$route.params.id}/edit`,input).then(() => {
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

