import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from './component/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './component/Footer';
import FloatingButtons from './component/FloatingButtons';
import AdminLogin from './Admin/Adminlogin';
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLeads from "./Admin/AdminLeads";
import AdminServices from "./Admin/AdminServices";
import AdminSettings from "./Admin/AdminSettings";
import AdminGallery from "./Admin/AdminGallery";
import AdminTeam from "./Admin/AdminTeam";
import AdminAbout from "./Admin/AdminAbout";
import AdminHome from "./Admin/AdminHome";
import AdminFooter from "./Admin/AdminFooter";
import dbs from "./firebase";

// Helper component to log visits
const PublicWrapper = ({ children, darkMode, toggleTheme }) => {
  useEffect(() => {
    dbs.logVisitor();
  }, []);

  return (
    <>
      {/* Pass theme props to Navbar */}
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      {children}
      <Footer />
      <FloatingButtons />
    </>
  );
};

export default function App() {
  // --- THEME STATE ---
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);
  // -------------------

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PublicWrapper darkMode={darkMode} toggleTheme={toggleTheme}>
            <section id="home"><Home /></section>
            <section id="about"><About /></section>
            <section id="services"><Services /></section>
            <section id="contact"><Contact /></section>
          </PublicWrapper>
        } />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />       
          <Route path="team" element={<AdminTeam />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="services" element={<AdminServices />} /> 
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="footer" element={<AdminFooter />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}