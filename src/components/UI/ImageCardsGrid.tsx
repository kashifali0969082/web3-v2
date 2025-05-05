import React, { useState, useCallback, useMemo, memo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed Card imports since we're using custom divs
// import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, ImageOff, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCard {
  imagePath: string;
  title: string;
  link?: string;
  fallbackImage?: string;
}

// Basic fallback image (local) that doesn't depend on any functions
const DEFAULT_FALLBACK = '/images/w3b.jpeg';

// Helper function to detect if the user agent is mobile
const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(window.navigator.userAgent);
};

// Get device type once at load time
const IS_MOBILE_DEVICE = isMobile();

// Twitter image fallback with appropriate size based on device
const SBTC_FALLBACK = IS_MOBILE_DEVICE
  ? 'https://pbs.twimg.com/media/GhaODwBaAAA79PJ?format=jpg&name=thumb' 
  : 'https://pbs.twimg.com/media/GhaODwBaAAA79PJ?format=jpg&name=small';

// Helper function to convert Twitter image URLs to use smaller sizes
// Twitter supports name=small, name=medium, name=large, name=orig formats
const optimizeTwitterImageUrl = (url: string): string => {
  // Original URLs use 4096x4096 format - much larger than we need for cards
  // Use even smaller images (thumbnail quality) for mobile devices to save bandwidth
  // (small = ~680px, thumb = ~300px)
  const targetSize = IS_MOBILE_DEVICE ? 'thumb' : 'small';
  return url.replace('name=4096x4096', `name=${targetSize}`);
};

// Helper to get appropriate sized image for the modal/fullscreen view based on device
// Medium size offers better quality for desktop while still being efficient
// Small size is sufficient for mobile screens while saving bandwidth
const getMediumSizeImage = (url: string): string => {
  // On mobile, use small size for modal view to save bandwidth
  // Small size (~680px) is sufficient for most mobile screens
  // On desktop, use medium size (~1200px) for better quality
  const targetSize = IS_MOBILE_DEVICE ? 'small' : 'medium';
  
  // Replace any size parameter with our target size
  return url.replace(/name=(thumb|small|medium|large|4096x4096)/i, `name=${targetSize}`);
};

// Using local image files from public/images directory with fallbacks
const IMAGE_CARDS: ImageCard[] = [
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GjnMj8mbkAAPEMt?format=jpg&name=4096x4096'),
    title: 'Sonic BTC Integration',
    link: 'https://web3sonic.com/bitcoin-integration',
    fallbackImage: SBTC_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GkpTfTebkAAYkKI?format=jpg&name=4096x4096'),
    title: 'Sonic Network Growth',
    link: 'https://web3sonic.com/network',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GkPiXwcaAAEOipV?format=jpg&name=4096x4096'),
    title: 'Web3 BTC Performance',
    link: 'https://web3sonic.com/performance',
    fallbackImage: SBTC_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GkwXex6XEAAKc5I?format=jpg&name=4096x4096'),
    title: 'Sonic Ecosystem',
    link: 'https://web3sonic.com/ecosystem',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GkzlfoGWQAAycB3?format=jpg&name=4096x4096'),
    title: 'Blockchain Innovation',
    link: 'https://web3sonic.com/innovation',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GldpIPpbwAQsT3d?format=jpg&name=4096x4096'),
    title: 'Sonic Chain Security',
    link: 'https://web3sonic.com/security',
    fallbackImage: SBTC_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GlUanEYbgAAeEdn?format=jpg&name=4096x4096'),
    title: 'Sonic Token Analysis',
    link: 'https://web3sonic.com/token',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GlwT5TfagAAIZ_m?format=jpg&name=4096x4096'),
    title: 'Web3 BTC Tokenomics',
    link: 'https://web3sonic.com/tokenomics',
    fallbackImage: SBTC_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GmF-6twaAAAMDqn?format=jpg&name=4096x4096'),
    title: 'Sonic Labs Roadmap',
    link: 'https://web3sonic.com/roadmap',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GmNEGbta4AAGKOH?format=jpg&name=4096x4096'),
    title: 'Sonic Team Partners',
    link: 'https://web3sonic.com/partners',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GmtCTSobwAAnzvy?format=jpg&name=4096x4096'),
    title: 'Sonic Marketplace',
    link: 'https://web3sonic.com/marketplace',
    fallbackImage: SBTC_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GmVbtP7akAAx9z-?format=jpg&name=4096x4096'),
    title: 'Sonic Community',
    link: 'https://web3sonic.com/community',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GnDyBFQasAAZbLO?format=jpg&name=4096x4096'),
    title: 'Sonic AI Analytics',
    link: 'https://web3sonic.com/ai-analytics',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GnEyRFQsdjABbKL?format=jpg&name=4096x4096'),
    title: 'DeFi Yield Optimizer',
    link: 'https://web3sonic.com/defi-tools',
    fallbackImage: SBTC_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GjkMTBFaIAIZMDf?format=jpg&name=4096x4096'),
    title: 'Secure Wallet Vault',
    link: 'https://web3sonic.com/secure-vault',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GlwT5TfagAAIZ_m?format=jpg&name=4096x4096'),
    title: 'AI Tools & Resources',
    link: 'https://web3sonic.com/ai-tools',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GjnMj8mbkAAPEMt?format=jpg&name=4096x4096'),
    title: 'Mindset & Financial Training',
    link: 'https://web3sonic.com/training',
    fallbackImage: DEFAULT_FALLBACK
  },
  {
    imagePath: optimizeTwitterImageUrl('https://pbs.twimg.com/media/GlUanEYbgAAeEdn?format=jpg&name=4096x4096'),
    title: 'Web3 & DeFi Mastery',
    link: 'https://web3sonic.com/web3-defi',
    fallbackImage: SBTC_FALLBACK
  }
];

