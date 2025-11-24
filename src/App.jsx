// 1. Remove 'react-router-dom' imports because we don't need them anymore
import Navbar from './component/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './component/Footer';
import FloatingButtons from './component/FloatingButtons';

function App() {
  return (
    <div>
      <Navbar />

      {/* 2. Stack the pages on top of each other using Sections */}
      
      {/* Home Section (Top) */}
      <section id="home">
        <Home />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      <Footer />
      <FloatingButtons /> {/* <--- ADD THIS HERE */}
    </div>
  );
}

export default App;