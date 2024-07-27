import User from "@/models/User";
import { dbConnect } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newUser = new User(body);
    newUser.password = await bcrypt.hash(body.password, 10);
    const savedUser = await newUser.save();
    return NextResponse.json(savedUser);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}