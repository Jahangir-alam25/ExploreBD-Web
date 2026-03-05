import { NextResponse } from 'next/server';
import clientPromise from '../../../context/MongoDB/mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
console.log('Fetching bookings for email:', email);
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('explorebd_db');

    const bookings = await db
      .collection('bookings')
      .find({ userEmail: email })
      .sort({ date: -1 })
      .toArray();

    const formatted = bookings.map(b => ({ ...b, id: b._id.toString(), _id: undefined }));
    return NextResponse.json(formatted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}