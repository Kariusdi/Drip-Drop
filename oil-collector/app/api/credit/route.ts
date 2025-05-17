import { connectDB } from "@/controllers/mongodb";
import UserCredit from "@/models/UserCredit";
import { NextRequest, NextResponse } from "next/server";

interface UserPhoneStructure {
  phone: string;
}

interface UserCreditStructure {
  phone: string;
  credits: number;
}

export const GET = async (request: NextRequest) => {
  await connectDB();
  const phone = request.nextUrl.searchParams.get("phone");

  if (!phone) {
    return NextResponse.json(
      {
        message: "Error getting a user",
      },
      { status: 500 }
    );
  }

  try {
    const userData = await UserCredit.findOne({ phone });
    return NextResponse.json(
      {
        message: "Get a user successfully",
        data: { phone: userData.phone, credits: userData.credits },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error getting a user",
      },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  await connectDB();

  const body: UserPhoneStructure = await request.json();

  const newUser = new UserCredit({
    phone: body.phone,
    credits: 0,
  });

  try {
    const savedUser = await newUser.save();
    return NextResponse.json(
      {
        message: "Create new user successfully",
        data: savedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error creating a new user",
      },
      { status: 500 }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  await connectDB();

  const body: UserCreditStructure = await request.json();

  try {
    const updatedUser = await UserCredit.findOneAndUpdate(
      { phone: body.phone },
      { $set: { credits: body.credits } }
    );
    return NextResponse.json(
      {
        message: "Updated a user successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error updating a new user",
      },
      { status: 500 }
    );
  }
};
