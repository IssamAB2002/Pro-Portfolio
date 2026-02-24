import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBrain, FaCode, FaDatabase, FaDocker, FaExternalLinkAlt, FaPython, FaReact } from 'react-icons/fa';
import { SiDjango, SiFlutter, SiTensorflow } from 'react-icons/si';
import api, { getProjects } from '../lib/api';


const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  ai: 'AI / Automation',
  tools: 'DevOps / Workflow',
};

const skillIconByName = {
  React: <FaReact color="#61DAFB" />,
  'Tailwind CSS': <FaCode color="#06B6D4" />,
  Django: <SiDjango color="#2ECC71" />,
  'REST APIs': <FaCode color="#FF6F00" />,
  Flutter: <SiFlutter color="#54C5F8" />,
  Dart: <SiFlutter color="#0175C2" />,
  Python: <FaPython color="#3776AB" />,
  'Python/ML': <FaPython color="#3776AB" />,
  'Machine Learning': <FaBrain color="#6C5CE7" />,
  TensorFlow: <SiTensorflow color="#FF6F00" />,
  Automation: <FaBrain color="#FFD700" />,
  Docker: <FaDocker color="#2496ED" />,
  PostgreSQL: <FaDatabase color="#336791" />,
};

const categoryFallbackIcon = {
  frontend: <FaReact color="#61DAFB" />,
  backend: <SiDjango color="#2ECC71" />,
  mobile: <SiFlutter color="#54C5F8" />,
  ai: <FaBrain color="#FFD700" />,
  tools: <FaCode color="#E0E0E0" />,
};

const getSkillIcon = (name, category) => {
  return skillIconByName[name] || categoryFallbackIcon[category] || <FaCode color="#FFD700" />;
};

const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 border border-white/5 hover:border-accent/30">
      <div className="h-48 bg-gradient-to-br from-primary/50 to-primary/80 relative overflow-hidden">
        <img
          src={project.image_url}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#31194D] to-transparent"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.short_desc}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_stack.map((tech, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm font-medium">
          View Project <FaExternalLinkAlt />
        </Link>
      </div>
    </div>
  );
};

