import { useCallback, useEffect, useRef, useState } from "react";
import { usePortfolioMotion } from "./usePortfolioMotion";
import ContactForm from "./ContactForm";
import ProjectCard from "./components/ProjectCard";
import ProjectDetails from "./components/ProjectDetails";
import { projects } from "./data/projects";

const EMAIL = "mkorirdavid@gmail.com";
const GITHUB = "https://github.com/davaicoop/";
const PORTFOLIO = "https://david-korir-portfolio.onrender.com/";
const skills = [
  ["Programming & Web", "JavaScript · HTML5 · CSS3 · React · Vue 3 · Node.js · Express.js · Vite · React Router"],
  ["Backend & Data", "REST APIs · API integration · Authentication · Authorization · RBAC · PostgreSQL · SQL · Database design"],
  ["Enterprise Technology", "Huawei AppCube · Low-code development · Widgets · Events · Scripts · Workflows · Requirements analysis"],
  ["Cybersecurity & Forensics", "Computer security · Digital forensics · Security awareness · OTP · Security logging · Network analysis · Network scanning"],
  ["Tools", "Git · GitHub · VS Code · Render · Autopsy · FTK Imager · Wireshark · Nmap · Huawei iLearning"],
];

function Reveal({children, delay=0, className=""}) { return <div className={`reveal ${className}`} style={{"--delay":`${delay}ms`}}>{children}</div> }
function Arrow(){return <span className="arrow">↗</span>}

