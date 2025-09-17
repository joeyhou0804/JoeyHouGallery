"use client";

import { useState, useEffect } from 'react';

interface UsePageLoadingOptions {
  duration?: number;
  minLoadingTime?: number;
}

export function usePageLoading({
  duration = 1500,
  minLoadingTime = 800
}: UsePageLoadingOptions = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    // Animate progress smoothly
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 3;
      });
    }, duration / 33); // ~30fps

    // Ensure minimum loading time
    const loadingTimer = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setIsLoading(false), 150);
      }, remainingTime);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
    };
  }, [duration, minLoadingTime]);

  return {
    isLoading,
    progress
  };
}