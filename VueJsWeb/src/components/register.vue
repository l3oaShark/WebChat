<template>
    <div class="log">
        <h1>{{msg}}</h1>
        <v-form @submit.prevent="handleSubmit" v-model="valid" ref="form">

            <!-- <div class="from-group">
                <label for='nickname'>Nick Name</label>
                <input type="text" v-model="nickname" name="nickname" class="form-control" :class="{ 'is-invalid': submitted && !nickname }" />
                <div v-show="submitted && !nickname" class="invalid-feedback">Nickname is required</div>
            </div><br> -->

            <div class="from-group">
                <label for='username'>Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" required/>
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div><br>

            <!-- <div class="from-group">
                <label for='email'>E-mail</label>
                <input type="text" v-model="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && !email }" />
                <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
            </div><br> -->

            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div><br>

            <!-- <div class="form-group">
                <label htmlFor="repassword">Re-Password</label>
                <input type="repassword" v-model="repassword" name="repassword" class="form-control" :class="{ 'is-invalid': submitted && !repassword }" />
                <div v-show="submitted && !repassword" class="invalid-feedback">RePassword is required</div>
            </div><br> -->
            
                <button v-on:click="submit" :disabled="!valid"> Submit </button>
                <!-- <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/register" class="btn btn-link">Register</router-link> -->

            

        </v-form>
    </div>
</template>

<script>
import axios from "axios";
//import component from '/socket.io/socket.io.js'

export default {
  data: () => ({
    //component,
    valid: true,
    username: "",
    password: "",
    statusregis: "",
    userRules: [v => !!v || "Username is required"],
    passRules: [v => !!v || "Password is required"]
  }),

  methods: {
    clear() {
      this.$refs.form.reset();
    },
    btnBack() {
      this.$router.push({ name: "login" });
      this.$refs.form.reset();
    },
    submit() {
        
    //    if (this.$refs.form.validate()) {
        return axios({
          method: "post",
          data: {
            username: this.username,
            password: this.password,
          },
          url: "http://localhost:8081/register",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(() => {
            this.$router.push({ name: "login" });
            this.$refs.form.reset();
          })
          .catch(() => {});
    //    }
    //   return true;
    }
  }
};
</script>