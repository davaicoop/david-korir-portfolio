import { useState } from 'react';

export default function ContactForm({ email }) {
  const [prepared, setPrepared] = useState(false);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(data.get('subject'));
    const body = encodeURIComponent(`Name: ${data.get('name')}\nReply to: ${data.get('email')}\n\n${data.get('message')}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setPrepared(true);
  }
  return <form className="contact-form" onChange={() => setPrepared(false)} onSubmit={submit}>
    <div className="form-heading"><h3>Start a conversation</h3><p>This prepares an email in your email app. Nothing is sent automatically.</p></div>
    <div className="form-grid">
      <label>Your name<input name="name" autoComplete="name" required maxLength={100}/></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
    </div>
    <label>Subject<input name="subject" required maxLength={160}/></label>
    <label>What would you like to work on?<textarea name="message" rows={4} required maxLength={4000}/></label>
    <button className="primary" type="submit">Prepare email <span aria-hidden="true">↗</span></button>
    <p className="form-status" role="status">{prepared && <><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5 11-11"/></svg>Email prepared. Review and send it in your email app. If it didn’t open, use the email address below.</>}</p>
  </form>;
}
