// src/lib/stripe.js
import { loadStripe } from "@stripe/stripe-js";

// Ensure this env var is set in .env as: VITE_STRIPE_PUBLISHABLE_KEY=your_key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default stripePromise;
