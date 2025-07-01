import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name.'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email.'],
        unique: [true, 'Please enter a valid email.'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password.'],
    },
    img: {
        type: String,
    },
    roles: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
    }
});

export const UserModel = mongoose.model("Users", userSchema);