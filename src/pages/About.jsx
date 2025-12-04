import { useState, useEffect } from "react";
import "./About.css";
import dbs from "../firebase";

export default function About() {

  // --- STATE ---
  const [content, setContent] = useState({
    title: "",
    lead: "",
    body: ""
  });

  const [teamData, setTeamData] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [index, setIndex] = useState(0);

  // --- 1. FETCH ABOUT TEXT ---
  const fetchAboutContent = async () => {
    const data = await dbs.readDocument("site_content", "about_page");
    if (data) setContent(data);
  };

  // --- 2. FETCH TEAM ---
  const fetchTeam = async () => {
    const data = await dbs.readCollection("site_team");
    setTeamData(data);
  };

  // --- 3. FETCH ABOUT GALLERY (IMPORTANT FIX) ---
  const fetchGallery = async () => {
    const data = await dbs.readCollection("gallery_about"); // FIXED
    const urls = data.map((img) => img.url);
    setGallery(urls);
  };

  // --- ON LOAD ---
  useEffect(() => {
    fetchAboutContent();
    fetchTeam();
    fetchGallery();
  }, []);

  // --- SLIDESHOW ---
  useEffect(() => {
    if (gallery.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % gallery.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [gallery]);

  return (
    <div id="about" className="about">

      {/* MISSION SECTION */}
      <section className="about-mission">
        <div className="about-container mission-grid">

          {/* IMAGE */}
          <div className="mission-image">
            {gallery.length > 0 && (
              <img
                key={index}
                src={gallery[index]}
                alt="Our Mission"
                style={{
                  transition: "opacity 0.5s",
                  width: "100%",
                  borderRadius: "22px"
                }}
              />
            )}
          </div>

          {/* TEXT */}
          <div className="mission-text">
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
                <div className="team-avatar">
                  <img src={member.img} alt={member.name} />
                </div>
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
