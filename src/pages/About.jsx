import { useState, useEffect } from "react";
import "./About.css";

export default function About() {
  
  // --- 1. LOAD TEXT CONTENT ---
  const loadContent = () => {
    const stored = localStorage.getItem("about_content");
    return stored ? JSON.parse(stored) : {
      title: "Our Mission",
      lead: "To provide hospital-quality care in the comfort of your own home, ensuring dignity, respect, and rapid recovery for every patient.",
      body: "Founded in 2019, WeCare started with a simple promise: treat every patient like our own family. Today, we have helped over 500 families navigate post-surgery recovery and elderly care with ease."
    };
  };
  const [content, setContent] = useState(loadContent);

  // --- 2. LOAD SPECIALISTS ---
  const loadTeam = () => {
    const stored = localStorage.getItem("adminTeam");
    return stored ? JSON.parse(stored) : [
      { id: 1, name: "Dr. Sarah Johnson", role: "Chief Medical Officer", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" },
      { id: 2, name: "James Wilson", role: "Senior Physiotherapist", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400" },
      { id: 3, name: "Emily Davis", role: "Head Nurse", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400" },
    ];
  };
  const [teamData, setTeamData] = useState(loadTeam);

  // --- 3. LOAD GALLERY ---
  const loadGallery = () => {
    const stored = localStorage.getItem("gallery_about");
    return stored ? JSON.parse(stored) : ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"];
  };
  const [gallery, setGallery] = useState(loadGallery);
  const [index, setIndex] = useState(0);

  // --- 4. LIVE LISTENER (Updates Everything) ---
  useEffect(() => {
    const handleUpdate = () => {
      setContent(loadContent()); // Update Text
      setTeamData(loadTeam());   // Update Team
      setGallery(loadGallery()); // Update Images
    };
    window.addEventListener("storage", handleUpdate);
    return () => window.removeEventListener("storage", handleUpdate);
  }, []);

  // Slideshow Timer
  useEffect(() => {
    if (gallery.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % gallery.length), 3000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  return (
    <div id="about" className="about">
      {/* MISSION SECTION */}
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
            {/* DYNAMIC TEXT HERE */}
            <h2>{content.title}</h2>
            <p className="mission-lead">{content.lead}</p>
            <p className="mission-body">{content.body}</p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
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