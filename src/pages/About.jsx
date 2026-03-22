import React, { useEffect, useRef, useState } from "react";

/* ── palette ── */
const C = {
  bg:         "#f5f0e8",
  bgCard:     "#faf7f1",
  bgBadge:    "#ede8de",
  border:     "#ddd6c8",
  header:     "#1a1209",
  text:       "#3d2f1f",
  textMuted:  "#7a6a57",
  accent:     "#c0522a",
  accentLight:"#e8c9b8",
};

/* ── useInView ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeSection({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.65s ${delay}ms ease, transform 0.65s ${delay}ms cubic-bezier(.22,1,.36,1)`,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div ref={ref} style={{ marginBottom: "2.5rem" }}>
      <h2 style={{
        fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 300,
        color: C.header, letterSpacing: "-0.02em", marginBottom: "0.6rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(-16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        {children}
      </h2>
      <div style={{
        height: "2px",
        background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
        borderRadius: "2px",
        width: visible ? "64px" : "0",
        transition: "width 0.5s 0.2s cubic-bezier(.22,1,.36,1)",
      }} />
    </div>
  );
}

/* ── DATA from CV ── */
const skillCategories = [
  {
    label: "Programmation",
    icon: "{ }",
    items: ["C", "C++", "C#", "Python", "Java", "PHP", "JavaScript", "JavaEE"],
  },
  {
    label: "Web",
    icon: "</>",
    items: ["HTML", "CSS", "XML", "React", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "Frameworks & Libs",
    icon: "⬡",
    items: ["Symfony", ".NET", "Spring Boot", "JavaFX", "Axios", "numpy", "matplotlib"],
  },
  {
    label: "Bases de données",
    icon: "🗄",
    items: ["MySQL", "Firebase", "SQLite"],
  },
  {
    label: "DevOps & Outils",
    icon: "⚙",
    items: ["Git", "GitHub", "GitLab", "Docker", "Linux", "JUnit", "Postman", "Jira"],
  },
  {
    label: "Gestion de projet",
    icon: "📋",
    items: ["Scrum", "Agile", "Jira"],
  },
];

const experiences = [
  {
    period: "Juil – Août 2025",
    role: "Stagiaire en Développement .NET",
    company: "SQLI",
    location: "Oujda, Maroc",
    points: [
      "Développement d'une application web de gestion des tâches pour le département .NET.",
      "Responsable de mon équipe.",
      "Réalisation de 4 fonctionnalités : Connexion, Espace de travail, Gestion des tâches et Calendrier avec gestion des rôles.",
    ],
  },
];

const education = [
  {
    degree: "Cycle Ingénieur — Génie Informatique (IA)",
    school: "ENSAO — École Nationale des Sciences Appliquées",
    location: "Oujda-Angad, Maroc",
    period: "Depuis 2024",
  },
  {
    degree: "Cycle Préparatoire",
    school: "ENSAO — École Nationale des Sciences Appliquées",
    location: "Oujda-Angad, Maroc",
    period: "2022 – 2024",
  },
  {
    degree: "Baccalauréat Sciences Physiques et Chimiques",
    school: "SandrineO",
    location: "Oujda-Angad, Maroc",
    period: "2021 – 2022",
    note: "Option Français · Mention Très Bien",
  },
];

const parascolaire = [
  { club: "Club GI",       role: "Présidente",              period: "2025 – 2026" },
  { club: "Club Reporters", role: "Responsable Communication", period: "2025 – 2026" },
  { club: "Club Reporters", role: "Membre",                  period: "2024 – 2025" },
];

const languages = [
  { lang: "Arabe",   level: "Natif",    pct: 100 },
  { lang: "Français", level: "Bilingue", pct: 95 },
  { lang: "Anglais", level: "Courant",  pct: 80 },
];

const interests = [
  { icon: "📷", title: "Photographie", desc: "Capturer des perspectives et des instants." },
  { icon: "📖", title: "Lecture",      desc: "Explorer des idées à travers les livres." },
  { icon: "✍️", title: "Rédaction",   desc: "Exprimer des idées par l'écrit." },
];

/* ── components ── */
function SkillTag({ label, i, parentVisible }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "4px 12px",
        background: hov ? C.accentLight : C.bgBadge,
        border: `1px solid ${hov ? C.accent : C.border}`,
        color: hov ? C.accent : C.textMuted,
        fontSize: "0.8rem", borderRadius: "2px", cursor: "default",
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? "none" : "scale(0.85)",
        transition: `opacity 0.35s ${i * 35}ms ease, transform 0.35s ${i * 35}ms ease, background 0.2s, border-color 0.2s, color 0.2s`,
      }}
    >
      {label}
    </span>
  );
}

