const mongoose = require('mongoose')
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser')
const users = require('./routes/api/users')
const User = require('./models/User')
const passport = require('passport')


mongoose
    .connect(db)
    .then(() => console.log("Connected to mongoDB successfully"))
    .catch(err => console.log(err))



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./config/passport')(passport);


app.get('/', (req, res) => {
    // const user = new User ({
    //     handle: "casstiel",
    //     email: 'casstiel@casstiel.cass',
    //     password: "casstiel123456"
    // })
    // user.save()
    res.send("Hello World!")
});


app.use('/api/users', users)


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`))
