import { NextRequest, NextResponse } from "next/server";

const PAYPAL_API_BASE =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { cart } = await req.json();

    const accessToken = await getAccessToken();

    // Calculate total from cart items
    const total = cart.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Create order payload
    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (total / 100).toFixed(2), // Convert cents to dollars
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: (total / 100).toFixed(2),
              },
            },
          },
          items: cart.map((item: any) => ({
            name: "Custom Skateboard",
            description: `Deck: ${item.deck.name}, Wheels: ${item.wheel.name}`,
            unit_amount: {
              currency_code: "USD",
              value: (item.price / 100).toFixed(2),
            },
            quantity: item.quantity.toString(),
          })),
        },
      ],
    };

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const order = await response.json();

    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
