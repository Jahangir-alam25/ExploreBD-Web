import { NextResponse } from "next/server";
import clientPromise from "../../../context/MongoDB/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("explorebd_db");

    const booking = {
      tourId: body.tourId,
      userId: body.userId,
      guests: body.guests,
      totalPrice: body.totalPrice,
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date(),
    };

    const result = await db.collection("bookings").insertOne(booking);

    return NextResponse.json({
      success: true,
      bookingId: result.insertedId,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Booking failed" },
      { status: 500 }
    );
  }
}