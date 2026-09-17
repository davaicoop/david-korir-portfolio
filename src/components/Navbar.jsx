import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Icon from "./Icon";

const links = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Our Homes", path: "/homes" },
  { label: "Wellness", path: "/wellness" },
];

const navClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`.trim();

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="navbar-shell">
        <div className="navbar-inner">
          <Link to="/" className="brand" aria-label="BVK Adult Foster Care home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark"><span>B</span></span>
            <span className="brand-text"><strong>BVK</strong><small>Adult Foster Care</small></span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            <NavLink to="/" end className={navClass}>Home</NavLink>
            {links.map((link) => <NavLink key={link.path} to={link.path} className={navClass}>{link.label}</NavLink>)}
          </nav>

          <Link to="/contact" className="nav-button desktop-contact">
            Begin a Conversation <Icon name="arrow" size={16} />
          </Link>

          <button className="menu-button" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            <NavLink to="/" end className={navClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
            {links.map((link) => <NavLink key={link.path} to={link.path} className={navClass} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>)}
            <Link to="/contact" className="nav-button mobile-contact" onClick={() => setMenuOpen(false)}>Begin a Conversation <Icon name="arrow" size={16} /></Link>
          </nav>
        )}
      </div>
    </header>
  );
}
