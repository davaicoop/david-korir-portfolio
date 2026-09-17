import { Link } from "react-router-dom";
import Icon from "../components/Icon";
export default function NotFound(){return <main id="main-content" className="not-found"><div className="container"><span className="eyebrow">404 · Page not found</span><h1>This page wandered off.</h1><p>The page you're looking for doesn't exist or may have moved.</p><Link to="/" className="primary-button">Return home <Icon name="arrow" size={17}/></Link></div></main>}
