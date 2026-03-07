import { connectDB } from "@/lib/mongodbNative";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { db } = await connectDB();
console.log("Updating destination with ID:", params.id, "and body:", body);
    const result = await db.collection("destinations").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: body }
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE( req: NextRequest ) {
  try {

    const { searchParams } = new URL(req.url);
    const Id = searchParams.get("id");
    console.log("Received DELETE request for destination with ID:", Id);
    const { db } = await connectDB();

    const result = await db
      .collection("destinations")
      .deleteOne({ _id: new ObjectId(Id) });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}