function SkillCard({ category, index }) {
  const [ref, visible] = useInView(0.1);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.bgCard,
        border: `1px solid ${hov ? C.accent : C.border}`,
        padding: "1.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ${index * 70}ms ease, transform 0.5s ${index * 70}ms ease, border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hov ? `0 8px 32px rgba(192,82,42,0.1)` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
        <span style={{
          width: "36px", height: "36px", borderRadius: "6px",
          background: hov ? C.accent : C.bgBadge,
          border: `1px solid ${hov ? C.accent : C.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.8rem", fontWeight: 700, color: hov ? "#faf7f1" : C.accent,
          transition: "background 0.3s, color 0.3s", fontFamily: "monospace",
        }}>
          {category.icon}
        </span>
        <span style={{ fontWeight: 600, color: C.header, fontSize: "0.95rem" }}>
          {category.label}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {category.items.map((item, i) => (
          <SkillTag key={i} label={item} i={i} parentVisible={visible} />
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({ exp, index }) {
  const [ref, visible] = useInView(0.1);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.bgCard,
        border: `1px solid ${hov ? C.accent : C.border}`,
        padding: "1.75rem 2rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 0.55s ${index * 80}ms ease, transform 0.55s ${index * 80}ms ease, border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hov ? `0 10px 40px rgba(192,82,42,0.1)` : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: hov ? "4px" : "2px",
        background: `linear-gradient(180deg, ${C.accent}, ${C.accentLight})`,
        transition: "width 0.3s",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: C.header, marginBottom: "0.2rem" }}>
            {exp.role}
          </h3>
          <p style={{ fontSize: "0.9rem", color: C.accent, fontWeight: 600 }}>
            {exp.company} · <span style={{ color: C.textMuted, fontWeight: 400 }}>{exp.location}</span>
          </p>
        </div>
        <span style={{
          padding: "4px 12px", background: C.bgBadge,
          border: `1px solid ${C.border}`, fontSize: "0.78rem",
          color: C.textMuted, whiteSpace: "nowrap",
        }}>
          {exp.period}
        </span>
      </div>
      <ul style={{ marginTop: "0.75rem", paddingLeft: "1rem", listStyle: "none" }}>
        {exp.points.map((p, i) => (
          <li key={i} style={{
            color: C.textMuted, fontSize: "0.88rem", lineHeight: 1.7,
            marginBottom: "0.35rem", display: "flex", gap: "8px",
          }}>
            <span style={{ color: C.accent, flexShrink: 0, marginTop: "2px" }}>›</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationCard({ edu, index }) {
  const [ref, visible] = useInView(0.1);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.bgCard,
        border: `1px solid ${hov ? C.accent : C.border}`,
        padding: "1.25rem 1.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        flexWrap: "wrap", gap: "0.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ${index * 80}ms ease, transform 0.5s ${index * 80}ms ease, border-color 0.3s`,
      }}
    >
      <div>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: hov ? C.accent : C.header, transition: "color 0.25s", marginBottom: "0.2rem" }}>
          {edu.degree}
        </h3>
        <p style={{ fontSize: "0.85rem", color: C.textMuted }}>{edu.school} · {edu.location}</p>
        {edu.note && <p style={{ fontSize: "0.8rem", color: C.accent, marginTop: "0.2rem" }}>{edu.note}</p>}
      </div>
      <span style={{
        padding: "3px 10px", background: C.bgBadge,
        border: `1px solid ${C.border}`, fontSize: "0.78rem",
        color: C.textMuted, whiteSpace: "nowrap",
      }}>
        {edu.period}
      </span>
    </div>
  );
}

function LangBar({ lang, level, pct, index }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(12px)",
      transition: `opacity 0.4s ${index * 80}ms ease, transform 0.4s ${index * 80}ms ease`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontWeight: 600, color: C.header, fontSize: "0.9rem" }}>{lang}</span>
        <span style={{ fontSize: "0.8rem", color: C.accent }}>{level}</span>
      </div>
      <div style={{ height: "5px", background: C.bgBadge, borderRadius: "3px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
          borderRadius: "3px",
          width: visible ? `${pct}%` : "0%",
          transition: `width 0.8s ${index * 100 + 200}ms cubic-bezier(.22,1,.36,1)`,
        }} />
      </div>
    </div>
  );
}

