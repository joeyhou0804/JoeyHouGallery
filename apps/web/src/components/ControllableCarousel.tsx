"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery, useTheme, CircularProgress } from "@mui/material";

interface ControllableCarouselProps {
  images: string[];
  /** Optional gap (px) between cards */
  gapPx?: number;
  /** How many neighbors to prefetch on each side (xs + md) */
  prefetchRadius?: number;
}

export default function ControllableCarousel({
  images,
  gapPx = 24,
  prefetchRadius = 2,
}: ControllableCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // xs-only swipe animation state
  const [dragX, setDragX] = useState(0);
  const [transitionCSS, setTransitionCSS] = useState<string | undefined>(undefined);
  const pendingDirection = useRef<"next" | "prev" | null>(null);

  // Loading + staging (xs only)
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [stagedIndex, setStagedIndex] = useState<number | null>(null);

  // Prefetch bookkeeping
  const prefetched = useRef<Set<string>>(new Set());
  const prefetchImg = useRef<HTMLImageElement | null>(null);

  const prefetch = useCallback((url?: string | null) => {
    if (!url) return;
    if (prefetched.current.has(url)) return;
    const img = new Image();
    img.decoding = "async";
    // @ts-expect-error: not in TS lib yet for HTMLImageElement, but supported in Chromium/WebKit
    img.fetchPriority = "low";
    img.src = url;
    prefetched.current.add(url);
    prefetchImg.current = img; // keep a ref so it’s not GC’d immediately
  }, []);

  // Breakpoints
  const upMd = useMediaQuery(theme.breakpoints.up("md"));
  const upSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  // Sizes
  const sizes = useMemo(() => {
    const centerW = upMd ? 450 : upSm ? 400 : 300;
    const centerH = upMd ? 600 : upSm ? 500 : 400;
    const sideW = upSm ? 224 : 160;
    const sideH = upSm ? 320 : 240;
    return { centerW, centerH, sideW, sideH };
  }, [upMd, upSm]);

  const { centerW, sideW } = sizes;

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  }, []);
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? prev : prev + 1));
  }, [images.length]);

  // ===== Prefetching =====
  // Prefetch neighbors around a given index (bounded)
  const prefetchAround = useCallback(
    (index: number) => {
      if (!Array.isArray(images) || images.length === 0) return;
      const start = Math.max(0, index - prefetchRadius);
      const end = Math.min(images.length - 1, index + prefetchRadius);
      for (let i = start; i <= end; i++) {
        if (i === index) continue; // current is already on screen
        prefetch(images[i]);
      }
    },
    [images, prefetchRadius, prefetch]
  );

  // On mount & whenever currentIndex changes: prefetch its neighbors
  useEffect(() => {
    if (images.length === 0) return;
    prefetchAround(currentIndex);
  }, [currentIndex, images, prefetchAround]);

  // When we have a staged index (user committed a swipe), also prefetch around that staged target
  useEffect(() => {
    if (stagedIndex == null) return;
    prefetchAround(stagedIndex);
  }, [stagedIndex, prefetchAround]);

  // Also prefetch the very first neighbors early
  useEffect(() => {
    if (images.length === 0) return;
    prefetchAround(0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ----- xs-only swipe handlers with immediate staging -----
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isXs) return;
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = e.touches[0].clientX;
      pendingDirection.current = null;
      setTransitionCSS("none");
      setDragX(0);
    }
  }, [isXs]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isXs) return;
    if (e.touches[0]) {
      const x = e.touches[0].clientX;
      touchEndX.current = x;

      const delta = x - touchStartX.current;
      const atStart = currentIndex === 0 && delta > 0;
      const atEnd = currentIndex === images.length - 1 && delta < 0;

      let effectiveDelta = delta;
      if (atStart || atEnd) effectiveDelta = delta * 0.35; // rubber-band
      setDragX(effectiveDelta);
    }
  }, [isXs, currentIndex, images.length]);

  const handleTouchEnd = useCallback(() => {
    if (!isXs) return;

    const deltaX = touchEndX.current - touchStartX.current;
    const threshold = 60; // px

    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < images.length - 1;

    // Reset trackers
    touchStartX.current = 0;
    touchEndX.current = 0;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0 && canGoNext) {
        // Stage NEXT immediately, spinner on
        pendingDirection.current = "next";
        const target = currentIndex + 1;
        setStagedIndex(target);
        setIsImageLoading(true);
        setTransitionCSS("transform 280ms ease");
        setDragX(-window.innerWidth); // slide current out to left
        return;
      }
      if (deltaX > 0 && canGoPrev) {
        // Stage PREV immediately
        pendingDirection.current = "prev";
        const target = currentIndex - 1;
        setStagedIndex(target);
        setIsImageLoading(true);
        setTransitionCSS("transform 280ms ease");
        setDragX(window.innerWidth); // slide current out to right
        return;
      }
    }

    // Not enough swipe or at edge: snap back
    pendingDirection.current = null;
    setTransitionCSS("transform 220ms ease");
    setDragX(0);
  }, [isXs, currentIndex]);

  // After slide-out finishes, promote staged image to current and clear staging
  const handleCenterTransitionEnd = useCallback(() => {
    if (!isXs) return;

    if (stagedIndex != null) {
      setTransitionCSS("none");
      setCurrentIndex(stagedIndex);
      setDragX(0);
      setStagedIndex(null);
      // isImageLoading -> cleared by staged image's onLoad/onError
      return;
    }
  }, [isXs, stagedIndex]);

  // Distances for side cards (md+ only)
  const { centerW: _centerW, sideW: _sideW } = sizes;
  const sideDistancePx = (n: number) =>
    _centerW / 2 + gapPx + (n - 1) * (_sideW + gapPx) + _sideW / 2;

  const arrowOffsetPx = centerW / 2 + gapPx;

  if (images.length === 0) return null;

  // Load handlers for staged image
  const handleStagedImgLoad = useCallback(() => {
    if (isXs) setTimeout(() => setIsImageLoading(false), 60);
  }, [isXs]);
  const handleStagedImgError = useCallback(() => {
    if (isXs) setIsImageLoading(false);
  }, [isXs]);

  return (
    <Box sx={{ py: 4, position: "relative" }}>
      {/* Full-bleed container */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "500px", sm: "500px", md: "600px" },
          width: "100vw",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          overflow: "visible",
          touchAction: "pan-y",
        }}
      >
        {/* Stacked cards on xs: staged under current */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: "translateX(-50%)",
            zIndex: 3,
            width: { xs: "90vw", sm: "400px", md: "450px" },
            maxWidth: { xs: "400px", sm: "400px", md: "450px" },
            height: { xs: "500px", sm: "500px", md: "600px" },
          }}
        >
          {/* STAGED card (xs only) */}
          {isXs && stagedIndex != null && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                zIndex: 1,
              }}
            >
              <img
                src={images[stagedIndex]}
                alt={`Travel Journal ${stagedIndex + 1}`}
                onLoad={handleStagedImgLoad}
                onError={handleStagedImgError}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                  userSelect: "none",
                  touchAction: "none",
                  opacity: isImageLoading ? 0 : 1,
                  transition: "opacity 200ms ease",
                }}
                draggable={false}
                fetchPriority="high"
                decoding="async"
                loading="eager"
              />
              {isImageLoading && (
                <Box
                  aria-live="polite"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(2px)",
                    background:
                      "linear-gradient(0deg, rgba(255,255,255,0.55), rgba(255,255,255,0.55))",
                    pointerEvents: "none",
                  }}
                >
                  <CircularProgress size={32} thickness={5} />
                </Box>
              )}
            </Box>
          )}

          {/* CURRENT card (on top) */}
          <Box
            onTouchStart={isXs ? handleTouchStart : undefined}
            onTouchMove={isXs ? handleTouchMove : undefined}
            onTouchEnd={isXs ? handleTouchEnd : undefined}
            onTransitionEnd={isXs ? handleCenterTransitionEnd : undefined}
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
              cursor: isXs ? "grab" : "default",
              transform: isXs ? `translateX(${dragX}px)` : "translateX(0)",
              transition: isXs ? transitionCSS : "none",
              zIndex: 2,
              background: "transparent",
            }}
          >
            <img
              src={images[currentIndex]}
              alt={`Travel Journal ${currentIndex + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                userSelect: "none",
                touchAction: "none",
              }}
              draggable={false}
              fetchPriority={isXs ? "high" : undefined}
              decoding="async"
              loading="eager"
            />
          </Box>
        </Box>

        {/* Left side images - hidden on xs screens */}
        {!isXs &&
          [1, 2].map((offset) => {
            const leftIndex = currentIndex - offset;
            if (leftIndex < 0) return null;
            return (
              <Box
                key={`left-${offset}`}
                onClick={() => setCurrentIndex(leftIndex)}
                sx={{
                  position: "absolute",
                  right: `calc(50% + ${sideDistancePx(offset)}px)`,
                  bottom: 0,
                  transform: "translateX(50%)",
                  zIndex: 3 - offset,
                }}
              >
                <Box
                  sx={{
                    cursor: images.length > 1 ? "pointer" : "default",
                    height: { xs: "240px", sm: "320px" },
                    width: { xs: "160px", sm: "224px" },
                    borderRadius: 2,
                    overflow: "hidden",
                    opacity: 0.7,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      opacity: 1,
                      transform: "translateX(0) scale(0.85)",
                    },
                  }}
                >
                  <img
                    src={images[leftIndex]}
                    alt={`Travel Journal ${leftIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    decoding="async"
                    loading="lazy"
                  />
                </Box>
              </Box>
            );
          })}

        {/* Right side images - hidden on xs screens */}
        {!isXs &&
          [1, 2].map((offset) => {
            const rightIndex = currentIndex + offset;
            if (rightIndex >= images.length) return null;
            return (
              <Box
                key={`right-${offset}`}
                onClick={() => setCurrentIndex(rightIndex)}
                sx={{
                  position: "absolute",
                  left: `calc(50% + ${sideDistancePx(offset)}px)`,
                  bottom: 0,
                  transform: "translateX(-50%)",
                  zIndex: 3 - offset,
                }}
              >
                <Box
                  sx={{
                    cursor: images.length > 1 ? "pointer" : "default",
                    height: { xs: "240px", sm: "320px" },
                    width: { xs: "160px", sm: "224px" },
                    borderRadius: 2,
                    overflow: "hidden",
                    opacity: 0.7,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      opacity: 1,
                      transform: "translateX(0) scale(0.85)",
                    },
                  }}
                >
                  <img
                    src={images[rightIndex]}
                    alt={`Travel Journal ${rightIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    decoding="async"
                    loading="lazy"
                  />
                </Box>
              </Box>
            );
          })}

        {/* Left Arrow - hidden on xs screens */}
        {!isXs && images.length > 1 && currentIndex > 0 && (
          <IconButton
            onClick={goToPrevious}
            sx={{
              position: "absolute",
              right: `calc(50% + ${arrowOffsetPx}px)`,
              top: "30%",
              transform: "translateY(-50%)",
              zIndex: 4,
              backgroundColor: "transparent",
              padding: 2,
              "&:hover": { backgroundColor: "rgba(241, 252, 135, 0.1)" },
            }}
          >
            <ArrowBackIosIcon
              sx={{
                fontSize: "3.5rem",
                color: "#F1FC87",
                strokeWidth: 1,
                stroke: "#2D1619",
                filter:
                  "drop-shadow(0.5px 0px 0px #2D1619) drop-shadow(-0.5px 0px 0px #2D1619) drop-shadow(0px 0.5px 0px #2D1619) drop-shadow(0px -0.5px 0px #2D1619)",
              }}
            />
          </IconButton>
        )}

        {/* Right Arrow - hidden on xs screens */}
        {!isXs && images.length > 1 && currentIndex < images.length - 1 && (
          <IconButton
            onClick={goToNext}
            sx={{
              position: "absolute",
              left: `calc(50% + ${arrowOffsetPx}px)`,
              top: "30%",
              transform: "translateY(-50%)",
              zIndex: 4,
              backgroundColor: "transparent",
              padding: 2,
              "&:hover": { backgroundColor: "rgba(241, 252, 135, 0.1)" },
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                fontSize: "3.5rem",
                color: "#F1FC87",
                strokeWidth: 1,
                stroke: "#2D1619",
                filter:
                  "drop-shadow(0.5px 0px 0px #2D1619) drop-shadow(-0.5px 0px 0px #2D1619) drop-shadow(0px 0.5px 0px #2D1619) drop-shadow(0px -0.5px 0px #2D1619)",
              }}
            />
          </IconButton>
        )}
      </Box>

      {/* Dots */}
      {images.length > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 3,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor:
                  index === currentIndex ? "#BB8F43" : "rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor:
                    index === currentIndex
                      ? "#BB8F43"
                      : "rgba(0, 0, 0, 0.5)",
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
