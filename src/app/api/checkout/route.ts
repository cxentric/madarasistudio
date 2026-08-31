import { NextResponse } from "next/server";

// Creates a Razorpay order for the amount computed on the client.
// Swap this for Stripe (or another gateway) if you're shipping outside
// India — the checkout page only needs { orderId, amount, currency, keyId } back.
export async function POST(req: Request) {
  const { amountPaise } = await req.json();
  if (!amountPaise || typeof amountPaise !== "number") {
    return NextResponse.json({ error: "amountPaise is required." }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payments aren't configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
      { status: 503 }
    );
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: `madarasi_${Date.now()}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Razorpay order creation failed:", detail);
      return NextResponse.json({ error: "Could not start checkout. Try again." }, { status: 502 });
    }

    const order = await res.json();
    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not start checkout. Try again." }, { status: 502 });
  }
}
