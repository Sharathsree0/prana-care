import ServiceCard from "../component/ServiceCard";
import "./Services.css";

export default function Services() {
  const servicesData = [
    {
      id: 1,
      title: "Home Nursing",
      desc: "Professional nursing care for post-surgery recovery, wound dressing, and injections at home.",
      img: "https://images.unsplash.com/photo-1576765611791-374775097460?auto=format&fit=crop&q=80&w=600",
      link: "#contact",
    },
    {
      id: 2,
      title: "Elderly Care",
      desc: "Compassionate companionship and daily living assistance for senior citizens.",
      img: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=600",
      link: "#contact",
    },
    {
      id: 3,
      title: "Physiotherapy",
      desc: "Expert rehab exercises to regain mobility and strength after injury or surgery.",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
      link: "#contact",
    },
  ];

  return (
    <section id="services" className="services">
      <div className="services-container">

        <div className="services-header">
          <h2>Our Services</h2>
          <p>Comprehensive care tailored to your needs</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              desc={service.desc}
              img={service.img}
              link={service.link}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
