import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-orb footer-orb-one" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand" aria-label="BVK Adult Foster Care home">
            <span className="brand-mark"><span>B</span></span>
            <span className="brand-text"><strong>BVK</strong><small>Adult Foster Care</small></span>
          </Link>
          <p className="footer-tagline">Protection. Nourishment. Dignity.</p>
          <p className="footer-note">A residential care approach shaped around dignity, connection and the rhythms of everyday life.</p>
        </div>
        <div className="footer-column"><h2>Explore</h2><Link to="/about">Our philosophy</Link><Link to="/services">How we support</Link><Link to="/homes">Our homes</Link><Link to="/wellness">Food & wellness</Link></div>
        <div className="footer-column"><h2>Connect</h2><Link to="/contact"><Icon name="mail" size={16}/> Contact BVK</Link><span><Icon name="pin" size={16}/> Detroit, Michigan</span><span>Serving Detroit and surrounding communities</span></div>
      </div>
      <div className="footer-bottom"><div className="container footer-bottom-inner"><span>© {new Date().getFullYear()} BVK Adult Foster Care</span><div><Link to="/privacy">Privacy</Link><Link to="/accessibility">Accessibility</Link></div></div></div>
    </footer>
  );
}
