"use client";

import { useState, useEffect } from 'react';

interface UsePageLoadingOptions {
  duration?: number;
  minLoadingTime?: number;
  images?: string[];
}

export function usePageLoading({
  duration = 1500,
  minLoadingTime = 800,
  images = []
}: UsePageLoadingOptions = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images if provided
  useEffect(() => {
    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const imagePromises = images.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();

        const handleLoad = () => {
          loadedCount++;
          resolve();
        };

        const handleError = () => {
          loadedCount++;
          resolve(); // Still resolve on error to not block loading
        };

        img.onload = handleLoad;
        img.onerror = handleError;
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, [images]);

  useEffect(() => {
    const startTime = Date.now();
    let progressCompleted = false;

    // Animate progress smoothly
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          progressCompleted = true;
          return 100;
        }
        return prev + 3;
      });
    }, duration / 33); // ~30fps

    // Check when both progress and images are ready
    const checkCompletion = () => {
      if (progressCompleted && imagesLoaded) {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsed);

        setTimeout(() => {
          setProgress(100);
          setTimeout(() => setIsLoading(false), 150);
        }, remainingTime);
      } else {
        // Keep checking every 100ms
        setTimeout(checkCompletion, 100);
      }
    };

    // Start checking after initial duration
    const initialTimer = setTimeout(checkCompletion, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(initialTimer);
    };
  }, [duration, minLoadingTime, imagesLoaded]);

  return {
    isLoading,
    progress
  };
}