export default function About() {
  
  // SHORTCUT: Define your team here. 
  // To add a new doctor/nurse, just add one line to this list.
  const teamData = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      name: "James Wilson",
      role: "Senior Physiotherapist",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Head Nurse",
      img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div>
      {/* 1. MISSION SECTION */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center gx-5">
            <div className="col-lg-6">
              <img 
                className="img-fluid rounded-3 shadow-sm mb-4 mb-lg-0" 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
                alt="Our Mission" 
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold text-primary mb-3">Our Mission</h2>
              <p className="lead text-muted mb-4">
                To provide hospital-quality care in the comfort of your own home, ensuring dignity, respect, and rapid recovery for every patient.
              </p>
              <p className="text-secondary">
                Founded in 2019, WeCare started with a simple promise: treat every patient like our own family. 
                Today, we have helped over 500 families navigate post-surgery recovery and elderly care with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEAM SECTION (The Loop) */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Meet Our Specialists</h2>
            <p className="text-muted">Experienced professionals you can trust</p>
          </div>

          <div className="row g-4">
            {teamData.map((member) => (
              <div key={member.id} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm text-center h-100 py-4">
                  <div className="card-body">
                    <img 
                      src={member.img} 
                      className="rounded-circle mb-3 object-fit-cover" 
                      style={{width: '120px', height: '120px'}}
                      alt={member.name} 
                    />
                    <h5 className="fw-bold mb-1">{member.name}</h5>
                    <p className="text-primary small mb-0">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}