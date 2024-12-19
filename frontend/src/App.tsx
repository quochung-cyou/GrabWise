import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import HowItWorks from "./pages/HowItWorks";
import Safety from "./pages/Safety";
import Help from "./pages/Help";
import About from "./pages/About";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import BookingHistory from "./pages/BookingHistory";
import Analytics from "./pages/Analytics";
import Landing from "./pages/Index";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/predict" element={<MainScreen />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/main" element={<MainScreen />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
