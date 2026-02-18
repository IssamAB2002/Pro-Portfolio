import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaBookOpen } from 'react-icons/fa';
import { blogsData } from '../data/blogsData';

const categories = ['All', 'Web App', 'Mobile App', 'AI Automation'];

const Blogs = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return blogsData;
    return blogsData.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#31194D] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header
          className={`text-center mb-10 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Build <span className="text-[#FFD700]">Stories</span> & Insights
          </h1>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-5"></div>
          <p className="text-[#E0E0E0] max-w-3xl mx-auto">
            Real project stories, technical decisions, and practical lessons that show how I turn client ideas into
            strong digital products.
          </p>
        </header>

        <section
          className={`mb-8 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#FFD700] text-[#31194D]'
                    : 'bg-white/5 text-[#E0E0E0] border border-white/15 hover:border-[#FFD700]/40 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <article
              key={article.id}
              className={`group bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm
                hover:bg-white/10 hover:border-[#FFD700]/30 hover:shadow-lg hover:shadow-[#FFD700]/10 hover:scale-[1.02]
                transition-all duration-300
                ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${150 + index * 80}ms` }}
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={article.image}
                  alt={`${article.title} visual`}
                  className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#31194D] to-transparent"></div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700]">{article.category}</span>
                  <span className="text-gray-400">{article.readTime}</span>
                </div>

                <h2 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-[#FFD700] transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{article.excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.date}</span>
                  <Link
                    to={`/blogs/${article.id}`}
                    className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white text-sm font-medium transition-colors"
                    aria-label={`Read ${article.title}`}
                  >
                    Read Story <FaArrowRight />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section
          className={`mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '240ms' }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFD700] text-[#31194D] font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FFD700]/20"
          >
            <FaArrowLeft />
            Return Home
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#FFD700] text-[#FFD700] font-semibold hover:bg-[#FFD700] hover:text-[#31194D] hover:scale-105 transition-all duration-300"
          >
            <FaBookOpen />
            Visit Projects
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
