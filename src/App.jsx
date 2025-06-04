
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { LoadingProvider } from "./context/LoadingContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SolverContainer from "./pages/CustomProblemSolver";
import PricingPage from "./pages/PricingPage";
import FAQ from "./pages/FAQ";
import ProtectedRoute from "./components/ProtectedRoute";
import TermsPage from "./pages/TermsPage";
import SignupPage from "./pages/SignupPage";
import PrivacyPage from "./pages/PrivacyPage";
import { useUser } from "@/context/UserContext";


const App = () => {
  const { user } = useUser(); // 👈 grab the user from context

  return (
    <UserProvider>
      <LoadingProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/solver"
              element={
                <ProtectedRoute>
                  <SolverContainer />
                </ProtectedRoute>
              }
            />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/signup" element={<SignupPage />} />
<Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </Layout>
      </LoadingProvider>
    </UserProvider>
  );
};

export default App;
