import Window from "@/components/Window";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/projects";

export default function WorkPage() {
    return (
        <Window title="Work" width={760} x={90} y={40}>
            <p className="lede">
                <span className="led" aria-hidden="true" />
                Freelance developer. Full-stack, IoT and data. Available for new projects.
            </p>
            <div className="pills">
                <a className="pill" href="mailto:andrespalomor@outlook.com">Email me</a>
              
                <a className="pill alt" href="https://github.com/PalomoAn" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <h2>Skills</h2>
            <div className="ini">
                <b>[core]</b>{"\n"}react, python, supabase, node.js / express{"\n\n"}
                <b>[areas]</b>{"\n"}full-stack, iot, data analysis, machine learning{"\n\n"}
                <b>[also]</b>{"\n"}typescript, next.js, postgres (rls), vite, graphql, oauth, server-sent events, jupyter / shap, git
            </div>

            <h2>Selected projects</h2>
            {PROJECTS.map((p) => (
                <ProjectCard key={p.title} project={p} />
            ))}

            <h2>Get in touch</h2>
            <div className="ini">
                <b>email</b>{"   "}   <a href="mailto:andrespalomor@outlook.com" target="_blank" rel="noopener noreferrer">
                    andrespalomor@outlook.com</a> {"\n"}
                <b>github</b>{"  "}
                <a href="https://github.com/PalomoAn" target="_blank" rel="noopener noreferrer">
                    github.com/PalomoAn
                </a>
            </div>
        </Window>
    );
}