import axios from "axios";
export default {
  data: () => ({
    name: '',
    src:'',
    id:'',
    messages: [
      {
        title: "Eamil",
        message: ``,
        color: "deep-purple lighten-1"
      },
      {
        title: "Phone no",
        message: "",
        color: "green"
      },
      {
        title: "Date of birth",
        message: "",
        color: "deep-purple lighten-1"
      },
      {
        title: "Type",
        message: "",
        color: "green"
      },
      {
        title: "Address",
        message: "",
        color: "deep-purple lighten-1"
      }
    ],
    userType : ["Admin","User","Visitor"],
    showList:[]
  }),
  created() {
      axios
        .get(`/users/${this.$route.params.id}`)
        .then(response => {
            this.showList = response.data;
            this.name = this.showList.name;
            this.src = this.showList.profile;
            this.id = this.showList.id;
            this.messages[0].message = this.showList.email;
            this.messages[1].message = this.showList.phone;
            this.messages[2].message = new Date(this.showList.dob).toDateString().replace(/ /g, ', ')
            this.messages[3].message = this.showList.type;
            this.messages[4].message = this.showList.address;
            console.log(this.showList)
        })
        .catch(err => {
            console.log(err);
        });
  },

};