export default function App(){
  const [menu,setMenu]=useState(false); const [active,setActive]=useState("home"); const [theme,setTheme]=useState(()=>{try{return localStorage.getItem("dk-theme")==="light"?"light":"dark"}catch{return "dark"}}); const [open,setOpen]=useState(null); const menuButton = useRef(null);
  const closeProject = useCallback(() => setOpen(null), []);
  useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem("dk-theme",theme)}catch{/* Storage may be disabled. */}},[theme]);
  usePortfolioMotion(setActive);
  useEffect(() => {
    if (menu) document.querySelector('#site-navigation button')?.focus();
    const escape = event => {
      if (event.key === "Escape" && menu) {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menu]);
  const go = id => {
    setMenu(false);
    const target = document.getElementById(id);
    if (!target) return;
    history.replaceState(null, '', `#${id}`);
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return <div className="site"><a className="skip-link" href="#main">Skip to content</a>
    <div className="progress" aria-hidden="true"><span/></div>
    <header className="nav"><div className="nav-inner">
      <button type="button" className="logo" onClick={()=>go("home")}><span>DK</span><b>DAVID KORIR</b></button>
      <nav id="site-navigation" aria-label="Main navigation" className={menu?"open":""}><span className="nav-indicator" aria-hidden="true"/>{["about","work","experience","security","skills","contact"].map(id=><button type="button" key={id} aria-current={active===id?"location":undefined} className={active===id?"active":""} onClick={()=>go(id)}>{id}</button>)}</nav>
      <div className="nav-actions"><button type="button" className="theme" onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label="Toggle theme">{theme==="dark"?"☼":"◐"}</button><button type="button" className="menu" ref={menuButton} aria-label={menu?"Close navigation":"Open navigation"} aria-expanded={menu} aria-controls="site-navigation" onClick={()=>setMenu(!menu)}>{menu?"×":"☰"}</button></div>
    </div></header>

    <main id="main" tabIndex={-1}>
      <section id="home" tabIndex={-1} className="hero"><div className="hero-grid">
        <Reveal><div className="hero-copy"><p className="kicker"><i/> Kenya · IT · Software · Security</p><h1>I build <em>useful</em> digital products and understand the systems behind them.</h1><p className="lead">I'm David Korir — a Computer Security and Forensics graduate focused on software development, enterprise technology and practical cybersecurity.</p><div className="actions"><button type="button" className="primary" onClick={()=>go("work")}>View my work <Arrow/></button><a className="text-link" href={`mailto:${EMAIL}`}>Let's talk <Arrow/></a></div></div></Reveal>
        <Reveal delay={140}><div className="hero-card"><div className="system-grid" aria-hidden="true"/><div className="orbit" aria-hidden="true"/><div className="orbit two" aria-hidden="true"/><div className="hero-label">DEVELOPER / SECURITY THINKER</div><div className="hero-coordinates" aria-hidden="true">01 / BUILD<br/>02 / TEST<br/>03 / SECURE</div><div className="hero-initials">DK</div><div className="hero-card-bottom"><span>IT & SOFTWARE<br/>DEVELOPMENT</span><strong>01—06</strong></div></div></Reveal>
      </div><div className="scroll-note"><span>Scroll</span><i/></div></section>

      <section id="about" tabIndex={-1} className="section about"><div className="section-head"><Reveal><p className="kicker"><i/>01 · About</p><h2>Curious about how things work. Serious about making them work.</h2></Reveal><Reveal delay={100}><p className="section-intro">My background sits between technology and security. I enjoy taking a requirement, understanding the problem behind it, then building and testing a solution from the ground up.</p></Reveal></div><Reveal delay={160}><div className="about-strip"><span>SECURITY</span><b>×</b><span>SOFTWARE</span><b>×</b><span>ENTERPRISE TECH</span><b>×</b><span>AI-ASSISTED WORKFLOWS</span></div></Reveal></section>

      <section id="work" tabIndex={-1} className="section work"><div className="section-head"><Reveal><p className="kicker"><i/>02 · Selected work</p><h2>Things I've built, tested and pushed forward.</h2></Reveal><Reveal delay={100}><p className="section-intro">From SaaS ideas to client websites and enterprise workflows, I like building things that solve a real problem.</p></Reveal></div><div className="project-grid">{projects.map((project, index) => <Reveal key={project.id} delay={index * 70}><ProjectCard project={project} onExplore={setOpen} email={EMAIL}/></Reveal>)}</div></section>

      <section id="experience" tabIndex={-1} className="section experience"><div className="experience-layout"><Reveal><div><p className="kicker"><i/>03 · Experience</p><h2>Enterprise technology, learned by doing.</h2><p className="section-intro">At Huawei Technologies Kenya, I worked as a Junior Product Technology Assistant in a client environment and developed low-code applications with Huawei AppCube.</p></div></Reveal><Reveal delay={100}><div className="timeline"><svg className="timeline-track" aria-hidden="true" viewBox="0 0 2 100" preserveAspectRatio="none"><path d="M1 0 V100" pathLength="1"/></svg><div><span>FEB 2024 — JUL 2024</span><h3>Huawei Technologies Kenya</h3><h4>Junior Product Technology Assistant</h4></div><ul><li>Built request flows, UI forms and approval pathways for an Internal Service Ordering Platform.</li><li>Configured widgets, scripts, dashboards and workflows, then tested and debugged features.</li><li>Worked from requirements through development, testing, troubleshooting and documentation.</li><li>Applied technical training from Huawei iLearning in a live enterprise environment.</li></ul></div></Reveal></div><div className="earlier"><Reveal><p className="kicker"><i/>Earlier experience</p></Reveal><Reveal delay={80}><div className="earlier-grid"><div><b>Greenfield Tea Factory</b><span>IT Department Assistant · 2022</span><p>Hardware configuration, equipment setup, troubleshooting, maintenance and user support.</p></div><div><b>Kerimist Water, Kericho</b><span>Sales & Marketing Agent · 2024–2025</span><p>Customer engagement, product communication, relationship management and service.</p></div></div></Reveal></div></section>

      <section id="security" tabIndex={-1} className="section security"><div className="security-layout"><Reveal><div><p className="kicker"><i/>04 · Security & forensics</p><h2>Security is part of how I think about technology.</h2><p className="section-intro">My security background gives me another lens when I build systems: permissions, visibility, authentication, evidence and safer workflows matter.</p></div></Reveal><div className="security-grid">{[["01","DIGITAL FORENSICS","Autopsy · FTK Imager"],["02","NETWORK ANALYSIS","Wireshark · Nmap"],["03","SECURE SYSTEMS","Authentication · RBAC · OTP"],["04","OPERATIONAL SECURITY","Logging · Access control"]].map((x,i)=><Reveal key={x[0]} delay={i*70}><div className="security-card"><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div></Reveal>)}</div></div></section>

      <section id="skills" tabIndex={-1} className="section skills"><div className="section-head"><Reveal><p className="kicker"><i/>05 · Skills</p><h2>The stack behind the work.</h2></Reveal></div><div className="skill-list">{skills.map((s,i)=><Reveal key={s[0]} delay={i*50}><div className="skill-row"><span>0{i+1}</span><h3>{s[0]}</h3><div className="skill-detail"><p>{s[1]}</p><div className="skill-meter" aria-hidden="true"><i style={{"--level":"100%"}}/></div></div></div></Reveal>)}</div><Reveal delay={120}><div className="education"><div><p className="kicker"><i/>Education</p><h3>Kabarak University</h3><p>Bachelor of Science in Computer Security and Forensics (BSCSF)</p></div><div><p>Relevant areas</p><b>Computer Security · Digital Forensics · Network Security · Databases · Web Technologies · Secure Systems · Systems Analysis & Design</b></div></div></Reveal></section>

      <section id="contact" tabIndex={-1} className="section contact"><Reveal><p className="kicker"><i/>06 · Contact</p><h2>Have an idea, a problem to solve, or an opportunity?</h2><p className="contact-text">I'm open to conversations around software development, enterprise technology, cybersecurity and interesting products.</p><div className="contact-actions"><a className="primary" href={`mailto:${EMAIL}`}>Email me <Arrow/></a><a className="outline" href={GITHUB} target="_blank" rel="noreferrer">GitHub <Arrow/></a></div><ContactForm email={EMAIL}/><div className="contact-meta"><span>{EMAIL}</span><span>Kenya</span><a href={PORTFOLIO}>david-korir-portfolio.onrender.com</a></div></Reveal></section>
    </main>
    <footer><span>DAVID KORIR</span><span>IT · SOFTWARE · SECURITY</span><span>© 2026</span></footer>
    {open && <ProjectDetails project={open} onClose={closeProject} email={EMAIL}/>}
  </div>
}
