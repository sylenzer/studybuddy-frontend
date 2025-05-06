import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      // ✅ Normally you'd send paymentMethod.id to your backend for actual charge
      setSuccessMessage("🎉 Payment method created successfully!");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border border-gray-300 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