function InterestCard({ item, index }) {
  const [ref, visible] = useInView(0.1);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.bgCard,
        border: `1px solid ${hov ? C.accent : C.border}`,
        padding: "1.4rem", cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? (hov ? "translateY(-4px)" : "translateY(0)") : "translateY(20px)",
        transition: `opacity 0.5s ${index * 70}ms ease, transform 0.4s ease, border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hov ? `0 10px 30px rgba(192,82,42,0.1)` : "none",
      }}
    >
      <div style={{ fontSize: "1.6rem", marginBottom: "0.6rem" }}>{item.icon}</div>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: hov ? C.accent : C.header, marginBottom: "0.4rem", transition: "color 0.25s" }}>
        {item.title}
      </h3>
      <p style={{ fontSize: "0.85rem", color: C.textMuted, lineHeight: 1.6 }}>{item.desc}</p>
    </div>
  );
}

function CountUp({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let v = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      v += step;
      if (v >= target) { setVal(target); clearInterval(id); }
      else setVal(v);
    }, 25);
    return () => clearInterval(id);
  }, [target]);
  return <>{val}{suffix}</>;
}

/* ── Main ── */
const About = () => {
  const [heroRef, heroVisible] = useInView(0.05);
  const [imgHov, setImgHov] = useState(false);

  return (
    <>
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bg }}>
        {/* grain */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "128px",
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "6rem 2rem 5rem", position: "relative", zIndex: 1 }}>

          {/* ═══ HERO ═══ */}
          <div ref={heroRef} style={{
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: "4rem", alignItems: "center", marginBottom: "6rem",
          }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "5px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
                marginBottom: "1.5rem",
                opacity: heroVisible ? 1 : 0, transition: "opacity 0.5s 0.1s ease",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.accent, display: "inline-block" }} />
                <span style={{ fontSize: "0.75rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Cycle Ingénieur · ENSAO Oujda · Option IA
                </span>
              </div>

              <h1 style={{
                fontSize: "clamp(2.8rem,5vw,4rem)", fontWeight: 300,
                color: C.header, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "0.3rem",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(-12px)",
                transition: "opacity 0.6s 0.15s ease, transform 0.6s 0.15s ease",
              }}>
                Bouchikhi
              </h1>
              <h1 style={{
                fontSize: "clamp(2.8rem,5vw,4rem)", fontWeight: 700,
                color: C.accent, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.5rem",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(-8px)",
                transition: "opacity 0.6s 0.25s ease, transform 0.6s 0.25s ease",
              }}>
                Doha
              </h1>

              <div style={{
                height: "3px",
                background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
                borderRadius: "2px", marginBottom: "1.5rem",
                width: heroVisible ? "80px" : "0",
                transition: "width 0.6s 0.35s cubic-bezier(.22,1,.36,1)",
              }} />

              <p style={{
                fontSize: "1.05rem", color: C.text, lineHeight: 1.7,
                maxWidth: "500px", marginBottom: "0.75rem",
                opacity: heroVisible ? 1 : 0, transition: "opacity 0.5s 0.4s ease",
              }}>
                Future Ingénieure en Génie Informatique, option <strong style={{ color: C.accent }}>Intelligence Artificielle</strong>.
              </p>
              <p style={{
                fontSize: "0.95rem", color: C.textMuted, lineHeight: 1.7,
                maxWidth: "480px", marginBottom: "2rem",
                opacity: heroVisible ? 1 : 0, transition: "opacity 0.5s 0.5s ease",
              }}>
                Passionnée par les nouvelles technologies et le développement de solutions innovantes. Curieuse, rigoureuse et motivée.
              </p>

              {/* stats */}
              <div style={{
                display: "flex", gap: "1rem", flexWrap: "wrap",
                opacity: heroVisible ? 1 : 0, transition: "opacity 0.5s 0.6s ease",
              }}>
                {[
                  { value: 3, suffix: "+", label: "Projets" },
                  { value: 15, suffix: "+", label: "Technologies" },
                  { value: 1, suffix: " stage", label: "Expérience" },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: "12px 20px", background: C.bgCard, border: `1px solid ${C.border}`,
                    textAlign: "center", minWidth: "90px",
                  }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 300, color: C.accent, lineHeight: 1 }}>
                      {heroVisible && <CountUp target={s.value} suffix={s.suffix} />}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "4px" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* photo */}
            <div
              onMouseEnter={() => setImgHov(true)}
              onMouseLeave={() => setImgHov(false)}
              style={{ position: "relative", flexShrink: 0, opacity: heroVisible ? 1 : 0, transition: "opacity 0.7s 0.3s ease" }}
            >
              <div style={{
                position: "absolute", top: "12px", left: "12px",
                width: "240px", height: "240px", borderRadius: "50%",
                border: `2px solid ${C.accentLight}`,
                transition: "transform 0.4s ease",
                transform: imgHov ? "translate(4px,4px)" : "none", zIndex: 0,
              }} />
              <img
                src="/images/doha.jpeg"
                alt="Doha Bouchikhi"
                style={{
                  width: "240px", height: "240px", objectFit: "cover", borderRadius: "50%",
                  border: `3px solid ${imgHov ? C.accent : C.border}`,
                  position: "relative", zIndex: 1,
                  transform: imgHov ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.4s ease, border-color 0.3s",
                  boxShadow: imgHov ? `0 20px 60px rgba(192,82,42,0.2)` : `0 8px 32px rgba(61,47,31,0.1)`,
                  animation: "float 5s ease-in-out infinite",
                }}
              />
              <div style={{
                position: "absolute", bottom: "16px", right: "8px", zIndex: 2,
                width: "20px", height: "20px", borderRadius: "50%",
                background: C.accent, border: `3px solid ${C.bg}`,
                boxShadow: `0 0 0 ${imgHov ? "5px" : "0px"} ${C.accentLight}`,
                transition: "box-shadow 0.3s",
              }} />
            </div>
          </div>

          {/* ═══ EXPERIENCE ═══ */}
          <section style={{ marginBottom: "5rem" }}>
            <FadeSection>
              <SectionTitle>Expérience Professionnelle</SectionTitle>
            </FadeSection>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {experiences.map((exp, i) => <ExperienceCard key={i} exp={exp} index={i} />)}
            </div>
          </section>

          {/* ═══ FORMATION ═══ */}
          <section style={{ marginBottom: "5rem" }}>
            <FadeSection>
              <SectionTitle>Formation</SectionTitle>
            </FadeSection>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {education.map((edu, i) => <EducationCard key={i} edu={edu} index={i} />)}
            </div>
          </section>

          {/* ═══ SKILLS ═══ */}
          <section style={{ marginBottom: "5rem" }}>
            <FadeSection>
              <SectionTitle>Compétences Techniques</SectionTitle>
            </FadeSection>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}>
              {skillCategories.map((cat, i) => <SkillCard key={i} category={cat} index={i} />)}
            </div>
          </section>

          {/* ═══ LANGUES + PARASCOLAIRE ═══ */}
          <section style={{ marginBottom: "5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
              {/* langues */}
              <FadeSection>
                <SectionTitle>Langues</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  {languages.map((l, i) => <LangBar key={i} {...l} index={i} />)}
                </div>
              </FadeSection>

              {/* parascolaire */}
              <FadeSection delay={100}>
                <SectionTitle>Parascolaire</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {parascolaire.map((p, i) => {
                    const [ref, visible] = [useRef(null), true];
                    return (
                      <div key={i} style={{
                        background: C.bgCard, border: `1px solid ${C.border}`,
                        padding: "1rem 1.25rem",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        gap: "0.5rem",
                      }}>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: "0.9rem", color: C.header }}>{p.role}</p>
                          <p style={{ fontSize: "0.82rem", color: C.accent }}>{p.club}</p>
                        </div>
                        <span style={{
                          fontSize: "0.78rem", color: C.textMuted, whiteSpace: "nowrap",
                          padding: "3px 10px", background: C.bgBadge, border: `1px solid ${C.border}`,
                        }}>{p.period}</span>
                      </div>
                    );
                  })}
                </div>
              </FadeSection>
            </div>
          </section>

          {/* ═══ INTERETS ═══ */}
          <section>
            <FadeSection>
              <SectionTitle>Centres d'Intérêt</SectionTitle>
            </FadeSection>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "1.25rem" }}>
              {interests.map((item, i) => <InterestCard key={i} item={item} index={i} />)}
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default About;