const SkillsCarousel = ({ skills }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSkills = 6;

  useEffect(() => {
    if (skills.length <= visibleSkills) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skills.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [skills.length]);

  const visibleItems = useMemo(() => {
    if (!skills.length) {
      return [];
    }

    const count = Math.min(visibleSkills, skills.length);
    return Array.from({ length: count }, (_, i) => skills[(currentIndex + i) % skills.length]);
  }, [currentIndex, skills]);

  const totalPages = Math.max(1, Math.ceil(skills.length / visibleSkills));

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-3 min-h-[42px]">
        {visibleItems.map((skill) => (
          <span
            key={`carousel-${skill.id}`}
            className="px-4 py-2 bg-white/10 text-gray-300 rounded-full text-sm hover:bg-accent hover:text-[#31194D] transition-all duration-300 cursor-default"
          >
            {skill.name}
          </span>
        ))}
      </div>
      {skills.length > visibleSkills && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex((index * visibleSkills) % skills.length)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / visibleSkills) === index ? 'bg-accent w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to skills page ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};

const QuotesCarousel = () => {
  const quotes = [
    {
      text: 'A strong digital product is often the difference between a good idea and a real business.',
      author: 'Product Growth Insight',
    },
    {
      text: 'The right web, mobile, and AI stack can help you launch faster and scale with confidence.',
      author: 'Startup Execution Principle',
    },
    {
      text: 'Your business vision deserves more than code, it deserves a partner focused on outcomes.',
      author: 'Client Success Mindset',
    },
    {
      text: 'Small, smart automations save hours every week and compound into serious business growth.',
      author: 'AI Automation Strategy',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative min-h-[210px]">
        {quotes.map((quote, index) => (
          <article
            key={quote.author}
            className={`absolute inset-0 bg-white/5 border border-white/10 rounded-2xl p-7 md:p-10 backdrop-blur-sm
              transition-all duration-700 ease-out
              ${activeIndex === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}
          >
            <p className="text-xl md:text-2xl text-white leading-relaxed mb-5">"{quote.text}"</p>
            <p className="text-[#FFD700] font-medium">{quote.author}</p>
          </article>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {quotes.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? 'w-8 bg-[#FFD700]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Show quote ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState('');
  const [skillsAnimated, setSkillsAnimated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchSkills = async () => {
      try {
        setSkillsLoading(true);
        setSkillsError('');
        const response = await api.get('/skills/home/');
        const data = Array.isArray(response.data) ? response.data : [];

        if (isMounted) {
          const normalized = data.map((item) => ({
            ...item,
            categoryLabel: CATEGORY_LABELS[item.category] || item.category,
          }));
          setSkills(normalized);
        }
      } catch {
        if (isMounted) {
          setSkillsError('Unable to load skills from the API. Please try again shortly.');
          setSkills([]);
        }
      } finally {
        if (isMounted) {
          setSkillsLoading(false);
        }
      }
    };

    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data.slice(0, 3));
    };

    fetchSkills();
    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setSkillsAnimated(false);
    if (!skills.length) {
      return;
    }
    const timer = setTimeout(() => setSkillsAnimated(true), 120);
    return () => clearTimeout(timer);
  }, [skills]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#31194D]">
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 animate-pulse [animation-duration:7s]"
          />
          <div className="absolute inset-0 bg-[#31194D]/65"></div>

          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl animate-pulse [animation-duration:5s]"></div>
          <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse [animation-duration:7s]"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-[#8A2BE2]/10 rounded-full blur-3xl animate-pulse [animation-duration:8s]"></div>

          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,215,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.12)_1px,transparent_1px)] [background-size:48px_48px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Issam <span className="text-[#FFD700]">Developer</span>
          </h1>

          <h2 className="text-xl md:text-2xl text-[#E0E0E0] mb-6 font-medium">
            Full-Stack Developer | Flutter Mobile Apps | AI Automation Engineer
          </h2>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Building scalable web applications, beautiful cross-platform mobile apps,
            and intelligent AI automations that solve real-world problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-[#FFD700] text-[#31194D] font-semibold rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-[#FFD700] text-[#FFD700] font-semibold rounded-lg hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
            >
              Contact Me
            </button>
          </div>

          {skillsLoading ? (
            <p className="text-gray-400">Loading skills...</p>
          ) : (
            <SkillsCarousel skills={skills} />
          )}
        </div>
      </section>

      <section id="projects" className="py-20 px-4 bg-[#31194D]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Selected <span className="text-[#FFD700]">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/projects" className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors">
              View All Projects <FaExternalLinkAlt />
            </Link>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What I <span className="text-[#FFD700]">Work With</span>
            </h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">A comprehensive toolkit for building modern applications</p>
          </div>

          {skillsError && <p className="text-center text-amber-300 mb-6">{skillsError}</p>}
          {!skillsLoading && !skillsError && skills.length === 0 && (
            <p className="text-center text-gray-400 mb-6">No skills found in DB.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="group bg-white/5 rounded-xl p-4 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FFD700]/10 border border-white/5 hover:border-[#FFD700]/30"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl group-hover:text-[#FFD700] transition-colors">{getSkillIcon(skill.name, skill.category)}</span>
                  <div>
                    <p className="text-white font-medium">{skill.name}</p>
                    <p className="text-gray-500 text-xs">{skill.categoryLabel}</p>
                  </div>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFD700] to-yellow-300 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: skillsAnimated ? `${skill.proficiency_level || 0}%` : '0%' }}
                  />
                </div>
                <p className="mt-2 text-right text-xs text-[#FFD700] font-medium">{skill.proficiency_level || 0}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#31194D]/40">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Build Your Next <span className="text-[#FFD700]">Big Move</span>
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            Let&apos;s turn your business idea into a high-impact digital product with web, mobile, and AI automation.
          </p>

          <QuotesCarousel />
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-[#31194D]/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In <span className="text-[#FFD700]">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-gray-400 mb-8">Have a project in mind or want to collaborate? Let's talk!</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-[#FFD700] text-[#31194D] font-semibold rounded-lg hover:bg-white transition-all duration-300">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Home;


