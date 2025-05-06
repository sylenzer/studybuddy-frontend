// src/pages/PricingPage.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import stripePromise from "@/lib/stripe";
import { useUser } from "@/context/UserContext"; // ✅ Corrected


const tokenPacks = [
  {
    title: "Starter Pack",
    price: "$4.99",
    priceId: "price_1TOKENSTARTER", // Replace with your real Stripe price ID
    tokens: 50,
    bonus: 0,
  },
  {
    title: "Standard Pack",
    price: "$9.99",
    priceId: "price_1TOKENSTANDARD",
    tokens: 120,
    bonus: 20,
  },
  {
    title: "Power Pack",
    price: "$19.99",
    priceId: "price_1TOKENPOWER",
    tokens: 300,
    bonus: 50,
  },
];

const PricingPage = () => {
  const { user } = useUser(); // ✅ Corrected

  const handleCheckout = async (priceId) => {
    if (!user) {
      alert("Please log in to purchase tokens.");
      return;
    }

    const stripe = await stripePromise;

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, userId: user.id }),
    });

    const session = await res.json();
    if (session.id) {
      stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      alert("Failed to create Stripe checkout session.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Choose Your Token Pack</h1>
      <p className="text-muted-foreground mb-12">
        Buy tokens to use with the Custom Problem Solver. 1 token = 1 solve.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {tokenPacks.map((pack) => (
          <Card key={pack.title}>
            <CardHeader>
              <CardTitle>{pack.title}</CardTitle>
              <p className="text-xl font-semibold mt-2">{pack.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="text-left space-y-2 mb-4">
                <li>{pack.tokens} tokens</li>
                {pack.bonus > 0 && <li>Bonus: +{pack.bonus} tokens</li>}
                <li>Tokens never expire</li>
              </ul>
              <Button
                className="w-full"
                onClick={() => handleCheckout(pack.priceId)}
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted-foreground">
        Tokens never expire. Use them anytime to access solver sessions.
      </p>
    </div>
  );
};

export default PricingPage;
