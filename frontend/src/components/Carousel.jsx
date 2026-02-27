import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const Carousel = ({ images, title, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-6xl rounded-xl overflow-hidden border border-white/20 bg-[#31194D]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} image preview`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
          aria-label="Close image preview"
        >
          <FaTimes />
        </button>

        <img
          src={images[currentIndex]}
          alt={`${title} fullscreen image ${currentIndex + 1}`}
          className="w-full max-h-[85vh] object-contain bg-[#1f1030]"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
              aria-label="Previous fullscreen image"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-[#FFD700] hover:text-[#31194D] transition-all duration-300"
              aria-label="Next fullscreen image"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
