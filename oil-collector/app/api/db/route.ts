import { connectDB } from "@/controllers/mongodb";
import UserPoint from "@/models/userpoint";
import { NextRequest, NextResponse } from "next/server";

interface UserPhoneStructure {
  phone: string;
}

interface UserPointStructure {
  phone: string;
  points: number;
}

export const GET = async (request: NextRequest) => {
  const phone = request.nextUrl.searchParams.get("phone");

  try {
    const userData = await UserPoint.findOne({ phone });
    return NextResponse.json(
      {
        message: "Get a user successfully",
        data: { phone: userData.phone, points: userData.points },
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

  const newUser = new UserPoint({
    phone: body.phone,
    points: 0,
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

  const body: UserPointStructure = await request.json();

  try {
    const updatedUser = await UserPoint.findOneAndUpdate(
      { phone: body.phone },
      { $set: { points: body.points } }
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
