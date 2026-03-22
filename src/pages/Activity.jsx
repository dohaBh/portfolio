import React, { useEffect, useRef, useState } from "react";
import { activitiesData, activityTypes } from "../data/activitiesData";

/* ── palette (same as Projects) ── */
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

/* ── useInView hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

/* ── single activity card ── */
function ActivityCard({ activity, index }) {
  const [ref, visible] = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.bgCard,
        border: `1px solid ${hov ? C.accent : C.border}`,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: `opacity 0.55s ease, transform 0.55s cubic-bezier(.22,1,.36,1), border-color 0.3s, box-shadow 0.3s`,
        transitionDelay: `${(index % 3) * 80}ms`,
        boxShadow: hov
          ? "0 12px 40px rgba(192,82,42,0.11), 0 2px 8px rgba(61,47,31,0.07)"
          : "0 2px 8px rgba(61,47,31,0.05)",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
        <img
          src={activity.image}
          alt={activity.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.55s ease",
          }}
        />
        {/* gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(26,18,9,0.65) 0%, transparent 55%)",
        }} />

        {/* type badge */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          background: hov ? C.header : C.accent,
          color: "#faf7f1",
          padding: "4px 12px",
          fontSize: "0.75rem", fontWeight: 600,
          letterSpacing: "0.05em", textTransform: "uppercase",
          transition: "background 0.3s",
        }}>
          {activity.type}
        </div>

        {/* date */}
        <div style={{
          position: "absolute", bottom: "12px", left: "14px",
          color: C.accentLight, fontSize: "0.8rem",
          letterSpacing: "0.03em",
        }}>
          {activity.date}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.4rem 1.5rem" }}>
        <h3 style={{
          fontSize: "1.05rem", fontWeight: 600,
          color: hov ? C.accent : C.header,
          marginBottom: "0.3rem", lineHeight: 1.3,
          transition: "color 0.25s",
        }}>
          {activity.title}
        </h3>

        <p style={{
          fontSize: "0.8rem", fontWeight: 600,
          color: C.accent, marginBottom: "0.65rem",
          letterSpacing: "0.02em",
        }}>
          {activity.role}
        </p>

        <p style={{
          fontSize: "0.88rem", color: C.textMuted,
          lineHeight: 1.7, marginBottom: "1rem",
        }}>
          {activity.description}
        </p>

        {/* tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {activity.tags.map((tag, i) => (
            <span key={i} style={{
              padding: "4px 10px",
              background: C.bgBadge,
              border: `1px solid ${C.border}`,
              color: C.textMuted,
              fontSize: "0.75rem", borderRadius: "2px",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── main ── */
const Activity = () => {
  const [selectedFilter, setSelectedFilter] = useState("Tous");
  const [headerRef, headerVisible] = useInView(0.1);

  const filteredActivities = selectedFilter === "Tous"
    ? activitiesData
    : activitiesData.filter(a => a.type === selectedFilter);

  return (
    <>
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bg }}>
        {/* grain overlay */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "128px",
        }} />

        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "4rem 2rem", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div
            ref={headerRef}
            style={{
              marginTop: "4rem", marginBottom: "3rem",
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
              Mes Activités
            </h1>

            {/* animated underline */}
            <div style={{
              height: "3px",
              background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
              borderRadius: "2px", marginBottom: "1.25rem",
              width: headerVisible ? "80px" : "0",
              transition: "width 0.6s 0.3s cubic-bezier(.22,1,.36,1)",
            }} />

            <p style={{
              fontSize: "1.05rem", color: C.textMuted,
              maxWidth: "580px", lineHeight: 1.7, marginBottom: "2rem",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "none" : "translateY(8px)",
              transition: "opacity 0.5s 0.4s ease, transform 0.5s 0.4s ease",
            }}>
              Événements, conférences, compétitions et activités parascolaires
              auxquels j'ai participé et organisés tout au long de mon parcours académique.
            </p>

            {/* Filter buttons */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "10px",
              opacity: headerVisible ? 1 : 0,
              transition: "opacity 0.5s 0.55s ease",
            }}>
              {activityTypes.map((type) => {
                const active = selectedFilter === type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedFilter(type)}
                    style={{
                      padding: "8px 20px",
                      border: `1px solid ${active ? C.accent : C.border}`,
                      background: active ? C.accent : C.bgCard,
                      color: active ? "#faf7f1" : C.text,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      letterSpacing: "0.02em",
                      transition: "background 0.25s, border-color 0.25s, color 0.25s, transform 0.2s",
                      transform: active ? "translateY(-1px)" : "translateY(0)",
                      boxShadow: active ? `0 4px 12px rgba(192,82,42,0.2)` : "none",
                    }}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          {filteredActivities.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2rem",
            }}>
              {filteredActivities.map((activity, index) => (
                <ActivityCard key={activity.id} activity={activity} index={index} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: "center", padding: "5rem 0",
              color: C.textMuted, fontSize: "1.05rem",
              animation: "fadeIn 0.4s ease",
            }}>
              Aucune activité trouvée pour cette catégorie.
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Activity;