import mongoose, { Schema, Document } from "mongoose";

interface UserCredit extends Document {
  phone: string;
  credits: number;
}

const userCreditSchema = new Schema<UserCredit>(
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
    credits: {
      type: Number,
      require: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const UserCredit =
  mongoose.models.UserCredit || mongoose.model("UserCredit", userCreditSchema);
export default UserCredit;
