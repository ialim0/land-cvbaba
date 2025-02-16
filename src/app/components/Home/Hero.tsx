import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Play, ArrowRight, CheckCircle, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeroProps {
  t: (key: string) => string;
}

interface Benefit {
  id: number;
  text: string;
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  const [videoState, setVideoState] = useState<'thumbnail' | 'playing' | 'fullscreen'>('thumbnail');
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const VIDEO_CONFIG = {
    id: 'c2DFg53Zhvw',
    get thumbnailUrl() {
      return `https://img.youtube.com/vi/${this.id}/maxresdefault.jpg`;
    },
    get embedUrl() {
      return `https://www.youtube-nocookie.com/embed/${this.id}?autoplay=1&mute=1&rel=0&modestbranding=1`;
    }
  };

  const benefits: Benefit[] = [
    { id: 1, text: t('hero.benefit1') },
    { id: 2, text: t('hero.benefit2') },
    { id: 3, text: t('hero.benefit3') }
  ];

  const handleVideoInteraction = (mode: 'playing' | 'fullscreen') => {
    setVideoState(mode);
    if (mode === 'fullscreen' && videoContainerRef.current) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setVideoState('playing');
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);




  const LiveBadge = () => (
    <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 transition-all hover:bg-blue-100">
      <span className="relative flex h-2 w-2 mr-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
      </span>
      {t("hero.badge")}
    </div>
  );

  const BenefitsList = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {benefits.map((benefit) => (
        <div
          key={benefit.id}
          className="group flex flex-col items-center text-center bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-500 hover:-translate-y-1"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
            <CheckCircle className="w-6 h-6 text-blue-500 transition-colors" />
          </div>
          <p className="text-gray-800 font-medium">{benefit.text}</p>
        </div>
      ))}
      <div className="col-span-full flex items-center justify-center bg-blue-50/50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-500 hover:-translate-y-1">
        <CheckCircle className="w-6 h-6 text-blue-500 mr-3 transition-colors" />
        <p className="text-blue-700 font-medium">{t("hero.noCreditCardRequired")}</p>
      </div>
    </div>
  );

  const DemoVideo = () => {
    const renderBaseVideo = () => (
      <div
        ref={videoContainerRef}
        className={cn(
          "relative rounded-xl overflow-hidden shadow-2xl transition-all duration-500",
          videoState === 'fullscreen' ?
            "fixed inset-0 z-50 w-screen h-screen bg-black/90" :
            "aspect-video w-full"
        )}
      >
        <iframe
          src={VIDEO_CONFIG.embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="Product Demo Video"
        />
        {videoState === 'fullscreen' && (
          <button
            onClick={() => setVideoState('playing')}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-90"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6 transition-transform" />
          </button>
        )}
      </div>
    );

    const renderThumbnail = () => (
      <button
        onClick={() => handleVideoInteraction('playing')}
        className="w-full group/thumbnail"
        aria-label="Play demo video"
      >
        <div className="relative aspect-video w-full rounded-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
          <Image
            src={VIDEO_CONFIG.thumbnailUrl}
            alt="Video thumbnail"
            fill
            className="object-cover transition-transform duration-500 group-hover/thumbnail:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all group-hover/thumbnail:bg-black/20">
            <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md hover:shadow-lg">
              <Play className="w-8 h-8 text-blue-600 translate-x-0.5 transition-colors" />
            </div>
          </div>
        </div>
      </button>
    );

    return (
      <>
        {videoState === 'thumbnail' && renderThumbnail()}
        {(videoState === 'playing' || videoState === 'fullscreen') && renderBaseVideo()}
      </>
    );
  };

  const WatchDemoButton = ({ className }: { className?: string }) => (
    <Button
      variant="outline"
      size="lg"
      onClick={() => handleVideoInteraction('playing')}
      className={cn(
        "items-center border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <Play className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
      {t("hero.watchDemo")}
    </Button>
  );

  return (
    <section className="relative w-full overflow-hidden py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <LiveBadge />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://chat.cvbaba.com"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="group bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  {t("hero.ctaButton")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>

              <WatchDemoButton className="hidden lg:inline-flex" />
            </div>
            <BenefitsList />
          </div>
          <div>
            <DemoVideo />
            <div className="lg:hidden mt-4">
              <WatchDemoButton className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;