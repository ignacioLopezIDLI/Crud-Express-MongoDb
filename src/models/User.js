import { Schema,model } from "mongoose"
import bcrypt from "bcryptjs" 

 const userSchema = new Schema({
    username:{
        type: String,
        unique: true 
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    roles: [{
            ref:"Role",
            type: Schema.Types.ObjectId,
        }]
}, {
    timestamps: true,
    versionKey: false
    }
)

// Encriptar Password
userSchema.statics.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10)   // Aplica algoritmo antes de ecriptar + seguridad
   return await bcrypt.hash(password, salt)  // Encripta password
}

// Comparar Password actual con la guardada
userSchema.statics.comparePassword = async (password , receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword) // compara password == true / false
} 
    
export default model("User", userSchema)    