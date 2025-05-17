import mongoose, { Schema, Document } from "mongoose";

interface UserCashHistory extends Document {
  phone: string;
  oilVol: number;
  pricePerLiter: number;
  cash: number;
}

const UserCashHistorySchema = new Schema<UserCashHistory>(
  {
    id: {
      type: String,
      require: false,
    },
    phone: {
      type: String,
      require: [true, "Email is required"],
    },
    oilVol: {
      type: Number,
      require: [true, "Oil Volume is required"],
    },
    pricePerLiter: {
      type: Number,
      require: [true, "Price per liter is required"],
    },
    cash: {
      type: Number,
      require: [true, "Cash Reward is required"],
    },
  },
  { timestamps: true }
);

const UserCashHistory =
  mongoose.models.UserCashHistory ||
  mongoose.model("UserCashHistory", UserCashHistorySchema);
export default UserCashHistory;
