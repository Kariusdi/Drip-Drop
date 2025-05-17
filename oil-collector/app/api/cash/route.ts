import { connectDB } from "@/controllers/mongodb";
import UserCashHistory from "@/models/UserCashHistory";
import { formatDate } from "@/utils/date";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface UserCashHistoryStructure {
  phone: string;
  oilVol: number;
  pricePerLiter: number;
  cash: number;
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
    const PAGE_SIZE = 10;
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);

    const userData = await UserCashHistory.find({ phone })
      .select("-phone -__v -updatedAt")
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();

    const transformed = userData.map(({ _id, createdAt, ...rest }: any) => ({
      id: (_id as ObjectId).toString(),
      createdAt: formatDate(new Date(createdAt)),
      ...rest,
    }));

    const totalCount = await UserCashHistory.countDocuments({ phone });

    return NextResponse.json(
      {
        message: "Get a user cash history successfully",
        data: transformed,
        totalCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error getting a user history",
      },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  await connectDB();

  const body: UserCashHistoryStructure = await request.json();

  const newUserHistory = new UserCashHistory({
    phone: body.phone,
    oilVol: body.oilVol,
    pricePerLiter: body.pricePerLiter,
    cash: body.cash,
  });

  try {
    const savedUser = await newUserHistory.save();
    return NextResponse.json(
      {
        message: "Create new user history successfully",
        data: savedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error creating a new user history",
      },
      { status: 500 }
    );
  }
};
