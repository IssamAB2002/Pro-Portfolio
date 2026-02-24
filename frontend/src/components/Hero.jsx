import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { FaReact, FaPython, FaFlutter, FaDatabase, FaDocker, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { SiDjango, SiTensorflow, SiNodejs, SiMysql, SiPostgresql } from 'react-icons/si';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const skills = [
    { name: 'React', icon: <FaReact size={40} />, color: '#61DAFB' },
    { name: 'Django', icon: <SiDjango size={40} />, color: '#092F20' },
    { name: 'Flutter', icon: <FaFlutter size={40} />, color: '#02569B' },
    { name: 'Python', icon: <FaPython size={40} />, color: '#3776AB' },
    { name: 'AI/ML', icon: <SiTensorflow size={40} />, color: '#FF6F00' },
    { name: 'Node.js', icon: <SiNodejs size={40} />, color: '#339933' },
    { name: 'PostgreSQL', icon: <SiPostgresql size={40} />, color: '#336791' },
    { name: 'MySQL', icon: <SiMysql size={40} />, color: '#4479A1' },
    { name: 'Docker', icon: <FaDocker size={40} />, color: '#2496ED' },
    { name: 'DevOps', icon: <FaGithub size={40} />, color: '#333333' },
  ];

  const skillsPerSlide = 5;
  const totalSlides = Math.ceil(skills.length / skillsPerSlide);

  const getSkillsForSlide = (slideIndex) => {
    const start = slideIndex * skillsPerSlide;
    return skills.slice(start, start + skillsPerSlide);
  };

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-primary pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Issam <span className="text-accent">Developer</span>
          </h1>

          {/* Title */}
          <h2 className="text-xl md:text-2xl text-secondary mb-6 font-medium">
            Full-Stack Developer | Flutter Mobile App Expert | AI Automation Specialist
          </h2>

          {/* Bio */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Building scalable web apps, cross-platform mobile solutions, and intelligent AI automations to solve real-world problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={scrollToProjects}
              className="px-8 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
            >
              View Projects
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-primary transition-all duration-300"
            >
              Contact Me
            </button>
          </div>

          {/* Skills Carousel */}
          <div className="mt-16">
            <h3 className="text-secondary text-sm uppercase tracking-wider mb-6">Skills & Technologies</h3>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                onChange={(index) => setCurrentSlide(index)}
                className="max-w-4xl mx-auto"
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="flex justify-center gap-8 flex-wrap py-4">
                    {getSkillsForSlide(slideIndex).map((skill, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center group"
                      >
                        <div
                          className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-all duration-300"
                          style={{ color: skill.color }}
                        >
                          {skill.icon}
                        </div>
                        <span className="text-secondary text-sm group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="mailto:example@email.com"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="Email"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
