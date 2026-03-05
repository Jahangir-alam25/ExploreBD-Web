import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../context/MongoDB/mongodb"; // tumar MongoDB connection
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("explorebd_db"); // tumar DB name
    const userId = req.headers.get("user-id"); // auth middleware use korle token theke pabe

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user || !user.wishlist) {
      return NextResponse.json([]);
    }

    // Populate wishlist items with actual tour data
    const wishlistItems = await db
      .collection("tours") // tumar tours collection
      .find({ _id: { $in: user.wishlist.map((id: string) => new ObjectId(id)) } })
      .toArray();

    return NextResponse.json(wishlistItems);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("exploreBD");
    const userId = req.headers.get("user-id");

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tourId = searchParams.get("tourId");

    if (!tourId) {
      return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
    }

    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { wishlist: new ObjectId(tourId) } }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}