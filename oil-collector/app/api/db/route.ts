import { connectDB } from "@/controllers/mongodb";
import UserPoint from "@/models/userpoint";
import { NextRequest, NextResponse } from "next/server";

interface BodyStructure {
  phone: string;
}

export const GET = async (request: NextRequest) => {
  const phone = request.nextUrl.searchParams.get("phone");

  try {
    const user_data = await UserPoint.findOne({ phone });
    return NextResponse.json(
      {
        message: "Get a user successfully",
        data: { phone: user_data.phone, points: user_data.points },
      },
      { status: 200 }
    );
  } catch (error) {
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

  const body: BodyStructure = await request.json();

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
    return NextResponse.json(
      {
        message: "Error creating a new user",
      },
      { status: 500 }
    );
  }
};
