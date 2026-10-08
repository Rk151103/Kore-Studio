import { useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  fallbackTitle?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-video',
  fallbackTitle,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectRatioClass} bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col items-center justify-center p-6 text-center text-neutral-400 select-none overflow-hidden relative group ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900/80 to-neutral-800/40 opacity-70" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-neutral-800/90 border border-neutral-700/60 flex items-center justify-center text-neutral-400">
            <ImageOff className="w-5 h-5 text-neutral-400" />
          </div>
          <p className="text-xs font-medium text-neutral-300 max-w-[200px] truncate">
            {fallbackTitle || alt || 'Asset preview unavailable'}
          </p>
          <span className="text-[10px] text-neutral-500 font-mono tracking-tight">
            Fallback Container · Offline
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-neutral-700 border-t-neutral-400 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}
