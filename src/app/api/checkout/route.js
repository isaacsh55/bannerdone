import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

export const POST = async (request) => {
  try {
    // 1. Parse body
    const { products } = await request.json();

    // 2. Get active products from Stripe
    let activeProducts = await stripe.products.list({ active: true });

    // 3. Ensure all products exist in Stripe
    for (const product of products) {
      const matchedProduct = activeProducts.data.find(
        (stripeProduct) =>
          stripeProduct.name.toLowerCase() === product.name.toLowerCase()
      );
      if (!matchedProduct) {
        await stripe.products.create({
          name: product.name,
          default_price_data: {
            currency: 'sgd',
            unit_amount: product.price * 100,
          },
        });
      }
    }

    // 4. Fetch updated products
    activeProducts = await stripe.products.list({ active: true });

    // 5. Build line items
    let stripeProducts = [];
    for (const product of products) {
      const stripeProduct = activeProducts.data.find(
        (stripeProduct) =>
          stripeProduct.name.toLowerCase() === product.name.toLowerCase()
      );
      if (stripeProduct) {
        stripeProducts.push({
          price: stripeProduct.default_price,
          quantity: product.quantity,
        });
      }
    }

    // 6. Create checkout session
    const origin = request.headers.get('origin');
    const session = await stripe.checkout.sessions.create({
      line_items: stripeProducts,
      mode: 'payment',
      success_url: `http://localhost:3032/checkout/success`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error in /api/checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};