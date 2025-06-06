import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const collection = db.collection("trial_applications");

    const result = await collection.insertOne({
      ...body,
      submittedAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to apply" },
      { status: 500 }
    );
  }
}
