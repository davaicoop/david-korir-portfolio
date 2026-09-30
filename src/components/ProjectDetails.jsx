import { useEffect, useRef } from 'react';
import ProjectLinks from './ProjectLinks';

export default function ProjectDetails({ project, onClose, email }) {
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.focus();
    const keydown = event => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const nodes = [...dialog.current.querySelectorAll('button, a[href]')];
      const first = nodes[0], last = nodes.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', keydown);
      previous?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return <div className="modal" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="project-title" tabIndex={-1} className={`modal-card ${project.tone}`}>
      <button type="button" aria-label="Close project details" className="close" onClick={onClose}>×</button>
      <p className="kicker"><i/>{project.type}</p>
      <h2 id="project-title">{project.title}</h2>
      <p>{project.text}</p>
      <div className="case-section"><h3>The problem</h3><p>{project.problem}</p></div>
      <div className="case-section"><h3>What I built</h3><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
      <div className="modal-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="modal-links"><ProjectLinks project={project} email={email}/></div>
      <p className="case-note">{project.note}</p>
      {project.privateSource && <p className="source-reference">Repository: <code>{project.repository}</code><br/>Private · GitHub access required</p>}
    </div>
  </div>;
}
