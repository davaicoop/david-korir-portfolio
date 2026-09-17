import { Link } from "react-router-dom";
import BvkButterfly from "../components/BvkButterfly";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";

const values = [
  ["01", "Protection", "A calm, safety-minded environment where routines, boundaries and support are treated with care.", "shield"],
  ["02", "Nourishment", "Food, rest, movement and meaningful routines are part of creating a home that feels considered.", "spark"],
  ["03", "Dignity", "Support should make room for individuality, choice, privacy and the relationships that matter.", "heart"],
];

const journey = [
  ["01", "Understand the person", "We start by listening: preferences, routines, strengths, support needs and what a good day looks like."],
  ["02", "Create a sense of home", "The environment matters. We focus on comfort, familiarity, connection and the small details that make a residence feel personal."],
  ["03", "Support everyday life", "The goal is not to take over someone's life. It is to provide appropriate support while encouraging participation and independence."],
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="hero-content container">
          <Reveal>
            <div className="hero-copy">
              <span className="eyebrow">Detroit, Michigan · Adult Foster Care</span>
              <h1>A safe home.<br/>A vibrant life.<br/><span>A place to belong.</span></h1>
              <p>BVK creates supportive residential environments where care feels personal, everyday life feels meaningful, and people are treated with dignity.</p>
              <div className="hero-actions">
                <Link to="/contact" className="primary-button">Start a conversation <Icon name="arrow" size={17}/></Link>
                <Link to="/about" className="secondary-button">Discover BVK <Icon name="arrow" size={17}/></Link>
              </div>
              <div className="hero-mini"><span className="hero-mini-dot"/> Thoughtful support · Meaningful routines · Human connection</div>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={150}>
            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit" />
              <div className="art-circle"><BvkButterfly/></div>
              <div className="art-leaf leaf-one"/><div className="art-leaf leaf-two"/><div className="art-leaf leaf-three"/>
              <div className="art-card"><small>The BVK foundation</small><strong>Protection.</strong><strong>Nourishment.</strong><strong>Dignity.</strong></div>
            </div>
          </Reveal>
        </div>
        <div className="scroll-cue"><span>Scroll to explore</span><span className="scroll-line"/></div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track">{Array.from({length:2}).flatMap((_,i)=>["Protection","Nourishment","Dignity","Belonging","Everyday life","Connection"].map((x,j)=><span className="marquee-item" key={`${i}-${j}`}>{x}</span>))}</div></div>

      <section className="section story">
        <div className="container story-intro">
          <Reveal variant="left"><div><span className="eyebrow">The BVK difference</span><h2>Care should feel like a relationship, not a transaction.</h2></div></Reveal>
          <Reveal variant="right" delay={100}><div className="story-intro-copy"><p>Adult foster care is about more than a list of services. It is about the environment around a person: the people they see, the routines they know, the meals they enjoy and the choices they are able to make.</p><p>At BVK, we are building a home culture around those everyday moments. Our approach is warm, respectful and intentionally personal.</p><div className="story-stat"><b>24/7</b><span>A home-centered approach to everyday support, shaped by individual needs and care plans.</span></div></div></Reveal>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <Reveal><div className="section-heading"><span className="eyebrow">What guides us</span><h2>Three ideas behind every part of the experience.</h2><p>These are more than words on a wall. They are the lens we use when thinking about the home, the daily rhythm and the people we support.</p></div></Reveal>
          <div className="value-grid">{values.map(([number,title,text,icon],i)=><Reveal key={title} delay={i*90}><article className="value-card"><div className="value-top"><span className="value-number">{number}</span><span className="value-icon"><Icon name={icon} size={21}/></span></div><div><h3>{title}</h3><p>{text}</p></div></article></Reveal>)}</div>
        </div>
      </section>

      <section className="section journey">
        <div className="container journey-layout">
          <Reveal variant="left"><div className="journey-copy"><span className="eyebrow">The experience</span><h2>Designed to make the journey feel clearer.</h2><p>Choosing care can be a big decision. We want the experience of learning about BVK to feel just as human as the care environment we are building.</p></div></Reveal>
          <div className="journey-list">{journey.map(([n,t,p],i)=><Reveal key={n} delay={i*100}><article className="journey-card"><span className="journey-index">{n}</span><div><h3>{t}</h3><p>{p}</p></div></article></Reveal>)}</div>
        </div>
      </section>

      <section className="section wellness-preview">
        <div className="container wellness-layout">
          <Reveal variant="left"><div className="wellness-copy"><span className="eyebrow">Food & wellness</span><h2>Small daily choices can make a home feel deeply personal.</h2><p>Meals can carry memories. A familiar routine can create comfort. A shared activity can become the best part of someone's day. BVK's wellness philosophy makes room for those moments.</p><Link to="/wellness" className="secondary-button">Explore food & wellness <Icon name="arrow" size={17}/></Link></div></Reveal>
          <Reveal variant="scale" delay={120}><div className="wellness-card"><span>BVK WELLNESS PHILOSOPHY</span><h3>Fresh.<br/>Thoughtful.<br/>Personal.</h3><p>Individual dietary needs, preferences and appropriate professional guidance should always shape a resident's plan.</p></div></Reveal>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container"><Reveal variant="scale"><div className="cta-box"><span className="eyebrow">Your next step</span><h2>Sometimes the best place to start is simply a conversation.</h2><p>Ask questions, tell us what you are looking for and learn more about the BVK approach without pressure.</p><Link to="/contact" className="primary-button">Talk with BVK <Icon name="arrow" size={17}/></Link></div></Reveal></div>
      </section>
    </main>
  );
}
