// src/pages/PricingPage.jsx
import React from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import stripePromise from "@/lib/stripe";

const tokenPacks = [
  {
    title: "Starter Pack",
    price: "$4.99",
    priceId: "price_1RW06nEIanoX1tYOtFVP4HWP", // ✅ correct test ID
    tokens: 50,
    bonus: 0,
  },
  {
    title: "Standard Pack",
    price: "$9.99",
    priceId: "price_1RW07IEIanoX1tYODw7ce90s", // ✅ correct test ID
    tokens: 120,
    bonus: 20,
  },
  {
    title: "Power Pack",
    price: "$19.99",
    priceId: "price_1RW07iEIanoX1tYOqg5QeUmL", // ✅ correct test ID
    tokens: 200,
    bonus: 50,
    bestValue: true,
  },
];

const PricingPage = () => {
  const { user } = useUser();

  const handleCheckout = async (priceId) => {
  if (!user) {
    alert("Please log in to purchase tokens.");
    return;
  }

  console.log("✅ Sending checkout request for:", user.id, priceId);

  try {
    const res = await fetch("https://studybuddy-backend-production.up.railway.app/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, userId: user.id }),
    });

    const session = await res.json();

    if (session.url) {
      window.location.href = session.url;
    } else {
      alert("❌ Failed to create Stripe checkout session.");
      console.error("Stripe session error response:", session);
    }
  } catch (err) {
    console.error("❌ Checkout error:", err);
    alert("An error occurred. See console for details.");
  }
};

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Buy Token Packs
          </h2>
          <p className="mt-3 text-gray-600">
            Use tokens with the Custom Problem Solver. 1 token = 1 solve.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tokenPacks.map((pack, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col rounded-xl border bg-white p-6 card-hover ${
                pack.bestValue ? "border-indigo-500" : "border-gray-200"
              }`}
            >
              {pack.bestValue && (
                <span className="badge-floating">Best Value</span>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-indigo-600">
                  {pack.title}
                </h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {pack.price}
                </p>
                <ul className="mt-6 space-y-3 text-gray-700 text-sm">
                  <li>🎯 {pack.tokens} tokens</li>
                  {pack.bonus > 0 && <li>🎁 Bonus: +{pack.bonus} tokens</li>}
                  <li>⏳ Tokens never expire</li>
                  <li>⚡ Instant access to solver</li>
                </ul>
              </div>

              <div className="mt-6">
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
                  onClick={() => handleCheckout(pack.priceId)}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Tokens never expire. Use them anytime.
        </p>
      </div>
    </section>
  );
};

export default PricingPage;
