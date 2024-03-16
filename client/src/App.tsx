import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfilePage from "./pages/user/UserProfilePage";
import Navbar from "./components/navbar/Navbar";
import OfertPage from "./pages/home/ofert/OfertPage";
import Footer from "./components/footer/Footer";

import "./App.css";
import AuthModal from "./components/authModal/AuthModal";
import { useAuthModal } from "./context/AuthModalContext";

function App() {
  const { showModal } = useAuthModal();

  return (
    <Router>
      <div className="site-container">
        <Navbar />
        {showModal && <AuthModal />}
        <main>
          <Routes>
            <Route path="/services" element={<OfertPage />} />
            <Route path="/my-profile" element={<UserProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
