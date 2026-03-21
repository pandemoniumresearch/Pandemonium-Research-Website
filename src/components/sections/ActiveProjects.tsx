import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export default function ActiveProjects() {
  return (
    <section className="border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <h2
          className="text-3xl font-bold text-[#f5f5f5] mb-12"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Active Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
