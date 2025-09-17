"use client";

import { useState, useEffect } from 'react';

interface UseImagePreloaderOptions {
  images: string[];
  onAllLoaded?: () => void;
  onProgress?: (loaded: number, total: number) => void;
}

export function useImagePreloader({ images, onAllLoaded, onProgress }: UseImagePreloaderOptions) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadedImages(new Set());
    setFailedImages(new Set());
    setProgress(0);

    images.forEach((src) => {
      const img = new Image();

      img.onload = () => {
        setLoadedImages(prev => {
          const newSet = new Set(prev);
          newSet.add(src);
          return newSet;
        });
      };

      img.onerror = () => {
        setFailedImages(prev => {
          const newSet = new Set(prev);
          newSet.add(src);
          return newSet;
        });
      };

      img.src = src;
    });

  }, [images]);

  // Separate effect to handle progress updates and completion
  useEffect(() => {
    const totalLoaded = loadedImages.size + failedImages.size;
    const progressPercent = Math.round((totalLoaded / images.length) * 100);
    setProgress(progressPercent);
    onProgress?.(totalLoaded, images.length);

    if (totalLoaded === images.length && images.length > 0) {
      setIsLoading(false);
      onAllLoaded?.();
    }
  }, [loadedImages.size, failedImages.size, images.length, onProgress, onAllLoaded]);

  return {
    isLoading,
    progress,
    loadedImages,
    failedImages,
    isImageLoaded: (src: string) => loadedImages.has(src),
    isImageFailed: (src: string) => failedImages.has(src),
  };
}

// Hook for preloading a single image
export function useImageLoad(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsLoaded(false);
    setIsError(false);

    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsError(true);
      setIsLoading(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoaded, isError, isLoading };
}