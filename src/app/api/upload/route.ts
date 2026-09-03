import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Photo storage isn't connected yet. Enable Vercel Blob in your project's Storage tab." },
      { status: 503 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are accepted." }, { status: 400 });
  }

  const MAX_BYTES = 15 * 1024 * 1024;
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Please upload an image under 15MB." }, { status: 400 });
  }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const blob = await put(`personalisation/${Date.now()}-${safeName}`, file, {
      access: "public",
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed. Try again." }, { status: 502 });
  }
}
