import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { getProject } from "../lib/api";
import Carousel from "../components/Carousel";

const descriptionStyles = `
  .project-description h1 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #FFD700;
    margin: 1.5rem 0 0.75rem;
  }
  .project-description h2 {
    font-size: 1.35rem;
    font-weight: 700;
    color: #FFD700;
    margin: 1.4rem 0 0.6rem;
  }
  .project-description h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #f0c040;
    margin: 1.2rem 0 0.5rem;
  }
  .project-description p {
    margin: 0.6rem 0 1rem;
    line-height: 1.75;
    color: #E0E0E0;
  }
  .project-description ul {
    list-style: disc;
    padding-left: 1.5rem;
    margin: 0.5rem 0 1rem;
  }
  .project-description ol {
    list-style: decimal;
    padding-left: 1.5rem;
    margin: 0.5rem 0 1rem;
  }
  .project-description li {
    margin: 0.3rem 0;
    color: #E0E0E0;
    line-height: 1.7;
  }
  .project-description strong {
    color: #ffffff;
    font-weight: 600;
  }
  .project-description em {
    color: #d0d0d0;
    font-style: italic;
  }
  .project-description code {
    background: rgba(255,215,0,0.1);
    color: #FFD700;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  .project-description pre {
    background: rgba(0,0,0,0.3);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1rem 0;
  }
  .project-description a {
    color: #FFD700;
    text-decoration: underline;
  }
`;

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      const foundProject = await getProject(slug);
      setProject(foundProject);
      setLoaded(true);
    };

    fetchProject();
  }, [slug]);

  const projectImages = useMemo(() => {
    if (!project) return [];
    if (Array.isArray(project.images) && project.images.length > 0)
      return project.images;
    return [project.image_url].filter(Boolean);
  }, [project]);

  const projectTechStack = useMemo(() => {
    if (!project) return [];
    if (!Array.isArray(project.tech_stack)) return [];
    return project.tech_stack
      .filter((item) => typeof item === "string")
      .map((item) => item.trim())
      .filter((item) => item.length > 0 && !/^https?:\/\//i.test(item));
  }, [project]);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-[#31194D] py-24 px-4">
      {/* Inject description styles */}
      <style>{descriptionStyles}</style>

      <div className="max-w-5xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors mb-8">
          <FaArrowLeft />
          Back to Projects
        </Link>

        <div
          className={`transition-all duration-800 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {project.title}
          </h1>

          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 mb-8">
            <button
              type="button"
              onClick={() => {
                if (projectImages.length > 0) setIsModalOpen(true);
              }}
              className="w-full h-auto object-cover"
              aria-label={`Open image carousel for ${project.title}`}>
              {projectImages.length > 0 ? (
                <img
                  src={projectImages[0]}
                  alt={`${project.title} preview`}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-[240px] sm:h-[340px] md:h-[420px] flex items-center justify-center text-white/70">
                  No images available
                </div>
              )}
            </button>
          </div>
        </div>

        <section className="mb-8">
          <div
            className="project-description"
            dangerouslySetInnerHTML={{ __html: project.description_html }}
          />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {projectTechStack.map((item) => (
              <span
                key={`${project.id}-tech-${item}`}
                className="px-3 py-1 text-sm bg-[#FFD700]/10 text-[#FFD700] rounded-full">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-wrap gap-4">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFD700] text-[#31194D] font-semibold rounded-lg hover:bg-white hover:scale-105 transition-all duration-300"
              aria-label={`Open live demo for ${project.title}`}>
              <FaExternalLinkAlt />
              Live Demo
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#FFD700] text-[#FFD700] rounded-lg hover:bg-[#FFD700] hover:text-[#31194D] hover:scale-105 transition-all duration-300"
              aria-label={`Open GitHub repository for ${project.title}`}>
              <FaGithub />
              GitHub Repo
            </a>
          )}
        </section>
      </div>
      <Carousel
        images={projectImages}
        title={project.title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProjectDetails;
