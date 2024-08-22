import { NextResponse } from "next/server";
// import Stripe from "stripe";

const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatAmountForStripe = (amount, currency) => {
  // Ensure amount is correctly formatted for Stripe
  return Math.round(amount * 100);
};

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const origin = req.headers.get('origin');
    if (!origin) {
      throw new Error('Origin header is missing');
    }

    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pro Subscription',
            },
            unit_amount: formatAmountForStripe(1, 'usd'), // Ensure this is in cents
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
