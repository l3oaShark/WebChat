// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const morgan = require("morgan");
// const fs = require("fs");
// const app = express();
// const router = express.Router();
// const http = require("http").Server(app);
// const io = require("socket.io")(http);

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const app = express();
const router = express.Router();
const http = require("http").Server(app);
// const server = app.listen(8081);
const port = process.env.API_PORT || 8081;
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
//connect to mongodb
mongoose
  .connect(
    "mongodb://localhost:27017/amb",
    function() {
      console.log("Connection has been made");
    }
  )
  .catch(err => {
    console.error("App starting error:", err.stack);
    process.exit(1);
  });

// Include controllers
// fs.readdirSync("controllers").forEach(function(file) {
//   if (file.substr(-3) == ".js") {
//     const route = require("./controllers/" + file);
//     route.controller(app);
//   }
// });

router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});

// // const port = process.env.API_PORT || 8081;
app.use("/", router);
io.on("connection", function(socket) {
  console.log("Connected", socket.id);

//////////// add
//   connection.push(socket);
//   console.log("Connected: % socket conneted",connection.length)

// socket.on('disconnect',function(data){
//   connection.spice(connection.indexOf(socket),1);
//   console.log("Disconnected: % socket conneted",connection.length)

// });

////////////// end add

  socket.on("disconnect", function() {
    console.log("Disconnected", socket.id);
  });

  socket.on("chat message", function(msg) {
    console.log("socket by: ", socket.id, " message: " + msg);
    io.emit("chat message", msg);
  });
});


server.listen(8081, function() {
  console.log(`api running on port`);

  io.on("connection", function(socket) {
    console.log("a user connected");
    console.log(socket.id);
    socket.on("disconnect", function() {
      console.log("Disconnected", socket.id);
    });

    socket.on("SEND_MESSAGE", function(msg) {
      console.log("socket by: ", socket.id, " message: " + msg);
      io.emit("MESSAGE", msg);
    });
  });
  
});


const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    nickname: String,
    username: String,
    email: String,
    password: String,
    repasseord: String,
  },
  { collection: "AMB" }
);
const User = mongoose.model("User", UserSchema);
// module.exports = User;
//let io =  socket(server);
io.on("connection", function(socket){
  // console.log("Socket Connection Established with ID :"+ socket.id)
  // socket.on("chat", async function(chat){
  //   chat.created = new Date()
  //   let response = await new message(chat).save()
  //   socket.emit("chat",chat)
  //})
  socket.username = 'anonymous';
  socket.on('change username', (name) => socket.username = name)
  socket.on('message', (msg) => io.emit('message',
  { 'user': socket.username, 'message': msg }))
  socket.on('join', (username) => {
    if (username != null) {
      socket.username = username
    }
    socket.broadcast.emit('message',
    { 'user': 'Server', 'message': socket.username + ' has joined!'})
  })
})
app.get('/chat', async (req,res) => {
  let result = await message.find()
  res.send(result);
})
app.get("/register", (req, res) => {
    
    // var username = "test"
    // var password = "asdf"
    // var newUser = new User({
    //     username: username,
    //     password: password,
    //   });
    //   newUser.save((error, users) => {
    //     if (error) {
    //       console.log(error);
    //     }
        User.find({}, (error, users) => {
            if (error) {
              console.log(error);
            }
            res.send({
              users
            });
          });
        
    //   });
  });
  app.post("/register", (req, res, next) => {
    var nickname = req.body.nickname;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var repasseord = req.body.repasseord;
    console.log('1');
    var newUser = new User({
      nickname: nickname,
      username: username,
      email: email,
      password: password,
      repasseord: repasseord,
    });
    console.log(username)
    User.find({ username: username }, (error, users) => {
      // console.log(Object.keys(users).length);
      // console.log(JSON.stringify(users, 0, 2));
      if (Object.keys(users).length > 0) {
        console.log('true');

        // res.render("register",{ statusregis: "Username already use" });
      } else {
        console.log('false')
        newUser.save((error, users) => {
          if (error) {
            console.log(error);
          }
          res.send(users);
          
        });
        // res.redirect('login')
      }
    });
  });
  // app.post("/login", (req, res, next) => {
  //   var username = req.body.username;
  //   var password = req.body.password;
  //   console.log('1login');
  //   var newUser = new User({
  //     username: username,
  //     password: password,
  //   });
  //   console.log(username)
  //   User.find({ username: username }, (error, users) => {
  //     // console.log(Object.keys(users).length);
  //     // console.log(JSON.stringify(users, 0, 2));
  //     if (Object.keys(users).length > 0) {
  //       console.log('true');

  //       // res.render("register",{ statusregis: "Username already use" });
  //     } else {
  //       console.log('false')
  //       newUser.save((error, users) => {
  //         if (error) {
  //           console.log(error);
  //         }
  //         res.send(users);
          
  //       });
  //       // res.redirect('login')
  //     }
  //   });
  // });

  app.post("/login", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + password);
    UserSchema.find(
      { username: username, password: password },
      (error, users) => {
        // console.log(Object.keys(users).length);
        // console.log(JSON.stringify(users, 0, 2));
        if (Object.keys(users).length > 0) {
          res.send(Object.keys(users).length > 0);
        } else {
          res.send(Object.keys(users).length > 0);
        }
      }
    );
  });
