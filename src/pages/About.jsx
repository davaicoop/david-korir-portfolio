import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";

const principles = [
  ["01","Respect","Every person brings a story, preferences, strengths and relationships. Support starts by recognizing the individual behind the care needs."],
  ["02","Belonging","A home should create opportunities for connection — with housemates, staff, family and the wider community."],
  ["03","Choice","Where appropriate, residents should have meaningful opportunities to participate in decisions about their routines and everyday experiences."],
];

export default function About(){return <main id="main-content">
  <section className="page-hero"><div className="container page-hero-content"><Reveal><span className="eyebrow">About BVK</span><h1>A home built around dignity and belonging.</h1><p>BVK Adult Foster Care is being shaped around a simple belief: people deserve support that protects their wellbeing without losing sight of who they are.</p></Reveal></div></section>
  <section className="section"><div className="container content-grid"><Reveal variant="left"><div className="content-copy"><span className="eyebrow">Our philosophy</span><h2>Care is more than assistance.</h2><p>It is knowing the person, understanding what matters to them and creating an environment where everyday life can still feel like their own.</p><p>That means paying attention to routines, communication, relationships, nourishment, privacy and the small choices that give a day its shape.</p></div></Reveal><Reveal variant="right"><div className="soft-panel"><span className="eyebrow">Our foundation</span><h3>Protection. Nourishment. Dignity.</h3><p>These three ideas connect the physical environment, the daily support experience and the culture we want residents and families to feel when they interact with BVK.</p></div></Reveal></div></section>
  <section className="section values-section"><div className="container"><Reveal><div className="section-heading"><span className="eyebrow">What matters to us</span><h2>The values behind the experience.</h2></div></Reveal><div className="feature-grid">{principles.map(([n,t,p],i)=><Reveal key={n} delay={i*90}><article className="feature-card"><span className="feature-number">{n}</span><h3>{t}</h3><p>{p}</p></article></Reveal>)}</div></div></section>
  <section className="page-cta"><div className="container page-cta-content"><Reveal><span className="eyebrow">Continue the journey</span><h2>Learn what our approach looks like in everyday life.</h2><p>Explore our support services, home environments and wellness philosophy.</p><Link to="/services" className="primary-button">Explore our services <Icon name="arrow" size={17}/></Link></Reveal></div></section>
</main>}
