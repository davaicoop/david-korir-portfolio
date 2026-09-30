import ProjectLinks from './ProjectLinks';

export function ProjectImage({ project }) {
  if (!project.image) return <div className="project-diagram" aria-hidden="true">
    <strong>REQUEST → APPROVAL</strong>
    <div>{['REQUEST', 'REVIEW', 'FULFILL'].map((label, index) => <span key={label}><b>0{index + 1}</b>{label}</span>)}</div>
    <small>Workflow illustration · Huawei AppCube</small>
  </div>;

  const illustration = project.image.startsWith('/');
  return <div className={`project-browser ${illustration ? 'illustration' : ''}`}>
    <div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>{project.host}</span></div>
    <img
      src={illustration ? project.image : `/projects/${project.image}-1008.webp`}
      srcSet={illustration ? undefined : `/projects/${project.image}-560.webp 560w, /projects/${project.image}-1008.webp 1008w`}
      sizes="(max-width: 850px) 88vw, (max-width: 1400px) 42vw, 570px"
      alt={project.imageAlt} width={1008} height={690} loading="lazy" decoding="async"
    />
  </div>;
}

export default function ProjectCard({ project, onExplore, email }) {
  return <article className={`project ${project.tone}`} aria-labelledby={`project-${project.id}`}>
    <div className="project-visual">
      <span>{project.n} / SELECTED PROJECT</span>
      <ProjectImage project={project}/>
    </div>
    <div className="project-copy">
      {project.caption && <span className="project-caption">{project.caption}</span>}
      <p>{project.type}</p>
      <h3 id={`project-${project.id}`}>{project.title}</h3>
      <p className="project-description">{project.text}</p>
      <div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="project-links"><ProjectLinks project={project} email={email}/></div>
      <div className="project-bottom">
        <span>{project.privateSource ? 'PRIVATE SOURCE' : project.repository ? 'PUBLIC SOURCE' : 'ENTERPRISE WORK'}</span>
        <button type="button" aria-label={`Explore ${project.title}`} onClick={() => onExplore(project)}>Explore case study <span className="arrow" aria-hidden="true">↗</span></button>
      </div>
    </div>
  </article>;
}
