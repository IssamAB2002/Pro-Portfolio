import { FaReact, FaPython, FaFlutter, FaDatabase, FaDocker, FaCode, FaMobile, FaBrain } from 'react-icons/fa';
import { SiDjango, SiTensorflow, SiNodejs, SiMysql, SiPostgresql, SiFirebase, SiRedis, SiAws, SiGit } from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <FaCode />,
      skills: [
        { name: 'React', level: 95, icon: <FaReact color="#61DAFB" /> },
        { name: 'HTML/CSS', level: 90, icon: <FaCode color="#E34F26" /> },
        { name: 'JavaScript', level: 90, icon: <FaCode color="#F7DF1E" /> },
        { name: 'Tailwind CSS', level: 85, icon: <FaCode color="#06B6D4" /> },
      ],
    },
    {
      title: 'Backend Development',
      icon: <FaCode />,
      skills: [
        { name: 'Django', level: 90, icon: <SiDjango color="#092F20" /> },
        { name: 'Node.js', level: 85, icon: <SiNodejs color="#339933" /> },
        { name: 'Python', level: 90, icon: <FaPython color="#3776AB" /> },
        { name: 'REST APIs', level: 88, icon: <FaCode color="#FF6F00" /> },
      ],
    },
    {
      title: 'Mobile Development',
      icon: <FaMobile />,
      skills: [
        { name: 'Flutter', level: 92, icon: <FaFlutter color="#02569B" /> },
        { name: 'Dart', level: 90, icon: <FaFlutter color="#0175C2" /> },
        { name: 'iOS/Android', level: 85, icon: <FaMobile color="#007AFF" /> },
        { name: 'Firebase', level: 80, icon: <SiFirebase color="#FFCA28" /> },
      ],
    },
    {
      title: 'AI & Automation',
      icon: <FaBrain />,
      skills: [
        { name: 'Python/ML', level: 88, icon: <FaPython color="#3776AB" /> },
        { name: 'TensorFlow', level: 80, icon: <SiTensorflow color="#FF6F00" /> },
        { name: 'RPA Tools', level: 75, icon: <FaBrain color="#6C5CE7" /> },
        { name: 'Automation', level: 85, icon: <FaPython color="#2ECC71" /> },
      ],
    },
    {
      title: 'Database & DevOps',
      icon: <FaDatabase />,
      skills: [
        { name: 'PostgreSQL', level: 88, icon: <SiPostgresql color="#336791" /> },
        { name: 'MySQL', level: 85, icon: <SiMysql color="#4479A1" /> },
        { name: 'Docker', level: 80, icon: <FaDocker color="#2496ED" /> },
        { name: 'AWS', level: 75, icon: <SiAws color="#FF9900" /> },
        { name: 'Git', level: 90, icon: <SiGit color="#F05032" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-primary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-accent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across various domains
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-accent text-xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="text-gray-300">{skill.name}</span>
                      </div>
                      <span className="text-accent text-sm font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-white text-center mb-6">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Redux', 'TypeScript', 'GraphQL', 'MongoDB', 'Redis', 
              'CI/CD', 'Jest', 'Webpack', 'Figma', 'REST APIs',
              'JSON', 'XML', 'OAuth', 'JWT', 'Agile', 'Scrum'
            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/5 text-secondary rounded-full text-sm hover:bg-accent hover:text-primary transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
