// Initializing Express 
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./app/models/index.js')
const dbConfig = require('./app/config/db.config');
const User = require('./app/models/UserModel')


// Middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
///database connections
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
  function initial() {
  User.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new User({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user'");
        });
      }
    });
  }
//routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
///controllers same as above routes
// const HomeController = require('./controllers/HomeController')
// const EventController = require('./controllers/EventController')
// const groupController = require('./controllers/groupController')
// const userController = require('./controllers/usersController')
// app.use(HomeController)
// app.use(EventController)
// app.use(groupController)
// app.use(userController)
//set port and listen
const port = process.env.PORT || 8000
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.listen(port, () => {
  console.log(`Your app is running on port ${port}`)
})