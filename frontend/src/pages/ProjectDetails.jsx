import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
} from 'react-icons/fa';
import { projectsData } from '../data/projectsData';

const ProjectDetails = () => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project = projectsData.find((item) => item.id === id);

  const projectImages = useMemo(() => {
    if (!project) return [];
    if (Array.isArray(project.images) && project.images.length > 0) return project.images;
    return [project.imageUrl].filter(Boolean);
  }, [project]);

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  useEffect(() => {
    setLoaded(true);
    setCurrentImageIndex(0);
  }, [id]);

  useEffect(() => {
    if (projectImages.length <= 1) return undefined;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [projectImages.length]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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

          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 mb-4 relative group">
            <div className="relative w-full h-[240px] sm:h-[340px] md:h-[420px] overflow-hidden">
              <div
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {projectImages.map((image, index) => (
                  <button
                    key={`${project.id}-image-${index}`}
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full h-full flex-shrink-0"
                    aria-label={`Open screenshot ${index + 1} for ${project.title}`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {projectImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
                  aria-label="Previous screenshot"
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={goToNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
                  aria-label="Next screenshot"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mb-10">
            {projectImages.map((_, index) => (
              <button
                key={`${project.id}-dot-${index}`}
                type="button"
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentImageIndex === index ? 'w-6 bg-[#FFD700]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
          <p className="text-[#E0E0E0] leading-relaxed">{project.fullDesc}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={`${project.id}-tech-${item}`}
                className="px-3 py-1 text-sm bg-[#FFD700]/10 text-[#FFD700] rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Role / What I Did</h2>
          <ul className="list-disc list-inside space-y-3">
            {project.role.map((point, index) => (
              <li
                key={`${project.id}-role-${index}`}
                className={`text-[#E0E0E0] transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                }`}
                style={{ transitionDelay: `${200 + index * 200}ms` }}
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-3">Challenges & Solutions</h2>
          <ul className="list-disc list-inside space-y-3">
            {project.challenges.map((point, index) => (
              <li
                key={`${project.id}-challenge-${index}`}
                className={`text-[#E0E0E0] transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                }`}
                style={{ transitionDelay: `${200 + index * 200}ms` }}
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFD700] text-[#31194D] font-semibold rounded-lg hover:bg-white hover:scale-105 transition-all duration-300"
              aria-label={`Open live demo for ${project.title}`}
            >
              <FaExternalLinkAlt />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
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

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-6xl rounded-xl overflow-hidden border border-white/20 bg-[#31194D]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} image preview`}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
              aria-label="Close image preview"
            >
              <FaTimes />
            </button>

            <img
              src={projectImages[currentImageIndex]}
              alt={`${project.title} fullscreen screenshot ${currentImageIndex + 1}`}
              className="w-full max-h-[85vh] object-contain bg-[#1f1030]"
            />

            {projectImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
                  aria-label="Previous fullscreen screenshot"
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={goToNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
                  aria-label="Next fullscreen screenshot"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
