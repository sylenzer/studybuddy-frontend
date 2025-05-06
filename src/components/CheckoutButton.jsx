// src/components/CheckoutButton.jsx
import React from "react";
import stripePromise from "@/lib/stripe";

const CheckoutButton = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: "price_1NX0XXXXX", quantity: 1 }], // <-- Replace with your Stripe price ID
      mode: "payment",
      successUrl: "https://yourdomain.com/success",
      cancelUrl: "https://yourdomain.com/cancel",
    });

    if (error) {
      console.error("Stripe error:", error);
      alert("Checkout failed.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg font-semibold"
    >
      Buy Now
    </button>
  );
};

export default CheckoutButton;
