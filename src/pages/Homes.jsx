import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
const homes=[
 {name:"BVK Kindred Home",location:"Detroit, Michigan",description:"A warm residential environment designed around comfort, connection, everyday routines and personalized support."},
 {name:"Growing with the community",location:"Detroit Metro Area",description:"As BVK grows, future homes will continue the same home-centered philosophy while responding to community needs."},
];
const experiences=[["home","Comfort","A residential atmosphere designed to feel lived-in, welcoming and personal."],["heart","Connection","Space for relationships, shared moments, hobbies and community participation."],["shield","Safety","Thoughtful routines and support practices shaped around resident needs and appropriate care plans."]];
export default function Homes(){return <main id="main-content">
<section className="page-hero"><div className="container page-hero-content"><Reveal><span className="eyebrow">Our homes</span><h1>A comfortable place to belong.</h1><p>The physical environment is part of care. We want BVK homes to feel warm, calm and genuinely lived in — places where people can build routines and relationships.</p></Reveal></div></section>
<section className="section"><div className="container"><Reveal><div className="section-heading"><span className="eyebrow">Home environments</span><h2>More home. Less institution.</h2><p>Our goal is to create residential spaces where support sits naturally inside everyday life.</p></div></Reveal><div className="home-grid">{homes.map((home,i)=><Reveal key={home.name} delay={i*120}><article className="home-card"><div className="home-card-content"><span className="eyebrow">{home.location}</span><h3>{home.name}</h3><p>{home.description}</p></div></article></Reveal>)}</div></div></section>
<section className="section"><div className="container content-grid"><Reveal variant="left"><div><span className="eyebrow">Everyday living</span><h2>A place where ordinary moments matter.</h2></div></Reveal><div className="service-list">{experiences.map(([icon,title,text],i)=><Reveal key={title} delay={i*80}><div className="service-item"><div className="service-icon"><Icon name={icon} size={20}/></div><div><h3>{title}</h3><p>{text}</p></div></div></Reveal>)}</div></div></section>
<section className="page-cta"><div className="container page-cta-content"><Reveal><span className="eyebrow">Visit & learn</span><h2>Curious whether BVK could be a good fit?</h2><p>Start with a conversation about your situation, questions and what you are hoping to find in a home.</p><Link to="/contact" className="primary-button">Contact BVK <Icon name="arrow" size={17}/></Link></Reveal></div></section>
</main>}
