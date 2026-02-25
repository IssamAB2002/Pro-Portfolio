import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
} from 'react-icons/fa';
import { getProject } from '../lib/api';

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      const foundProject = await getProject(slug);
      setProject(foundProject);
      setLoaded(true);
    };

    fetchProject();
  }, [slug]);

  if (!loaded) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-[#31194D] py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors mb-8"
        >
          <FaArrowLeft />
          Back to Projects
        </Link>

        <div
          className={`transition-all duration-800 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{project.title}</h1>

          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 mb-8">
            <img
              src={project.image_url}
              alt={`${project.title} preview`}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
          <p className="text-[#E0E0E0] leading-relaxed">{project.description}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((item) => (
              <span
                key={`${project.id}-tech-${item}`}
                className="px-3 py-1 text-sm bg-[#FFD700]/10 text-[#FFD700] rounded-full"
              >
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
              aria-label={`Open live demo for ${project.title}`}
            >
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
              aria-label={`Open GitHub repository for ${project.title}`}
            >
              <FaGithub />
              GitHub Repo
            </a>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProjectDetails;

