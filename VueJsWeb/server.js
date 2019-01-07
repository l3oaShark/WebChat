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
// app.use("/", router);
// io.on("connection", function(socket) {
//   console.log("Connected", socket.id);

//   socket.on("disconnect", function() {
//     console.log("Disconnected", socket.id);
//   });

//   socket.on("chat message", function(msg) {
//     console.log("socket by: ", socket.id, " message: " + msg);
//     io.emit("chat message", msg);
//   });
// });

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
    username: String,
    password: String,
  },
  { collection: "AMB" }
);
const User = mongoose.model("User", UserSchema);
// module.exports = User;

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
    var username = req.body.username;
    var password = req.body.password;
    console.log('1');
    var newUser = new User({
      username: username,
      password: password,
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

