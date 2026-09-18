import { useEffect, useRef, useState } from "react";
import { usePortfolioMotion } from "./usePortfolioMotion";
import ContactForm from "./ContactForm";

const EMAIL = "mkorirdavid@gmail.com";
const GITHUB = "https://github.com/davaicoop/";
const PORTFOLIO = "https://david-korir-portfolio.onrender.com/";
const BVK_LIVE = "https://bvk-adult-foster-care.onrender.com/";
const BVK_REPO = "https://github.com/davaicoop/bvk-adult-foster-care";

const projects = [
  { n:"01", type:"PROPERTY OPERATIONS · SAAS", title:"BNB Manager", text:"A property-operations platform I designed and built to bring bookings, expenses, payments, records and everyday workflows into one place.", stack:["React","Node.js","PostgreSQL"], tone:"gold" },
  { n:"02", type:"CLIENT WEBSITE · FREELANCE", title:"BVK Adult Foster Care", text:"A responsive website I developed for a Detroit adult foster care business, turning its services, homes and vision into a clear digital presence.", stack:["React","Vite","JavaScript","Render"], tone:"red", links:[["Live website",BVK_LIVE],["GitHub",BVK_REPO]] },
  { n:"03", type:"INDEPENDENT · PRODUCT LAB", title:"Founder Projects", text:"An evolving collection of software ideas built around practical business problems, automation and better ways of working.", stack:["React","JavaScript","Node.js","PostgreSQL"], tone:"violet" },
  { n:"04", type:"ENTERPRISE · HUAWEI APPCUBE", title:"Internal Service Ordering Platform", text:"Enterprise development work where I turned requirements into application features, workflows, dashboards, testing and documentation.", stack:["AppCube","Widgets","Scripts","Workflows"], tone:"cyan" }
];

const skills = [
  ["Programming & Web", "JavaScript · HTML5 · CSS3 · React · Vue 3 · Node.js · Express.js · Vite · React Router", 88],
  ["Backend & Data", "REST APIs · API integration · Authentication · Authorization · RBAC · PostgreSQL · SQL · Database design", 82],
  ["Enterprise Technology", "Huawei AppCube · Low-code development · Widgets · Events · Scripts · Workflows · Requirements analysis", 78],
  ["Cybersecurity & Forensics", "Computer security · Digital forensics · Security awareness · OTP · Security logging · Network analysis · Network scanning", 86],
  ["Tools", "Git · GitHub · VS Code · Render · Autopsy · FTK Imager · Wireshark · Nmap · Huawei iLearning", 84],
];

function Reveal({children, delay=0, className=""}) { return <div className={`reveal ${className}`} style={{"--delay":`${delay}ms`}}>{children}</div> }
function Arrow(){return <span className="arrow">↗</span>}

