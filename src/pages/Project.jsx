import React, { useEffect, useRef, useState } from "react";
import { featuredProjects } from "../data/projects";

/* ── hook: detect viewport entry ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

/* ── palette ── */
const C = {
  bg:         "#f5f0e8",
  bgCard:     "#faf7f1",
  bgBadge:    "#ede8de",
  border:     "#ddd6c8",
  borderHov:  "#c0522a",
  header:     "#1a1209",
  text:       "#3d2f1f",
  textMuted:  "#7a6a57",
  accent:     "#c0522a",
  accentLight:"#e8c9b8",
};

/* ── CountUp ── */
function CountUp({ target }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 30);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [target]);
  return <>{val}</>;
}

/* ── TechBadge ── */
function TechBadge({ tech, i, parentVisible }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        transitionDelay: `${i * 40}ms`,
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease, background 0.2s, border-color 0.2s, color 0.2s",
        display: "inline-block",
        padding: "7px 14px",
        background: hov ? C.accentLight : C.bgBadge,
        border: `1px solid ${hov ? C.accent : C.border}`,
        color: hov ? C.accent : C.text,
        fontSize: "0.85rem",
        cursor: "default",
        userSelect: "none",
        borderRadius: "2px",
      }}
    >
      {tech}
    </span>
  );
}

/* ── Section block ── */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3 style={{
        fontSize: "1.1rem", fontWeight: 600, color: C.header,
        marginBottom: "0.75rem", display: "flex", alignItems: "center",
        gap: "10px", letterSpacing: "0.01em",
      }}>
        <span style={{
          display: "inline-block", width: "4px", height: "22px",
          background: C.accent, borderRadius: "2px", flexShrink: 0,
        }} />
        {title}
      </h3>
      <div style={{ paddingLeft: "14px" }}>{children}</div>
    </div>
  );
}

