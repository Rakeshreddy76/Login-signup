const express = require('express')
const path = require('path')
const Student = require("./student");
const app = express()
const port = 30200
require("./connection");

app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname,'home.html'))
}) 

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname,'login.html'))
})

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname,'contact.html'))
})

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname,'register.html'))
})  

// app.post("/register", async (req,res)=>{
//   try{
//       console.log(req.body.name);
//       const registerstudent = new Student({
//           name : req.body.name,
//           email : req.body.email,
//           password : req.body.password
//       })
//       const registered = await registerstudent.save();
//       res.status(201).render("login");
//   }catch(err){
//       res.send(err);
//   }
// })

app.post("/login", async (req,res)=>{
  try{
      // console.log(req.body.name);
      const email = req.body.email;
      const password = req.body.password;
      console.log(`my email is ${email}`);
      const useremail = await Student.findOne({email:email});
      const ismatch = await bcrypt.compare(password,useremail.password);
      console.log(ismatch);
      if(ismatch){
          res.send("Welcome! User. Nice to see you!!")
          // res.status(201).render("index");
      }else{
          res.send("invalid password details");
      }
      
  }catch(err){
      res.status(400).send("invalid login details");
  }
  console.log("db updated");
})

app.post("/test3", async (req, res) => {
  console.log(req.body);
  const user = new Student(req.body);

  try {
      await user.save();
      res.send(user); // Send response when save is successful
  } catch (e) {
      res.send(e); // Send an error response when there's an issue with saving
  }
});

app.get("/test3", async (req,res)=>{
  try{
      const studentdata = await Student.find();
      res.send(studentdata);
  }catch(e){
      res.send(e);
  }
  // res.send("hellooo");

}) 


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

