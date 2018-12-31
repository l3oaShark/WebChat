new Vue({
  el:"#vue-app",
  data:{
    newData:{
      userName:"User Name",
      Email:"Email",
      Password:"Password",
      ConfirmPassword:"Confirm Password"
    },
    Register:[
      {
        userName:"admin",
        Password:"admin123!@#"
      },
      {
        userName:"thel3oat",
        Password:"thel3oat5678"
      }
    ]
  },methods:{
    addRegister:function(){
      this.Register.push({
        userName:this.newData.userName,
        Password:this.newData.Password
      });
      this.newData.userName='';
      this.newData.Password='';
    }
  }
})
