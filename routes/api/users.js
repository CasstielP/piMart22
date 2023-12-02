const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')


router.get("/test", (req, res) => {
//  console.log('=====================sfasdfasdfasdfasdfasdf', req)
 res.json({msg: "This is the users route "})
}
)



// user sign-up
router.post('/register', (req, res) => {
    // Check to make sure nobody has already registered with a duplicate email
    console.log('=====================')
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          // Throw a 400 error if the email address already exists
          return res.status(400).json({email: "A user has already registered with this address"})
        } else {
          // Otherwise create a new user
          const newUser = new User({
            handle: req.body.handle,
            email: req.body.email,
            password: req.body.password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            })
          })
        }
      })
  })



// user log-in

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if(!user) {
            return res.status(404).json({email: "The user does not exist"})
        }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                // res.json({msg: 'Successfully Logged in!'})
                const payload  = {id: user.id, handle: user.handle}

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 3600},
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer' + token
                        })
                    }
                )
            } else {
                return res. status(400).json({password: 'Incorrect credential'})
            }
        })
    })
})




module.exports = router;