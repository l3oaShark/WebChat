new Vue({
  el:"#vue-app",
  data:{
    newData:{
      userName:"User Name",
      Password:"Password",
    },
    empGroup:[
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
    addlogin:function(){
      this.empGroup.push({
        userName:this.newData.userName,
        Password:this.newData.Password
      });
      this.newData.userName='';
      this.newData.Password='';
    }
  }
})
