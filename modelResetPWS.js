new Vue({
  el:"#vue-app",
  data:{
    newData:{
      userNameReset:"User Name",
      EmailReset:"Email"
    },
    ResetPWS:[
      {
        userNameReset:"admin",
        EmailReset:"admin123!@#"
      },
      {
        userNameReset:"thel3oat",
        EmailReset:"thel3oat5678"
      }
    ]
  },methods:{
    addRegister:function(){
      this.ResetPWS.push({
        userNameReset:this.newData.userNameReset,
        Email:this.newData.EmailReset
      });
      this.newData.userNameReset='';
      this.newData.EmailReset='';
    }
  }
})
