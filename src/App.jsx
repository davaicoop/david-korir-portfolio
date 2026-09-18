import { useEffect, useState } from "react";

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
  ["Programming & Web", "JavaScript · HTML5 · CSS3 · React · Vue 3 · Node.js · Express.js · Vite · React Router"],
  ["Backend & Data", "REST APIs · API integration · Authentication · Authorization · RBAC · PostgreSQL · SQL · Database design"],
  ["Enterprise Technology", "Huawei AppCube · Low-code development · Widgets · Events · Scripts · Workflows · Requirements analysis"],
  ["Cybersecurity & Forensics", "Computer security · Digital forensics · Security awareness · OTP · Security logging · Network analysis · Network scanning"],
  ["Tools", "Git · GitHub · VS Code · Render · Autopsy · FTK Imager · Wireshark · Nmap · Huawei iLearning"],
];

function Reveal({children, delay=0, className=""}) { return <div className={`reveal ${className}`} style={{"--delay":`${delay}ms`}}>{children}</div> }
function Arrow(){return <span className="arrow">↗</span>}

export default function App(){
  const [menu,setMenu]=useState(false); const [active,setActive]=useState("home"); const [theme,setTheme]=useState(()=>localStorage.getItem("dk-theme")||"dark"); const [open,setOpen]=useState(null); const [progress,setProgress]=useState(0); const [heroShift,setHeroShift]=useState(0);
  useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem("dk-theme",theme)},[theme]);
  useEffect(()=>{
    const els=[...document.querySelectorAll("section[id]")];
    const obs=new IntersectionObserver(es=>{const x=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(x)setActive(x.target.id)},{rootMargin:"-25% 0px -60% 0px",threshold:[.1,.3,.6]});
    els.forEach(x=>obs.observe(x));
    const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");reveal.unobserve(e.target)}}),{threshold:.08});
    document.querySelectorAll(".reveal").forEach(x=>reveal.observe(x));
    const scroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;setProgress(max?scrollY/max:0);setHeroShift(Math.min(scrollY/(innerHeight||1),1))}; window.addEventListener("scroll",scroll,{passive:true});scroll();
    return()=>{obs.disconnect();reveal.disconnect();window.removeEventListener("scroll",scroll)};
  },[]);
  const go=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"})};
  return <div className="site">
    <div className="progress"><span style={{transform:`scaleX(${progress})`}}/></div>
    <header className="nav"><div className="nav-inner">
      <button className="logo" onClick={()=>go("home")}><span>DK</span><b>DAVID KORIR</b></button>
      <nav className={menu?"open":""}>{["about","work","experience","security","skills","contact"].map(id=><button key={id} className={active===id?"active":""} onClick={()=>go(id)}>{id}</button>)}</nav>
      <div className="nav-actions"><button className="theme" onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label="Toggle theme">{theme==="dark"?"☼":"◐"}</button><button className="menu" onClick={()=>setMenu(!menu)}>{menu?"×":"☰"}</button></div>
    </div></header>

    <main>
      <section id="home" className="hero"><div className="hero-grid">
        <Reveal><div className="hero-copy" style={{transform:`translate3d(0,${heroShift*-54}px,0)`,opacity:1-heroShift*.38}}><p className="kicker"><i/> Kenya · IT · Software · Security</p><h1>I build <em>useful</em> digital products and understand the systems behind them.</h1><p className="lead">I'm David Korir — a Computer Security and Forensics graduate focused on software development, enterprise technology and practical cybersecurity.</p><div className="actions"><button className="primary" onClick={()=>go("work")}>View my work <Arrow/></button><a className="text-link" href={`mailto:${EMAIL}`}>Let's talk <Arrow/></a></div></div></Reveal>
        <Reveal delay={140}><div className="hero-card" style={{transform:`translate3d(0,${heroShift*38}px,0) rotate(${heroShift*1.5}deg)`}}><div className="orbit one"/><div className="orbit two"/><div className="hero-initials">DK</div><div className="hero-card-bottom"><span>IT & SOFTWARE<br/>DEVELOPMENT</span><strong>01—06</strong></div></div></Reveal>
      </div><div className="scroll-note"><span>Scroll</span><i/></div></section>

      <section id="about" className="section about"><div className="section-head"><Reveal><p className="kicker"><i/>01 · About</p><h2>Curious about how things work. Serious about making them work.</h2></Reveal><Reveal delay={100}><p className="section-intro">My background sits between technology and security. I enjoy taking a requirement, understanding the problem behind it, then building and testing a solution from the ground up.</p></Reveal></div><Reveal delay={160}><div className="about-strip"><span>SECURITY</span><b>×</b><span>SOFTWARE</span><b>×</b><span>ENTERPRISE TECH</span><b>×</b><span>AI-ASSISTED WORKFLOWS</span></div></Reveal></section>

      <section id="work" className="section work"><div className="section-head"><Reveal><p className="kicker"><i/>02 · Selected work</p><h2>Things I've built, tested and pushed forward.</h2></Reveal><Reveal delay={100}><p className="section-intro">From SaaS ideas to client websites and enterprise workflows, I like building things that solve a real problem.</p></Reveal></div><div className="project-grid">{projects.map((p,i)=><Reveal key={p.n} delay={i*70}><article className={`project ${p.tone}`} onClick={()=>setOpen(p)}><div className="project-visual"><span>{p.n}</span><div className="mini-ui"><i/><i/><i/><b/><b/><b/></div></div><div className="project-copy"><p>{p.type}</p><h3>{p.title}</h3><div className="project-bottom"><span>{p.stack.join(" · ")}</span><button onClick={e=>{e.stopPropagation();setOpen(p)}}>Explore <Arrow/></button></div></div></article></Reveal>)}</div></section>

      <section id="experience" className="section experience"><div className="experience-layout"><Reveal><div><p className="kicker"><i/>03 · Experience</p><h2>Enterprise technology, learned by doing.</h2><p className="section-intro">At Huawei Technologies Kenya, I worked as a Junior Product Technology Assistant in a client environment and developed low-code applications with Huawei AppCube.</p></div></Reveal><Reveal delay={100}><div className="timeline"><div><span>FEB 2024 — JUL 2024</span><h3>Huawei Technologies Kenya</h3><h4>Junior Product Technology Assistant</h4></div><ul><li>Built request flows, UI forms and approval pathways for an Internal Service Ordering Platform.</li><li>Configured widgets, scripts, dashboards and workflows, then tested and debugged features.</li><li>Worked from requirements through development, testing, troubleshooting and documentation.</li><li>Applied technical training from Huawei iLearning in a live enterprise environment.</li></ul></div></Reveal></div><div className="earlier"><Reveal><p className="kicker"><i/>Earlier experience</p></Reveal><Reveal delay={80}><div className="earlier-grid"><div><b>Greenfield Tea Factory</b><span>IT Department Assistant · 2022</span><p>Hardware configuration, equipment setup, troubleshooting, maintenance and user support.</p></div><div><b>Kerimist Water, Kericho</b><span>Sales & Marketing Agent · 2024–2025</span><p>Customer engagement, product communication, relationship management and service.</p></div></div></Reveal></div></section>

      <section id="security" className="section security"><div className="security-layout"><Reveal><div><p className="kicker"><i/>04 · Security & forensics</p><h2>Security is part of how I think about technology.</h2><p className="section-intro">My security background gives me another lens when I build systems: permissions, visibility, authentication, evidence and safer workflows matter.</p></div></Reveal><div className="security-grid">{[["01","DIGITAL FORENSICS","Autopsy · FTK Imager"],["02","NETWORK ANALYSIS","Wireshark · Nmap"],["03","SECURE SYSTEMS","Authentication · RBAC · OTP"],["04","OPERATIONAL SECURITY","Logging · Access control"]].map((x,i)=><Reveal key={x[0]} delay={i*70}><div className="security-card"><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div></Reveal>)}</div></div></section>

      <section id="skills" className="section skills"><div className="section-head"><Reveal><p className="kicker"><i/>05 · Skills</p><h2>The stack behind the work.</h2></Reveal></div><div className="skill-list">{skills.map((s,i)=><Reveal key={s[0]} delay={i*50}><div className="skill-row"><span>0{i+1}</span><h3>{s[0]}</h3><p>{s[1]}</p></div></Reveal>)}</div><Reveal delay={120}><div className="education"><div><p className="kicker"><i/>Education</p><h3>Kabarak University</h3><p>Bachelor of Science in Computer Security and Forensics (BSCSF)</p></div><div><p>Relevant areas</p><b>Computer Security · Digital Forensics · Network Security · Databases · Web Technologies · Secure Systems · Systems Analysis & Design</b></div></div></Reveal></section>

      <section id="contact" className="section contact"><Reveal><p className="kicker"><i/>06 · Contact</p><h2>Have an idea, a problem to solve, or an opportunity?</h2><p className="contact-text">I'm open to conversations around software development, enterprise technology, cybersecurity and interesting products.</p><div className="contact-actions"><a className="primary" href={`mailto:${EMAIL}`}>Email me <Arrow/></a><a className="outline" href={GITHUB} target="_blank" rel="noreferrer">GitHub <Arrow/></a></div><div className="contact-meta"><span>{EMAIL}</span><span>Kenya</span><a href={PORTFOLIO}>david-korir-portfolio.onrender.com</a></div></Reveal></section>
    </main>
    <footer><span>DAVID KORIR</span><span>IT · SOFTWARE · SECURITY</span><span>© 2026</span></footer>
    {open&&<div className="modal" onMouseDown={e=>e.target===e.currentTarget&&setOpen(null)}><div className={`modal-card ${open.tone}`}><button className="close" onClick={()=>setOpen(null)}>×</button><p className="kicker"><i/>{open.type}</p><h2>{open.title}</h2><p>{open.text}</p><div className="modal-tags">{open.stack.map(x=><span key={x}>{x}</span>)}</div>{open.links&&<div className="modal-links">{open.links.map(x=><a key={x[0]} href={x[1]} target="_blank" rel="noreferrer">{x[0]} <Arrow/></a>)}</div>}</div></div>}
  </div>
}
