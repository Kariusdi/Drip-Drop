import mongoose, { Schema, Document } from "mongoose";

interface UserPoint extends Document {
  phone: string;
  points: number;
}

const userSchema = new Schema<UserPoint>(
  {
    id: {
      type: String,
      require: false,
    },
    phone: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
    },
    points: {
      type: Number,
      require: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const UserPoint =
  mongoose.models.UserPoint || mongoose.model("UserPoint", userSchema);
export default UserPoint;
