import { useState, useEffect } from "react";
import ServiceCard from "../component/ServiceCard";
import "./Services.css";
import dbs from "../firebase";

export default function Services() {
  const [servicesData, setServicesData] = useState([]);

  // ---- LOAD SERVICES FROM FIRESTORE ----
  const loadServices = async () => {
    const data = await dbs.readCollection("services");
    setServicesData(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  // Only active services
  const activeServices = servicesData.filter((s) => s.active !== false);

  // Default descriptions if not provided
  const getDescription = (title) => {
    if (title.includes("Nursing"))
      return "Professional nursing care for post-surgery recovery, wound dressing, and injections.";

    if (title.includes("Elderly"))
      return "Compassionate companionship and daily living assistance for senior citizens.";

    if (title.includes("Physio"))
      return "Expert rehab exercises to regain mobility and strength after injury.";

    return "Contact us for more details about our " + title + " service.";
  };

  // Default fallback images based on id
  const getImage = (id) => {
    if (id === "1" || id === 1)
      return "https://images.unsplash.com/photo-1576765611791-374775097460?auto=format&fit=crop&q=80&w=600";

    if (id === "2" || id === 2)
      return "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=600";

    if (id === "3" || id === 3)
      return "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600";

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
              price={service.price}
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
