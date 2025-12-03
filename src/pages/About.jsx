import { useState, useEffect } from "react";
import "./About.css";

export default function About() {
  // 1. Helper to load images safely
  const loadImages = () => {
    const stored = localStorage.getItem("gallery_about");
    return stored 
      ? JSON.parse(stored) 
      : ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"];
  };

  const [gallery, setGallery] = useState(loadImages);
  const [index, setIndex] = useState(0);

  // 2. LIVE LISTENER (This is what you are missing!)
  useEffect(() => {
    const handleStorage = () => {
      setGallery(loadImages());
      setIndex(0); // Reset slideshow
    };
    // Listen for the special signal from Admin
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 3. Slideshow Timer
  useEffect(() => {
    if (gallery.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % gallery.length), 3000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  const teamData = [
    { id: 1, name: "Dr. Sarah Johnson", role: "Chief Medical Officer", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "James Wilson", role: "Senior Physiotherapist", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Emily Davis", role: "Head Nurse", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div id="about" className="about">
      <section className="about-mission">
        <div className="about-container mission-grid">
          <div className="mission-image">
            <img
              key={index}
              src={gallery[index]}
              alt="Our Mission"
              style={{ transition: "opacity 0.5s", opacity: 1, width: "100%", borderRadius: "22px" }}
            />
          </div>
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p className="mission-lead">To provide hospital-quality care in the comfort of your own home.</p>
            <p className="mission-body">Founded in 2019, WeCare started with a simple promise: treat every patient like our own family.</p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="about-container">
          <div className="team-header">
            <h2>Meet Our Specialists</h2>
            <p>Experienced professionals you can trust</p>
          </div>
          <div className="team-grid">
            {teamData.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-avatar"><img src={member.img} alt={member.name} /></div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}