export default function App(){
  const [menu,setMenu]=useState(false); const [active,setActive]=useState("home"); const [theme,setTheme]=useState(()=>{try{return localStorage.getItem("dk-theme")==="light"?"light":"dark"}catch{return "dark"}}); const [open,setOpen]=useState(null); const [progress,setProgress]=useState(0);
  useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem("dk-theme",theme)}catch{/* Storage may be disabled. */}},[theme]);
  usePortfolioMotion(setActive, setProgress);
  const dialog = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const keydown = event => {
      if (event.key === "Escape") setOpen(null);
      if (event.key !== "Tab") return;
      const nodes = [...dialog.current.querySelectorAll("button, a[href]")];
      const first = nodes[0], last = nodes.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", keydown);
      previous?.focus();
    };
  }, [open]);
  useEffect(() => {
    const escape = event => { if (event.key === "Escape") setMenu(false); };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  const go=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})};
  return <div className="site"><a className="skip-link" href="#main">Skip to content</a>
    <div className="progress"><span style={{transform:`scaleX(${progress})`}}/></div>
    <header className="nav"><div className="nav-inner">
      <button className="logo" onClick={()=>go("home")}><span>DK</span><b>DAVID KORIR</b></button>
      <nav id="site-navigation" aria-label="Main navigation" className={menu?"open":""}><span className="nav-indicator" aria-hidden="true"/>{["about","work","experience","security","skills","contact"].map(id=><button key={id} aria-current={active===id?"location":undefined} className={active===id?"active":""} onClick={()=>go(id)}>{id}</button>)}</nav>
      <div className="nav-actions"><button className="theme" onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label="Toggle theme">{theme==="dark"?"☼":"◐"}</button><button className="menu" aria-label={menu?"Close navigation":"Open navigation"} aria-expanded={menu} aria-controls="site-navigation" onClick={()=>setMenu(!menu)}>{menu?"×":"☰"}</button></div>
    </div></header>

    <main id="main" tabIndex={-1}>
      <section id="home" className="hero"><div className="hero-grid">
        <Reveal><div className="hero-copy"><p className="kicker"><i/> Kenya · IT · Software · Security</p><h1>I build <em>useful</em> digital products and understand the systems behind them.</h1><p className="lead">I'm David Korir — a Computer Security and Forensics graduate focused on software development, enterprise technology and practical cybersecurity.</p><div className="actions"><button className="primary" onClick={()=>go("work")}>View my work <Arrow/></button><a className="text-link" href={`mailto:${EMAIL}`}>Let's talk <Arrow/></a></div></div></Reveal>
        <Reveal delay={140}><div className="hero-card"><div className="system-grid" aria-hidden="true"/><div className="hero-label">DEVELOPER / SECURITY THINKER</div><div className="hero-coordinates" aria-hidden="true">01 / BUILD<br/>02 / TEST<br/>03 / SECURE</div><div className="hero-initials">DK</div><div className="hero-card-bottom"><span>IT & SOFTWARE<br/>DEVELOPMENT</span><strong>01—06</strong></div></div></Reveal>
      </div><div className="scroll-note"><span>Scroll</span><i/></div></section>

      <section id="about" className="section about"><div className="section-head"><Reveal><p className="kicker"><i/>01 · About</p><h2>Curious about how things work. Serious about making them work.</h2></Reveal><Reveal delay={100}><p className="section-intro">My background sits between technology and security. I enjoy taking a requirement, understanding the problem behind it, then building and testing a solution from the ground up.</p></Reveal></div><Reveal delay={160}><div className="about-strip"><span>SECURITY</span><b>×</b><span>SOFTWARE</span><b>×</b><span>ENTERPRISE TECH</span><b>×</b><span>AI-ASSISTED WORKFLOWS</span></div></Reveal></section>

      <section id="work" className="section work"><div className="section-head"><Reveal><p className="kicker"><i/>02 · Selected work</p><h2>Things I've built, tested and pushed forward.</h2></Reveal><Reveal delay={100}><p className="section-intro">From SaaS ideas to client websites and enterprise workflows, I like building things that solve a real problem.</p></Reveal></div><div className="project-grid">{projects.map((p,i)=><Reveal key={p.n} delay={i*70}><article className={`project ${p.tone}`}>
        <div className="project-visual"><span>{p.n} / SELECTED PROJECT</span>
          <div className={`project-diagram diagram-${i}`} aria-hidden="true"><strong>{["BNB / OPERATIONS","BVK / DIGITAL HOME","IDEAS → PRODUCTS","REQUEST → APPROVAL"][i]}</strong><div>{["INTERFACE","WORKFLOW","SYSTEM"].map((label,j)=><span key={label}><b>0{j+1}</b>{label}</span>)}</div><small>Concept schematic · {p.stack[0]}</small></div>
          <div className="quick-facts"><span>{p.stack.join(" / ")}</span>{p.links?.map(([label,url])=><a key={label} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}<button onClick={()=>setOpen(p)}>Project details ↗</button></div>
        </div>
        <div className="project-copy"><p>{p.type}</p><h3>{p.title}</h3><p className="project-description">{p.text}</p><div className="project-tags">{p.stack.map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-bottom"><span>PROJECT {p.n}</span><button aria-label={`Explore ${p.title}`} onClick={()=>setOpen(p)}>Explore <Arrow/></button></div></div>
      </article></Reveal>)}</div></section>

      <section id="experience" className="section experience"><div className="experience-layout"><Reveal><div><p className="kicker"><i/>03 · Experience</p><h2>Enterprise technology, learned by doing.</h2><p className="section-intro">At Huawei Technologies Kenya, I worked as a Junior Product Technology Assistant in a client environment and developed low-code applications with Huawei AppCube.</p></div></Reveal><Reveal delay={100}><div className="timeline"><svg className="timeline-track" aria-hidden="true" viewBox="0 0 2 100" preserveAspectRatio="none"><path d="M1 0 V100" pathLength="1"/></svg><div><span>FEB 2024 — JUL 2024</span><h3>Huawei Technologies Kenya</h3><h4>Junior Product Technology Assistant</h4></div><ul><li>Built request flows, UI forms and approval pathways for an Internal Service Ordering Platform.</li><li>Configured widgets, scripts, dashboards and workflows, then tested and debugged features.</li><li>Worked from requirements through development, testing, troubleshooting and documentation.</li><li>Applied technical training from Huawei iLearning in a live enterprise environment.</li></ul></div></Reveal></div><div className="earlier"><Reveal><p className="kicker"><i/>Earlier experience</p></Reveal><Reveal delay={80}><div className="earlier-grid"><div><b>Greenfield Tea Factory</b><span>IT Department Assistant · 2022</span><p>Hardware configuration, equipment setup, troubleshooting, maintenance and user support.</p></div><div><b>Kerimist Water, Kericho</b><span>Sales & Marketing Agent · 2024–2025</span><p>Customer engagement, product communication, relationship management and service.</p></div></div></Reveal></div></section>

      <section id="security" className="section security"><div className="security-layout"><Reveal><div><p className="kicker"><i/>04 · Security & forensics</p><h2>Security is part of how I think about technology.</h2><p className="section-intro">My security background gives me another lens when I build systems: permissions, visibility, authentication, evidence and safer workflows matter.</p></div></Reveal><div className="security-grid">{[["01","DIGITAL FORENSICS","Autopsy · FTK Imager"],["02","NETWORK ANALYSIS","Wireshark · Nmap"],["03","SECURE SYSTEMS","Authentication · RBAC · OTP"],["04","OPERATIONAL SECURITY","Logging · Access control"]].map((x,i)=><Reveal key={x[0]} delay={i*70}><div className="security-card"><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div></Reveal>)}</div></div></section>

      <section id="skills" className="section skills"><div className="section-head"><Reveal><p className="kicker"><i/>05 · Skills</p><h2>The stack behind the work.</h2></Reveal></div><div className="skill-list">{skills.map((s,i)=><Reveal key={s[0]} delay={i*50}><div className="skill-row"><span>0{i+1}</span><h3>{s[0]}</h3><div className="skill-detail"><p>{s[1]}</p><div className="skill-meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={s[2]} aria-label={`${s[0]} proficiency ${s[2]} percent`}><i style={{"--level":`${s[2]}%`}}/><b>{s[2]}%</b></div></div></div></Reveal>)}</div><Reveal delay={120}><div className="education"><div><p className="kicker"><i/>Education</p><h3>Kabarak University</h3><p>Bachelor of Science in Computer Security and Forensics (BSCSF)</p></div><div><p>Relevant areas</p><b>Computer Security · Digital Forensics · Network Security · Databases · Web Technologies · Secure Systems · Systems Analysis & Design</b></div></div></Reveal></section>

      <section id="contact" className="section contact"><Reveal><p className="kicker"><i/>06 · Contact</p><h2>Have an idea, a problem to solve, or an opportunity?</h2><p className="contact-text">I'm open to conversations around software development, enterprise technology, cybersecurity and interesting products.</p><div className="contact-actions"><a className="primary" href={`mailto:${EMAIL}`}>Email me <Arrow/></a><a className="outline" href={GITHUB} target="_blank" rel="noreferrer">GitHub <Arrow/></a></div><ContactForm email={EMAIL}/><div className="contact-meta"><span>{EMAIL}</span><span>Kenya</span><a href={PORTFOLIO}>david-korir-portfolio.onrender.com</a></div></Reveal></section>
    </main>
    <footer><span>DAVID KORIR</span><span>IT · SOFTWARE · SECURITY</span><span>© 2026</span></footer>
    {open&&<div className="modal" onMouseDown={e=>e.target===e.currentTarget&&setOpen(null)}><div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="project-title" tabIndex={-1} className={`modal-card ${open.tone}`}><button aria-label="Close project details" className="close" onClick={()=>setOpen(null)}>×</button><p className="kicker"><i/>{open.type}</p><h2 id="project-title">{open.title}</h2><p>{open.text}</p><div className="modal-tags">{open.stack.map(x=><span key={x}>{x}</span>)}</div>{open.links&&<div className="modal-links">{open.links.map(x=><a key={x[0]} href={x[1]} target="_blank" rel="noreferrer">{x[0]} <Arrow/></a>)}</div>}</div></div>}
  </div>
}
