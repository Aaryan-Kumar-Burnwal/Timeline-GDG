"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  placeholderImages?: string[];
  onImageChange?: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  alt,
  className = "",
  autoPlay = false,
  interval = 3000,
  showControls = true,
  showDots = true,
  showCounter = true,
  placeholderImages = [
    "/images/IMG_1.jpg",
    "/images/IMG_2.jpg",
    "/images/IMG_1.jpg",
  ],
  onImageChange,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const displayImages = useMemo(
    () => (images && images.length > 0 ? images : placeholderImages),
    [images, placeholderImages]
  );

  const nextImage = useCallback(() => {
    const newIndex = (currentImage + 1) % displayImages.length;
    setCurrentImage(newIndex);
    onImageChange?.(newIndex);
  }, [currentImage, displayImages.length, onImageChange]);

  const prevImage = useCallback(() => {
    const newIndex =
      (currentImage - 1 + displayImages.length) % displayImages.length;
    setCurrentImage(newIndex);
    onImageChange?.(newIndex);
  }, [currentImage, displayImages.length, onImageChange]);

  const goToImage = useCallback(
    (index: number) => {
      setCurrentImage(index);
      setIsPlaying(false);
      onImageChange?.(index);
    },
    [onImageChange]
  );

  const toggleSlideshow = useCallback(() => {
    setIsPlaying(!isPlaying);
    setIsPaused(false);
  }, [isPlaying]);

  const pauseSlideshow = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeSlideshow = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Touch handlers for swipe functionality
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
      setIsPlaying(false);
    }
    if (isRightSwipe) {
      prevImage();
      setIsPlaying(false);
    }
  };

  // Auto-advance slideshow
  React.useEffect(() => {
    if (
      !isPlaying ||
      isPaused ||
      shouldReduceMotion ||
      displayImages.length <= 1
    )
      return;

    const intervalId = setInterval(() => {
      nextImage();
    }, interval);

    return () => clearInterval(intervalId);
  }, [
    isPlaying,
    isPaused,
    nextImage,
    shouldReduceMotion,
    displayImages.length,
    interval,
  ]);

  // Animation variants
  const imageVariants = {
    enter: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : 100,
    },
    center: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : -100,
    },
  };

  return (
    <motion.div
      className={`relative w-full h-fit bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200/50 shadow-sm group ${className}`}
      whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
      transition={{ type: "tween", duration: 0.2 }}
      onMouseEnter={pauseSlideshow}
      onMouseLeave={resumeSlideshow}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={displayImages[currentImage]}
          alt={`${alt} - Image ${currentImage + 1}`}
          className="w-full h-full object-contain select-none"
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: shouldReduceMotion ? 0.1 : 0.3,
            ease: "easeOut",
          }}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (placeholderImages.length > 0) {
              target.src = placeholderImages[0];
            }
          }}
          draggable={false}
        />
      </AnimatePresence>

      {/* Slideshow Controls - Always visible on mobile, hover on desktop */}
      {showControls && displayImages.length > 1 && (
        <div className="absolute top-3 left-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            onClick={toggleSlideshow}
            className="bg-black/60 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/80 transition-all duration-200"
            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            title={isPlaying ? "Pause slideshow" : "Start slideshow"}
            aria-label={isPlaying ? "Pause slideshow" : "Start slideshow"}
          >
            {isPlaying ? (
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>
        </div>
      )}

      {/* Swipe Hint for Mobile - Shows briefly on first load */}
      {displayImages.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
          <motion.div
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
          >
            👆 Swipe to navigate
          </motion.div>
        </div>
      )}

      {/* Progress Bar for Slideshow */}
      {isPlaying && !isPaused && displayImages.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: interval / 1000, ease: "linear" }}
            key={currentImage}
          />
        </div>
      )}

      {/* Navigation Dots */}
      {showDots && displayImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/20 px-3 py-1 rounded-full">
          {displayImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentImage === index
                  ? "bg-blue-500 scale-110"
                  : "bg-white/60 hover:bg-white/80"
              }`}
              whileHover={shouldReduceMotion ? {} : { scale: 1.2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
      {displayImages.length > 1 && (
        <>
          <button
            onClick={() => {
              prevImage();
              setIsPlaying(false);
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              nextImage();
              setIsPlaying(false);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Image Counter with Slideshow Status */}
      {showCounter && (
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
            {currentImage + 1} / {displayImages.length}
          </div>
          {isPlaying && displayImages.length > 1 && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              AUTO
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ImageSlider;
