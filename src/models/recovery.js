
import mongoose, { Schema, models } from "mongoose"


const recoverySchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },

  resetToken:{
    type: String,
    required: true
  },
  resetTokenExpiry:{
    type: Date,
    required: true
  }

}, { timestamps: true })

const Recovery = models.Recovery || mongoose.model("Recovery", recoverySchema)
export default Recovery


