import { loadStripe } from "@stripe/stripe-js";
// Load using your Vite environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Optional: log to verify
if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
  console.warn("⚠️ Stripe key is missing from .env");
}

export default stripePromise;
