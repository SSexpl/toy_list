const express = require('express')
const router = express.Router();
var users=require('../models/user.js');
// define the register user

router.get('/register', (req, res) => {

 res.render('register.ejs');
  
})
router.post('/register', (req , res) => {

  var name=req.body.name;
  var password= req.body.password;
  var email= req.body.email;
  users.findOne({email:email})
     .then(user =>{
       if(user)
       res.render("failure.ejs",{message:"user with this emailid exists!!!"});
      else
      {
  let addedblog= new users({
    name:name,
    email:email,
    password:password
   });
   addedblog.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })
res.redirect("/login");
}
}
)

 });
// define the login user
router.get('/login', (req, res) => {
    res.render('login.ejs');
})
router.post('/login', (req, res) => {
  var password= req.body.password;
  var email= req.body.email;
  users.findOne({$and:[{email:email},{password:password}]})
     .then(user =>{
       if(user)
        { console.log(user);
        res.redirect('/admin');}
      else
         res.render("failure.ejs",{message:"check username or password again!!!"});
     }
     )

})

module.exports = router;