// Image Modal Component
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  onNext: () => void;
  onPrev: () => void;
  totalImages: number;
  currentIndex: number;
}

// Optimized ImageModal component with keyboard navigation
const ImageModal: React.FC<ImageModalProps> = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  title, 
  onNext, 
  onPrev, 
  totalImages, 
  currentIndex 
}) => {
  // Close on escape key and use arrow keys for navigation
  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);
  
  // Add keyboard event listeners when modal is open
  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeydown);
      return () => window.removeEventListener('keydown', handleKeydown);
    }
  }, [isOpen, handleKeydown]);

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
          style={{
            background: 'radial-gradient(circle at center, rgba(15, 28, 63, 0.3), rgba(95, 44, 23, 0.3), rgba(0, 0, 0, 0.85))'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full sm:w-[90%] md:w-[85%] lg:max-w-[75%] overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(90deg, #0f1c3f, #5f2c17, #2a1758, #3b1a1e)',
              backgroundSize: '400% 400%',
              animation: 'blue-orange-animation 10s ease infinite',
              padding: '2px'
            }}
          >
            <div className="absolute top-1 sm:top-2 right-1 sm:right-2 z-10">
              <motion.button
                onClick={onClose}
                className="rounded-full bg-black/60 p-1.5 sm:p-2 text-white hover:bg-black/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  boxShadow: '0 0 10px rgba(15, 28, 63, 0.6), 0 0 5px rgba(95, 44, 23, 0.6)'
                }}
              >
                <X className="h-4 w-4 sm:h-6 sm:w-6" />
              </motion.button>
            </div>
            
            {/* Left navigation button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 p-1.5 sm:p-3 text-white hover:bg-black/80 transition-colors"
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
              style={{
                boxShadow: '0 0 10px rgba(15, 28, 63, 0.6), 0 0 5px rgba(95, 44, 23, 0.6)'
              }}
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            </motion.button>
            
            {/* Right navigation button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 p-1.5 sm:p-3 text-white hover:bg-black/80 transition-colors"
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.9 }}
              style={{
                boxShadow: '0 0 10px rgba(15, 28, 63, 0.6), 0 0 5px rgba(95, 44, 23, 0.6)'
              }}
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </motion.button>
            
            <div className="w-full overflow-hidden rounded-xl" style={{
                background: 'linear-gradient(135deg, #0f1c3f 0%, #2a1758 50%, #3b1a1e 100%)'
              }}>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={imageSrc} // Key changes trigger animation
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  loading="eager" // Load immediately as it's the main focus
                  src={imageSrc} 
                  alt={title} 
                  className="w-full h-auto max-h-[70vh] sm:max-h-[85vh] object-contain backdrop-blur-sm"
                  style={{
                    boxShadow: "inset 0 0 30px rgba(15, 28, 63, 0.5), inset 0 0 20px rgba(95, 44, 23, 0.5)"
                  }}
                />
              </AnimatePresence>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 sm:p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm sm:text-xl font-bold bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#ff7e00] bg-clip-text text-transparent truncate">{title}</h3>
                <span className="text-white/70 text-xs sm:text-sm ml-2">
                  {currentIndex + 1} / {totalImages}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Animated Border Card component
interface AnimatedBorderCardProps {
  card: ImageCard;
  index: number;
  onImageClick: () => void;
}

// Optimized AnimatedBorderCard component
const AnimatedBorderCard = React.memo<AnimatedBorderCardProps>(({ card, index, onImageClick }) => {
  // Alternate colors between blue and bright orange
  const isBlue = index % 2 === 0;
  
  // Create delay based on index for staggered animation
  const delay = index * 0.1;
  
  // Image error handling
  const [imageError, setImageError] = useState(false);
  
  // Image loading state
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Reference to the card element for intersection observer
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Fallback image - using w3b.jpeg as a universal fallback
  const fallbackImageSrc = card.fallbackImage || '/images/w3b.jpeg';

  // Set up intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Once we've started loading the image, we don't need to observe anymore
          if (cardRef.current) observer.unobserve(cardRef.current);
        }
      },
      { rootMargin: '200px' } // Start loading when within 200px of viewport
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);
  
  // Handle image load completion
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Handle image click to open modal while preventing link click triggering
  const handleImageClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onImageClick();
  }, [onImageClick]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="relative group"
    >
      {/* Animated border effect */}
      <div 
        className="absolute -inset-0.5 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, #0f1c3f, #5f2c17, #2a1758, #3b1a1e)',
          backgroundSize: '400% 400%',
          animation: 'blue-orange-animation 8s ease infinite',
          boxShadow: '0 0 10px rgba(30, 30, 60, 0.6)',
          border: '1px solid transparent'
        }}
      />
      
      <div 
        className="relative h-full overflow-hidden rounded-xl border-0 card"
        style={{
          background: isBlue ? 
            'linear-gradient(135deg, #0f1c3f 0%, #2a1758 100%)' : 
            'linear-gradient(135deg, #3b1a1e 0%, #5f2c17 100%)'
        }}
      >
        <div className="p-0"> {/* Replaced CardContent with div */}
          <div 
            className="relative overflow-hidden aspect-video cursor-pointer sm:min-h-[140px]" 
            onClick={handleImageClick}
          >
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(30, 30, 50, 0.9)' }}>
                <div className="flex flex-col items-center text-center p-4">
                  <ImageOff className="h-10 w-10 text-slate-400 mb-2" />
                  <p className="text-sm bg-gradient-to-r from-[#00a3ff] to-[#ff7e00] bg-clip-text text-transparent">{card.title}</p>
                </div>
              </div>
            ) : (
              <>
                {/* Placeholder shown before the image is loaded */}
                {!isLoaded && isVisible && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#0f1c3f]/30 to-[#3b1a1e]/30">
                    <div className="w-10 h-10 rounded-full border-t-2 border-blue-400 animate-spin"></div>
                  </div>
                )}
                
                {/* Actual image, only loaded when visible in viewport */}
                {isVisible && (
                  <img 
                    loading="lazy" 
                    decoding="async" /* Use asynchronous decoding for smoother experience */
                    src={card.imagePath} 
                    alt={card.title} 
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transition: 'opacity 0.3s ease-in-out' }}
                    onLoad={handleImageLoad}
                    onError={(e) => {
                      // Try fallback image first
                      const imgElement = e.target as HTMLImageElement;
                      if (imgElement.src !== fallbackImageSrc) {
                        // console.log(`Trying fallback for: ${card.title}`);
                        imgElement.src = fallbackImageSrc;
                      } else {
                        // If fallback also fails, show error state
                        setImageError(true);
                      }
                    }}
                  />
                )}
                
                {/* Show low-quality placeholder when not visible yet */}
                {!isVisible && (
                  <div 
                    className="w-full h-full"
                    style={{ 
                      background: isBlue ? 
                        'linear-gradient(135deg, #0f1c3f 0%, #2a1758 100%)' : 
                        'linear-gradient(135deg, #3b1a1e 0%, #5f2c17 100%)',
                      borderRadius: '0.5rem'
                    }}
                  />
                )}
              </>
            )}
            
            {/* Title overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs sm:text-sm md:text-base font-medium bg-gradient-to-r from-[#00a3ff] to-[#ff7e00] bg-clip-text text-transparent truncate pr-4 sm:pr-6">{card.title}</h3>
                
                {card.link && (
                  <motion.a 
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking link
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ImageCardsGrid: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  // Memoized and optimized handlers with useCallback
  const handleNextImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => {
        if (prevIndex === null) return 0;
        return (prevIndex + 1) % IMAGE_CARDS.length;
      });
    }
  }, [selectedImageIndex]);
  
  const handlePrevImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => {
        if (prevIndex === null) return 0;
        return (prevIndex - 1 + IMAGE_CARDS.length) % IMAGE_CARDS.length;
      });
    }
  }, [selectedImageIndex]);
  
  const handleImageClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);
  
  // Memoize selected image to prevent recalculations
  // Use medium-sized images for modal view (better quality when shown large)
  const selectedImage = useMemo(() => 
    selectedImageIndex !== null 
      ? {
          // Get medium-sized version of the image for better quality in full-screen modal
          src: getMediumSizeImage(IMAGE_CARDS[selectedImageIndex].imagePath),
          title: IMAGE_CARDS[selectedImageIndex].title
        } 
      : null, 
    [selectedImageIndex]
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 hidden lg:block"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-[#00a3ff] via-[#36a2ff] to-[#ff7e00] bg-clip-text text-transparent">Sonic Ecosystem Updates</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {IMAGE_CARDS.map((card, index) => (
          <AnimatedBorderCard 
            key={index} 
            card={card} 
            index={index} 
            onImageClick={() => handleImageClick(index)}
          />
        ))}
      </div>
      
      <ImageModal 
        isOpen={selectedImageIndex !== null} 
        onClose={() => setSelectedImageIndex(null)}
        imageSrc={selectedImage?.src || ''}
        title={selectedImage?.title || ''}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        totalImages={IMAGE_CARDS.length}
        currentIndex={selectedImageIndex !== null ? selectedImageIndex : 0}
      />
    </motion.div>
  );
};

export default ImageCardsGrid;