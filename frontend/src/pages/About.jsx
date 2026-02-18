import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaBrain,
  FaCalendarAlt,
  FaCode,
  FaDatabase,
  FaDocker,
  FaGraduationCap,
  FaPython,
  FaReact,
} from 'react-icons/fa';
import { SiDjango, SiFlutter, SiTensorflow } from 'react-icons/si';
import api from '../lib/api';

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  ai: 'AI / Automation',
  tools: 'DevOps / Workflow',
};

const CATEGORY_ORDER = ['frontend', 'backend', 'mobile', 'ai', 'tools'];

const categoryTitleStyles = {
  frontend: 'text-cyan-300',
  backend: 'text-emerald-300',
  mobile: 'text-sky-300',
  ai: 'text-violet-300',
  tools: 'text-amber-300',
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

const About = () => {
  const [loaded, setLoaded] = useState(false);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [educationLoading, setEducationLoading] = useState(true);
  const [skillsError, setSkillsError] = useState('');
  const [educationError, setEducationError] = useState('');
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchSkills = async () => {
      try {
        setSkillsLoading(true);
        setSkillsError('');
        const response = await api.get('/skills/');
        const data = Array.isArray(response.data) ? response.data : [];
        if (isMounted) {
          setSkills(data);
        }
      } catch {
        if (isMounted) {
          setSkillsError('Unable to load skills. Please try again shortly.');
          setSkills([]);
        }
      } finally {
        if (isMounted) {
          setSkillsLoading(false);
        }
      }
    };

    const fetchEducation = async () => {
      try {
        setEducationLoading(true);
        setEducationError('');
        const response = await api.get('/education/');
        const data = Array.isArray(response.data) ? response.data : [];
        if (isMounted) {
          setEducation(data);
        }
      } catch {
        if (isMounted) {
          setEducationError('Unable to load education. Please try again shortly.');
          setEducation([]);
        }
      } finally {
        if (isMounted) {
          setEducationLoading(false);
        }
      }
    };

    fetchSkills();
    fetchEducation();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setAnimateProgress(false);
    if (!skills.length) {
      return;
    }
    const timer = setTimeout(() => setAnimateProgress(true), 150);
    return () => clearTimeout(timer);
  }, [skills]);

  const groupedSkills = useMemo(() => {
    const groups = {};
    skills.forEach((skill) => {
      const key = skill.category || 'tools';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(skill);
    });

    return CATEGORY_ORDER.filter((key) => groups[key]?.length).map((key) => ({
      key,
      title: CATEGORY_LABELS[key] || key,
      skills: groups[key],
    }));
  }, [skills]);

  return (
    <div className="min-h-screen bg-[#31194D] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFD700] text-[#31194D] font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FFD700]/20"
          >
            <FaArrowLeft />
            Return Home
          </Link>
        </div>

        <header
          className={`text-center mb-14 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-[#FFD700]">Me</span>
          </h1>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6" />
          <p className="text-[#E0E0E0] max-w-3xl mx-auto leading-relaxed">
            I am a Full-Stack Developer focused on building robust web platforms, polished cross-platform mobile
            applications, and AI-driven automation systems that improve business workflows and user experience.
          </p>
        </header>

        <section
          className={`bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-10 backdrop-blur-sm transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '120ms' }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Professional Summary</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            My work combines product-oriented frontend development, scalable backend architecture, and practical AI
            integration. I prioritize clean code, reusable components, and maintainable APIs to deliver solutions that
            can grow with real user needs.
          </p>
          <p className="text-gray-300 leading-relaxed">
            From React + Django web apps to Flutter mobile experiences and Python-based automation, I focus on turning
            complex ideas into clear, performant products.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-white">Skills & Technologies</h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFD700] text-[#31194D] font-semibold rounded-lg hover:bg-white hover:scale-105 transition-all duration-300"
            >
              Visit My Projects <FaArrowRight />
            </Link>
          </div>

          {skillsLoading && <p className="text-gray-400">Loading skills...</p>}
          {skillsError && <p className="text-amber-300">{skillsError}</p>}
          {!skillsLoading && !skillsError && groupedSkills.length === 0 && (
            <p className="text-gray-400">No skills found in DB.</p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {groupedSkills.map((category, categoryIndex) => (
              <article
                key={category.key}
                className={`group bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-[#FFD700]/30 hover:shadow-lg hover:shadow-[#FFD700]/10 transition-all duration-500 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${180 + categoryIndex * 90}ms` }}
              >
                <h3 className={`text-xl font-semibold mb-4 ${categoryTitleStyles[category.key] || 'text-[#FFD700]'}`}>
                  {category.title}
                </h3>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.id} className="bg-white/5 border border-white/10 rounded-lg px-3 py-3">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{getSkillIcon(skill.name, skill.category)}</span>
                          <span className="text-[#E0E0E0] text-sm">{skill.name}</span>
                        </div>
                        <span className="text-[#FFD700] text-xs font-semibold">{skill.proficiency_level || 0}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FFD700] to-yellow-300 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: animateProgress ? `${skill.proficiency_level || 0}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FaGraduationCap className="text-[#FFD700] text-2xl" />
            <h2 className="text-2xl font-semibold text-white">Education</h2>
          </div>

          {educationLoading && <p className="text-gray-400">Loading education...</p>}
          {educationError && <p className="text-amber-300">{educationError}</p>}
          {!educationLoading && !educationError && education.length === 0 && (
            <p className="text-gray-400">No education rows found in DB.</p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((item, index) => (
              <article
                key={item.id}
                className={`bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:bg-white/10 hover:border-[#FFD700]/30 transition-all duration-500 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${220 + index * 80}ms` }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{item.degree}</h3>
                <p className="text-[#FFD700] text-sm font-medium mb-3">{item.institution}</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <FaCalendarAlt className="text-[#FFD700]" />
                  <span>
                    {item.start_year}
                    {item.end_year ? ` - ${item.end_year}` : ' - Present'}
                  </span>
                </div>
                {item.description && <p className="mt-3 text-gray-300 text-sm leading-relaxed">{item.description}</p>}
              </article>
            ))}
          </div>
        </section>

        <section
          className={`text-center transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '260ms' }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors text-lg font-medium"
          >
            Explore All Projects <FaArrowRight />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
