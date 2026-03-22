import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const ACCENT = "#c98a1a";
const ACCENT_DARK = "#a87214";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/Project", label: "Projets" },
    { path: "/Activity", label: "Activités" },
    { path: "/About", label: "À propos" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md shadow-lg transition-all duration-300">

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <span
                  style={{
                    color: isActive(link.path) ? ACCENT : "white",
                    transition: "color 0.2s",
                  }}
                  className="text-base font-semibold tracking-wide"
                  onMouseEnter={e => { e.currentTarget.style.color = ACCENT; }}
                  onMouseLeave={e => { if (!isActive(link.path)) e.currentTarget.style.color = "white"; }}
                >
                  {link.label}
                </span>

                {isActive(link.path) && (
                  <div
                    className="absolute -bottom-2 left-0 right-0 h-0.5"
                    style={{ background: ACCENT }}
                  />
                )}
                {!isActive(link.path) && (
                  <div
                    className="absolute -bottom-2 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ background: ACCENT }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CV Button - Desktop */}
          <div className="hidden md:block">
            <a
              href="/cv.pdf"
              download
              style={{ background: ACCENT, transition: "background 0.2s, transform 0.15s" }}
              className="px-7 py-3 text-white rounded-md text-sm font-semibold inline-block"
              onMouseEnter={e => { e.currentTarget.style.background = ACCENT_DARK; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Télécharger CV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white transition-colors"
            onMouseEnter={e => e.currentTarget.style.color = ACCENT}
            onMouseLeave={e => e.currentTarget.style.color = "white"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-black/98 backdrop-blur-md border-t border-gray-800">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ color: isActive(link.path) ? ACCENT : "white", transition: "color 0.2s" }}
                className="block py-2 text-base font-semibold"
                onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                onMouseLeave={e => { if (!isActive(link.path)) e.currentTarget.style.color = "white"; }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/cv.pdf"
              download
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ background: ACCENT, transition: "background 0.2s" }}
              className="block w-full text-center px-6 py-2.5 text-white rounded-md text-sm font-semibold mt-4"
              onMouseEnter={e => e.currentTarget.style.background = ACCENT_DARK}
              onMouseLeave={e => e.currentTarget.style.background = ACCENT}
            >
              Télécharger CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;