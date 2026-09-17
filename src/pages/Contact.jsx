import { useRef, useState } from "react";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";

const initialForm={name:"",email:"",phone:"",reason:"",message:""};
export default function Contact(){
 const [form,setForm]=useState(initialForm); const [errors,setErrors]=useState({}); const [submitted,setSubmitted]=useState(false); const errorRef=useRef(null);
 function update(e){const {name,value}=e.target;setForm(v=>({...v,[name]:value}));setErrors(v=>({...v,[name]:""}));}
 function validate(){const e={};if(!form.name.trim())e.name="Enter your name.";if(!form.email.trim())e.email="Enter your email address.";else if(!/^\S+@\S+\.\S+$/.test(form.email))e.email="Enter a valid email address.";if(!form.reason)e.reason="Select how we can help.";return e;}
 function submit(e){e.preventDefault();const next=validate();setErrors(next);if(Object.keys(next).length){requestAnimationFrame(()=>errorRef.current?.focus());return;}setSubmitted(true);}
 return <main id="main-content">
  <section className="page-hero"><div className="container page-hero-content"><Reveal><span className="eyebrow">Contact BVK</span><h1>Let's start a conversation.</h1><p>Whether you're exploring care options, looking for more information or simply have questions, we're here to listen.</p></Reveal></div></section>
  <section className="section"><div className="container contact-layout"><Reveal variant="left"><div className="contact-info"><span className="eyebrow">Get in touch</span><h2>Start with what matters.</h2><p>Tell us what you are looking for. The more context you can comfortably share, the easier it is for us to understand how to continue the conversation.</p><div className="contact-details"><div><strong>Location</strong><p>Detroit, Michigan</p></div><div><strong>Service area</strong><p>Detroit and surrounding communities</p></div><div><strong>Email</strong><p><a href="mailto:vervianenkarnerblue@gmail.com">vervianenkarnerblue@gmail.com</a></p></div><div><strong>Phone</strong><p>Phone number coming soon</p></div></div></div></Reveal>
  <Reveal variant="right" delay={100}><div className="contact-form-card">{submitted?<div className="form-success" role="status" aria-live="polite"><span className="success-icon"><Icon name="check" size={28}/></span><h2>Thank you.</h2><p>Your message has been captured by this demonstration form. A secure production backend should be connected before launch.</p><button type="button" className="secondary-button" onClick={()=>{setSubmitted(false);setForm(initialForm);}}>Send another message</button></div>:<form onSubmit={submit} noValidate>
   {Object.keys(errors).length>0&&<div className="error-summary" role="alert" tabIndex="-1" ref={errorRef}><h2>Please check the highlighted fields.</h2><ul>{Object.entries(errors).filter(([,m])=>m).map(([f,m])=><li key={f}><a href={`#${f}`}>{m}</a></li>)}</ul></div>}
   <div className="form-field"><label htmlFor="name">Name</label><input id="name" name="name" value={form.name} onChange={update} autoComplete="name" aria-invalid={!!errors.name} required/>{errors.name&&<span className="field-error">{errors.name}</span>}</div>
   <div className="form-field"><label htmlFor="email">Email</label><input id="email" name="email" value={form.email} onChange={update} type="email" autoComplete="email" aria-invalid={!!errors.email} required/>{errors.email&&<span className="field-error">{errors.email}</span>}</div>
   <div className="form-field"><label htmlFor="phone">Phone <span>(optional)</span></label><input id="phone" name="phone" value={form.phone} onChange={update} type="tel" autoComplete="tel"/></div>
   <div className="form-field"><label htmlFor="reason">How can we help?</label><select id="reason" name="reason" value={form.reason} onChange={update} aria-invalid={!!errors.reason} required><option value="">Select an option</option><option value="care">Exploring care options</option><option value="tour">Interested in a home tour</option><option value="general">General question</option><option value="other">Other</option></select>{errors.reason&&<span className="field-error">{errors.reason}</span>}</div>
   <div className="form-field"><label htmlFor="message">Message <span>(optional)</span></label><textarea id="message" name="message" value={form.message} onChange={update} rows="5" placeholder="Tell us what you'd like to know."/><span className="field-help">Please do not include medical records, diagnoses, medication information or other sensitive health information.</span></div>
   <button type="submit" className="primary-button form-button">Send message <Icon name="arrow" size={17}/></button>
  </form>}</div></Reveal></div></section>
 </main>
}
