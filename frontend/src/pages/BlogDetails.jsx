import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getBlog } from '../lib/api';
import Carousel from '../components/Carousel';

const BlogDetails = () => {
  const { slug } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [article, setArticle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoaded(false);
      const fetchedArticle = await getBlog(slug);
      setArticle(fetchedArticle);
      setLoaded(true);
    };

    fetchBlog();
  }, [slug]);

  const articleImages = useMemo(() => {
    if (!article) return [];
    if (Array.isArray(article.images) && article.images.length > 0) return article.images;
    return [article.image].filter(Boolean);
  }, [article]);

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % articleImages.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + articleImages.length) % articleImages.length);
  };


  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!loaded && !article) {
    return (
      <div className="min-h-screen bg-[#31194D] pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-white text-2xl">Loading blog post...</div>
      </div>
    );
  }

  if (!article) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <div className="min-h-screen bg-[#31194D] py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors mb-8"
        >
          <FaArrowLeft />
          Back to Blogs
        </Link>

        <div
          className={`transition-all duration-800 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] text-xs">{article.category}</span>
            <span className="text-gray-400 text-sm">{article.readTime}</span>
            <span className="text-gray-500 text-sm">{article.date}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{article.title}</h1>

          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 mb-4 relative group">
            <div className="relative w-full h-[240px] sm:h-[340px] md:h-[420px] overflow-hidden">
              <div
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {articleImages.map((image, index) => (
                  <button
                    key={`${article.id}-image-${index}`}
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full h-full flex-shrink-0"
                    aria-label={`Open image ${index + 1} for ${article.title}`}
                  >
                    <img
                      src={image}
                      alt={`${article.title} image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {articleImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
                  aria-label="Previous image"
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={goToNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
                  aria-label="Next image"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mb-10">
            {articleImages.map((_, index) => (
              <button
                key={`${article.id}-dot-${index}`}
                type="button"
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentImageIndex === index ? 'w-6 bg-[#FFD700]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Build Story</h2>
          <p className="text-[#E0E0E0] leading-relaxed">{article.story}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Key Highlights</h2>
          <ul className="list-disc list-inside space-y-3">
            {article.highlights.map((point, index) => (
              <li
                key={`${article.id}-highlight-${index}`}
                className={`text-[#E0E0E0] transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                }`}
                style={{ transitionDelay: `${220 + index * 170}ms` }}
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#FFD700] text-[#FFD700] font-semibold hover:bg-[#FFD700] hover:text-[#31194D] hover:scale-105 transition-all duration-300"
          >
            <FaArrowLeft />
            More Stories
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFD700] text-[#31194D] font-semibold hover:bg-white hover:scale-105 transition-all duration-300"
          >
            View Projects
          </Link>
        </section>
      </div>

      <Carousel
        images={articleImages}
        title={article.title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BlogDetails;

