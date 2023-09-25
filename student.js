const mongoose = require('mongoose');
//const validator = require('validator'); // Import the validator library
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Define the Student schema
const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
});

studentSchema.pre("save", async function(next){
    if(this.isModified("password")){
        console.log(`the current pass is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        console.log(`the current pass is ${this.password}`);
    }
    next();
})
// Create the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
