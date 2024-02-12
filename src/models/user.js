import mongoose, { Schema, models } from "mongoose"


const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  position:{
    type: String,
    enum: {
      values: ['Ingeniero', 'Operador', 'Técnico'],
      message: '{VALUE} is not supported'
    },
    required: true
  },
  password:{
    type: String,
    required: true
  }
}, { timeseries: true })

const User = models.User || mongoose.model("User", userSchema)
export default User