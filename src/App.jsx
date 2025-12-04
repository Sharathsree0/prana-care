import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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


export default function App() {
  const PublicSite = (
    <>
      <Navbar />
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="services"><Services /></section>
      <section id="contact"><Contact /></section>
      <Footer />
      <FloatingButtons />
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={PublicSite} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />       
          <Route path="team" element={<AdminTeam />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="services" element={<AdminServices />} /> 
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}