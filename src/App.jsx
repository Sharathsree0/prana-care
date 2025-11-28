import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";import Navbar from './component/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './component/Footer';
import FloatingButtons from './component/FloatingButtons';
import AdminLogin from './Admin/Adminlogin';
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";

// /* Admin area components (make sure these files exist under src/admin/...) */
// import AdminLogin from "./admin/pages/AdminLogin";
// import AdminLayout from "./admin/layout/AdminLayout";
// import AdminDashboard from "./admin/pages/AdminDashboard";
// import AdminLeads from "./admin/pages/AdminLeads"; // create later
// import AdminServices from "./admin/pages/AdminServices"; // create later
// import AdminSettings from "./admin/pages/AdminSettings"; // create later (optional)

export default function App() {
  /* Public site markup used for the root "/" route */
  const PublicSite = (
    <>
      <Navbar />

      {/* Section anchors used by the navbar links */}
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
      <FloatingButtons />
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Public site (stacked single-page sections) */}
        <Route path="/" element={PublicSite} />

        {/* Admin auth page (login) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin routes (AdminLayout checks localStorage 'adminAuth') */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* fallback: redirect unknown admin paths to admin login, others to home */}
        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}