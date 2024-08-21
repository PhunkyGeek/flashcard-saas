"use client";

import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import getStripe from "@/utils/get-stripe";

const PricingSection = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleBasicPlanClick = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  const handleProSubmit = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <Typography variant="h4" className="mb-5 font-medium text-center">
        Pricing plans
      </Typography>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Plan */}
        <Card
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white text-black shadow-lg text-center"
          style={{
            borderRadius: "10px"
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Basic
            </Typography>
            <Typography variant="h6" className="my-4">
              Free
            </Typography>
            <ul className="list-none p-0 text-center mb-4">
              <li className="mb-2">Flashcard Samples</li>
              <li className="mb-2">Limited Generative AI</li>
            </ul>
            <Button
              variant="contained"
              style={{
                borderRadius: "25px",
                backgroundColor: "gray",
                color: "white", // Ensures the text is visible on the black background
              }}
              className="mt-4"
              onClick={handleBasicPlanClick}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white text-black text-center shadow-lg"
          style={{
            borderRadius: "10px"
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Pro
            </Typography>
            <Typography variant="h6" className="my-4">
              $1.00/month
            </Typography>
            <ul className="list-none p-0 text-center mb-4">
              <li className="mb-2">Flashcard Samples</li>
              <li className="mb-2">Ticket Support</li>
              <li className="mb-2">Unlimited AI Integration</li>
            </ul>
            <Button
              variant="contained"
              style={{
                borderRadius: "25px",
                backgroundColor: "black",
                color: "white", // Ensures the text is visible on the black background
              }}
              className="mt-4"
              onClick={handleProSubmit}
            >
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;
