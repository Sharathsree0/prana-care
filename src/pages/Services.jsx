import { useState, useEffect } from "react";
import ServiceCard from "../component/ServiceCard";
import "./Services.css";

export default function Services() {
  
  // 1. Load Dynamic Services from Admin
  const loadServices = () => {
    const stored = localStorage.getItem("adminServices");
    // Fallback default data if nothing in storage
    return stored ? JSON.parse(stored) : [
      { id: 1, title: "Home Nursing", price: "₹800/day", active: true },
      { id: 2, title: "Elderly Care", price: "₹15000/mo", active: true },
      { id: 3, title: "Physiotherapy", price: "₹600/session", active: true },
    ];
  };

  const [servicesData, setServicesData] = useState(loadServices);

  // 2. LIVE LISTENER
  useEffect(() => {
    const handleStorage = () => {
      setServicesData(loadServices());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Filter only 'active' services
  const activeServices = servicesData.filter(s => s.active !== false);

  // Helper to give descriptions to new services (since Admin only asks for Title/Price)
  const getDescription = (title) => {
    if (title.includes("Nursing")) return "Professional nursing care for post-surgery recovery, wound dressing, and injections.";
    if (title.includes("Elderly")) return "Compassionate companionship and daily living assistance for senior citizens.";
    if (title.includes("Physio")) return "Expert rehab exercises to regain mobility and strength after injury.";
    return "Contact us for more details about our " + title + " service.";
  };

  // Helper for default images
  const getImage = (id) => {
    if(id === 1) return "https://images.unsplash.com/photo-1576765611791-374775097460?auto=format&fit=crop&q=80&w=600";
    if(id === 2) return "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=600";
    if(id === 3) return "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600";
    return "https://dummyimage.com/600x400/10b981/ffffff?text=" + id;
  };

  return (
    <section id="services" className="services">
      <div className="services-container">

        <div className="services-header">
          <h2>Our Services</h2>
          <p>Comprehensive care tailored to your needs</p>
        </div>

        <div className="services-grid">
          {activeServices.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              price={service.price} // Pass the rate!
              desc={service.desc || getDescription(service.title)}
              img={getImage(service.id)}
              link="#contact"
            />
          ))}
        </div>

      </div>
    </section>
  );
}