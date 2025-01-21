import  mongoose from 'mongoose'

const passwordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  resetToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

// Configura el índice TTL para eliminar el documento después de 15 minutos
passwordResetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 }); // 15 minutos = 900 segundos

export default mongoose.model('PasswordResetToken', passwordResetSchema);