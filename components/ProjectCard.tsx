import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="proj">
      <div className="proj-bar">{project.file}</div>
      <div className="in">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="techs">
          {project.tech.map((t) => (
            <span key={t} className="tech">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}