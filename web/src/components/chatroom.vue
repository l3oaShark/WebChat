<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>AMB Chat</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="messages"></div>
        <div class="col-md-4">
        <div class="well">
          <ul class="list-group" id="user"></ul>
        </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      
      <form @submit.prevent="setUsername">
        <div class="gorm-group">
          <label for="user">User:</label>
          <input type="text" v-model="user" class="form-control">
           <!-- <input type="submit" value="Join" /> -->
          <!-- <input type="text" placeholder="Username..." v-model="username" /> -->
        </div>
        </form>
        <form @submit.prevent="sendMessage">
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control">
         <input type="submit" value="Send" />
        </div>
        </form>
        <!-- <button type="submit" class="btn btn-success">Send</button> -->
        <div id="chatbox"></div>
        <li v-for="message in messages" :key='message.id'>
          <b>{{ message.user }}:</b> {{ message.message }}
        </li>
      
    </div>
  </div>
</template>
<script src="/socket.io/socket.io.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      user: "",
      message: "",
      messages: [],
      socket: io("localhost:8081")
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            this.message = ''
    }
    
  },
  mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            //this.messages.push(message)
            // you can also do 
          //   app.$nextTick(function () {
          //   var messageBox = document.getElementById('chatbox');
          //   messageBox.scrollTop = messageBox.scrollHeight;
          //   console.log("dsfdsf");
          // });
            
        });
    },
  
}

</script>