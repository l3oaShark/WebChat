<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>AMB Chat</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="messages"></div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">User:</label>
          <input type="text" v-model="user" class="form-control">
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Send</button>
        <div id="message-container"></div>
        <v-text id="message"></v-text>
      </form>
    </div>
  </div>
</template>

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
            this.messages.push(message)
            // you can also do 
            app.$nextTick(function () {
            var messageBox = document.getElementById('chatbox');
            messageBox.scrollTop = messageBox.scrollHeight;
          });
            
        });
    }
};
</script>