/* ── ProjectCard ── */
function ProjectCard({ project, index }) {
  const [cardRef, cardVisible] = useInView();
  const [hovered, setHovered] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  return (
    <>
      {activeImg !== null && (
        <div
          onClick={() => setActiveImg(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(26,18,9,0.85)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <img
            src={project.images[activeImg]}
            alt=""
            style={{
              maxWidth: "860px", width: "100%", maxHeight: "80vh",
              objectFit: "contain", borderRadius: "4px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
              animation: "scaleIn 0.25s cubic-bezier(.34,1.56,.64,1)",
              border: `1px solid ${C.border}`,
            }}
          />
          <button
            onClick={() => setActiveImg(null)}
            style={{
              position: "absolute", top: "1.5rem", right: "2rem",
              background: "none", border: "none",
              color: C.accentLight, fontSize: "2rem", cursor: "pointer", lineHeight: 1,
            }}
          >×</button>
        </div>
      )}

      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: C.bgCard,
          border: `1px solid ${hovered ? C.accent : C.border}`,
          overflow: "hidden",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.4s cubic-bezier(.22,1,.36,1), opacity 0.6s ease",
          boxShadow: hovered
            ? `0 16px 48px rgba(192,82,42,0.12), 0 4px 16px rgba(192,82,42,0.08)`
            : `0 2px 12px rgba(61,47,31,0.06)`,
          transform: cardVisible
            ? (hovered ? "translateY(-3px)" : "translateY(0)")
            : "translateY(40px)",
          opacity: cardVisible ? 1 : 0,
          transitionDelay: `${index * 100}ms`,
        }}
      >
        {/* Card header */}
        <div style={{
          background: hovered
            ? `linear-gradient(135deg, ${C.accent} 0%, ${C.header} 55%)`
            : C.header,
          padding: "1.5rem 2rem", position: "relative", overflow: "hidden",
          transition: "background 0.5s ease",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 80% 50%, rgba(232,201,184,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <span style={{
            position: "absolute", right: "1.5rem", top: "50%",
            transform: "translateY(-50%)", fontSize: "4rem", fontWeight: 700,
            color: "rgba(245,240,232,0.06)", lineHeight: 1, userSelect: "none",
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 style={{
            fontSize: "1.75rem", fontWeight: 300, letterSpacing: "-0.02em",
            color: "#faf7f1", position: "relative", zIndex: 1,
            transform: hovered ? "translateX(6px)" : "translateX(0)",
            transition: "transform 0.3s ease",
          }}>
            {project.title}
          </h2>
          <div style={{
            marginTop: "0.5rem",
            width: hovered ? "48px" : "24px", height: "2px",
            background: C.accentLight, borderRadius: "1px",
            transition: "width 0.4s ease",
          }} />
        </div>

        {/* Card body */}
        <div style={{ padding: "2rem" }}>
          <Section title="Idée du projet">
            <p style={{ color: C.textMuted, lineHeight: 1.75, fontSize: "0.95rem" }}>{project.idea}</p>
          </Section>
          <Section title="Description">
            <p style={{ color: C.textMuted, lineHeight: 1.75, fontSize: "0.95rem" }}>{project.description}</p>
          </Section>
          <Section title="Technologies utilisées">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {project.technologies.map((tech, i) => (
                <TechBadge key={i} tech={tech} i={i} parentVisible={cardVisible} />
              ))}
            </div>
          </Section>
          <Section title="Captures d'écran">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
              {project.images.map((image, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="img-thumb"
                  style={{
                    position: "relative", overflow: "hidden",
                    aspectRatio: "16/9", cursor: "zoom-in",
                    border: `1px solid ${C.border}`, borderRadius: "2px",
                  }}
                >
                  <img
                    src={image}
                    alt={`${project.title} capture ${i + 1}`}
                    className="thumb-img"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  />
                  <div className="thumb-overlay" style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(135deg, rgba(192,82,42,0.55), rgba(26,18,9,0.4))`,
                    opacity: 0, transition: "opacity 0.3s ease",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ color: "#faf7f1", fontSize: "1.4rem" }}>⤢</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <div style={{ paddingLeft: "14px" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              style={{
                display: "inline-block", padding: "12px 32px",
                background: C.header, color: "#faf7f1",
                textDecoration: "none", fontSize: "0.9rem",
                letterSpacing: "0.04em", position: "relative",
                overflow: "hidden", border: `1px solid ${C.header}`,
              }}
            >
              <span className="cta-fill" style={{
                position: "absolute", inset: 0, background: C.accent,
                transform: "translateX(-101%)",
                transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
              }} />
              <span style={{ position: "relative", zIndex: 1 }}>Voir sur GitHub →</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Main ── */
const Projects = () => {
  const [headerRef, headerVisible] = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn { from{transform:scale(.88)} to{transform:scale(1)} }
        .img-thumb:hover .thumb-img    { transform: scale(1.08); }
        .img-thumb:hover .thumb-overlay{ opacity: 1 !important; }
        .cta-btn:hover .cta-fill       { transform: translateX(0) !important; }
        .cta-btn                       { transition: letter-spacing 0.3s; }
        .cta-btn:hover                 { letter-spacing: 0.07em !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bg }}>
        {/* warm grain overlay */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "128px",
        }} />

        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "4rem 2rem", position: "relative", zIndex: 1 }}>
          {/* Hero */}
          <div
            ref={headerRef}
            style={{
              marginTop: "4rem", marginBottom: "4rem",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "none" : "translateY(-18px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <h1 style={{
              fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 300,
              color: C.header, letterSpacing: "-0.03em",
              marginBottom: "1rem", lineHeight: 1.1,
            }}>
              Mes Projets
            </h1>
            <div style={{
              height: "3px",
              background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
              borderRadius: "2px", marginBottom: "1.25rem",
              width: headerVisible ? "80px" : "0",
              transition: "width 0.6s 0.3s cubic-bezier(.22,1,.36,1)",
            }} />
            <p style={{
              fontSize: "1.05rem", color: C.textMuted, maxWidth: "520px", lineHeight: 1.7,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "none" : "translateY(8px)",
              transition: "opacity 0.5s 0.4s ease, transform 0.5s 0.4s ease",
            }}>
              Une collection de projets illustrant mes compétences techniques.
            </p>
            <div style={{
              marginTop: "1.75rem",
              display: "inline-flex", alignItems: "center", gap: "10px",
              border: `1px solid ${C.border}`, background: C.bgCard, padding: "10px 20px",
              opacity: headerVisible ? 1 : 0,
              transition: "opacity 0.5s 0.65s ease",
            }}>
              <span style={{ fontSize: "2rem", fontWeight: 300, color: C.accent, lineHeight: 1 }}>
                {headerVisible && <CountUp target={featuredProjects.length} />}
              </span>
              <span style={{ fontSize: "0.75rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Projets
              </span>
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;