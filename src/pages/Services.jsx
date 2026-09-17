import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";

const services=[
 ["heart","Person-centered support","Support shaped around the resident's needs, preferences, routines and appropriate care plan."],
 ["home","Daily living assistance","Appropriate help with everyday activities while encouraging participation and independence wherever possible."],
 ["shield","Medication support","Medication-related support only as permitted by the resident's care plan, authorization and applicable Michigan requirements."],
 ["spark","Wellness & routines","Supportive routines that make room for nourishment, movement, rest, social connection and meaningful activity."],
 ["heart","Community & activities","Opportunities for hobbies, outings, social experiences and the everyday interests that help make a home feel alive."],
 ["mail","Family communication","Clear, respectful communication with families and appropriate care partners throughout the care journey."],
];
export default function Services(){return <main id="main-content">
<section className="page-hero"><div className="container page-hero-content"><Reveal><span className="eyebrow">How we support</span><h1>Support designed around the whole person.</h1><p>The right support is personal. BVK's service approach combines everyday assistance with an environment that respects dignity, preferences and participation.</p></Reveal></div></section>
<section className="section"><div className="container"><Reveal><div className="section-heading"><span className="eyebrow">Our services</span><h2>Practical support. Human delivery.</h2><p>Services and levels of support are determined by individual needs, care plans, authorization and applicable requirements.</p></div></Reveal><div className="service-list">{services.map(([icon,title,text],i)=><Reveal key={title} delay={i*70}><article className="service-item"><div className="service-icon"><Icon name={icon} size={20}/></div><div><h3>{title}</h3><p>{text}</p></div></article></Reveal>)}</div></div></section>
<section className="section journey"><div className="container journey-layout"><Reveal variant="left"><div className="journey-copy"><span className="eyebrow">What good support should protect</span><h2>Independence has a place here.</h2><p>Support should not automatically mean doing everything for someone. When appropriate, we want daily routines to leave room for participation, preference and personal agency.</p></div></Reveal><Reveal variant="right"><div className="soft-panel"><span className="eyebrow">A useful conversation</span><h3>Tell us what a good day looks like.</h3><p>When families explore care, the most useful starting point can be the ordinary details: routines, interests, support needs, food preferences, communication and what helps someone feel comfortable.</p></div></Reveal></div></section>
<section className="page-cta"><div className="container page-cta-content"><Reveal><span className="eyebrow">Have questions?</span><h2>Let's discuss the kind of support you are looking for.</h2><p>Contact BVK to learn more about our homes, services and the next steps.</p><Link to="/contact" className="primary-button">Start a conversation <Icon name="arrow" size={17}/></Link></Reveal></div></section>
</main>}
