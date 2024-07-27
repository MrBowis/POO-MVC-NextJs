import User from "@/models/User";
import { dbConnect } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  dbConnect();
  try {
    const userFound = await User.findById(params.id);

    if (!userFound)
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(userFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();
  dbConnect();

  try {
    const userUpdated = await User.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!userUpdated)
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(userUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  dbConnect();

  try {
    const userDeleted = await User.findByIdAndDelete(params.id);

    if (!userDeleted)
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(userDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}