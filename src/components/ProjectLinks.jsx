export default function ProjectLinks({ project, email }) {
  return <>
    {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">{project.liveLabel} <span aria-hidden="true">↗</span></a>}
    {project.repository && (project.privateSource
      ? <a href={`mailto:${email}?subject=${encodeURIComponent(`${project.title} — code walkthrough`)}`} title="The source repository is private">Request code walkthrough <span aria-hidden="true">↗</span></a>
      : <a href={project.repository} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>)}
  </>;
}
