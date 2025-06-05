export default function SuccessPage() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-green-700">✅ Payment Successful!</h1>
      <p className="mt-2 text-gray-600">Your tokens have been added to your account.</p>
      <p className="mt-2 text-sm text-indigo-600 font-mono">
        Thank you for your purchase!
      </p>
      <a href="/solver" className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
        Start Solving Problems
      </a>
    </div>
  );
}
