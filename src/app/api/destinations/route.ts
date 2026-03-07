// import { connectDB } from "@/lib/mongodbNative";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const { db } = await connectDB();

//     const destinations = await db
//       .collection("destinations")
//       .find({})
//       .toArray();

//     return NextResponse.json(destinations);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { db } = await connectDB();

//     const result = await db.collection("destinations").insertOne({
//       ...body,
//       tours: 0,
//       rating: 0,
//       visitors: "0",
//       image: "/images/hero-beach.jpg",
//       createdAt: new Date(),
//     });

//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create" }, { status: 500 });
//   }
// }


import { connectDB } from "@/lib/mongodbNative";
import { NextResponse } from "next/server";

export async function GET() {
  const { db } = await connectDB();
  const data = await db.collection("destinations").find().toArray();

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { db } = await connectDB();

  const result = await db.collection("destinations").insertOne(body);

  return NextResponse.json({
    _id: result.insertedId,
    ...body,
  });
}