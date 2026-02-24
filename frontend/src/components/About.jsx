import { FaUser, FaAward, FaBriefcase } from 'react-icons/fa';

const About = () => {
  const achievements = [
    '5+ years of professional experience in full-stack development',
    'Built 20+ web and mobile applications',
    'Expert in React, Django, Flutter, and AI/ML technologies',
    'Delivered enterprise solutions for clients across various industries',
    'Strong background in database design and API integration',
  ];

  return (
    <section id="about" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo Placeholder */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/10 flex items-center justify-center border-4 border-accent/30">
                <FaUser className="text-accent" size={80} />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent text-primary p-4 rounded-full">
                <FaAward size={32} />
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Full-Stack Developer | Flutter Expert | AI Specialist
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm a passionate full-stack developer with expertise in building modern web applications, 
              cross-platform mobile apps, and intelligent AI automation solutions. With a strong 
              foundation in both frontend and backend technologies, I create scalable and efficient 
              applications that solve real-world problems.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              My journey in tech has been driven by a constant desire to learn and adapt to new 
              technologies. I specialize in React for frontend development, Django for robust 
              backend solutions, and Flutter for beautiful cross-platform mobile applications. 
              Additionally, I leverage AI and machine learning to build intelligent automation 
              systems that enhance productivity.
            </p>

            {/* Key Achievements */}
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                <FaBriefcase /> Key Achievements
              </h4>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="text-gray-300 flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
