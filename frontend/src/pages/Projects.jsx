import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaUser } from 'react-icons/fa';
import { getProjects } from '../lib/api';

const Projects = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    fetchProjects();

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#31194D] py-24 px-4">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-[#FFD700]">Projects</span>
          </h1>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A selection of full-stack, mobile, and AI projects built with production-focused architecture.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFD700] text-[#31194D] font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FFD700]/20"
            >
              <FaArrowLeft />
              Return Home
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#FFD700] text-[#FFD700] font-semibold hover:bg-[#FFD700] hover:text-[#31194D] hover:scale-105 transition-all duration-300"
            >
              <FaUser />
              About Me
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`group bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/5
                hover:bg-white/10 hover:border-[#FFD700]/30 hover:shadow-lg hover:shadow-[#FFD700]/10
                hover:scale-105 transition-all duration-300
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="h-48 bg-gradient-to-br from-primary/50 to-primary/80 relative overflow-hidden">
                <img
                  src={project.image_url}
                  alt={`${project.title} preview`}
                  className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#31194D] to-transparent" />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                  {project.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed min-h-[3rem]">
                  {project.short_desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack.map((item) => (
                    <span
                      key={`${project.id}-${item}`}
                      className="px-2 py-1 text-xs bg-[#FFD700]/10 text-[#FFD700] rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors text-sm font-medium"
                  aria-label={`View details for ${project.title}`}
                >
                  View Details <FaExternalLinkAlt />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;