"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery, useTheme } from "@mui/material";

interface ControllableCarouselProps {
  images: string[];
  /** Optional gap (px) between cards */
  gapPx?: number;
}

export default function ControllableCarousel({
  images,
  gapPx = 24,
}: ControllableCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  // Breakpoint booleans
  const upMd = useMediaQuery(theme.breakpoints.up("md")); // >= md
  const upSm = useMediaQuery(theme.breakpoints.up("sm")); // >= sm

  // Card sizes derived from your sx:
  // Center: { xs: 300x400, sm: 400x500, md: 450x600 }
  // Side:   { xs: 160x240, sm: 224x320 } (md uses sm sizes in your code)
  const sizes = useMemo(() => {
    const centerW = upMd ? 450 : upSm ? 400 : 300;
    const centerH = upMd ? 600 : upSm ? 500 : 400;
    const sideW = upSm ? 224 : 160;
    const sideH = upSm ? 320 : 240;
    return { centerW, centerH, sideW, sideH };
  }, [upMd, upSm]);

  const { centerW, centerH, sideW, sideH } = sizes;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? prev : prev + 1
    );
  };

  if (images.length === 0) return null;

  // For side cards, the nth card offset from center edge:
  // distance(n) = (centerW/2) + gap + (n-1)*(sideW + gap) + (sideW/2)
  const sideDistancePx = (n: number) =>
    centerW / 2 + gapPx + (n - 1) * (sideW + gapPx) + sideW / 2;

  // Arrow offset: just outside the center card by gap
  const arrowOffsetPx = centerW / 2 + gapPx;

  return (
    <Box sx={{ py: 4, position: "relative" }}>
      {/* Full-bleed container */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "400px", sm: "500px", md: "600px" },
          width: "100vw",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          overflow: "visible",
        }}
      >
        {/* Center image */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: "translateX(-50%)",
            zIndex: 3,
          }}
        >
          <Box
            sx={{
              cursor: "default",
              height: { xs: "400px", sm: "500px", md: "600px" },
              width: { xs: "300px", sm: "400px", md: "450px" },
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
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
              }}
            />
          </Box>
        </Box>

        {/* Left side images */}
        {[1, 2].map((offset) => {
          const leftIndex = currentIndex - offset;
          if (leftIndex < 0) return null;
          return (
            <Box
              key={`left-${offset}`}
              onClick={() => setCurrentIndex(leftIndex)}
              sx={{
                position: "absolute",
                // Place to the left by a computed distance that guarantees non-overlap
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
                />
              </Box>
            </Box>
          );
        })}

        {/* Right side images */}
        {[1, 2].map((offset) => {
          const rightIndex = currentIndex + offset;
          if (rightIndex >= images.length) return null;
          return (
            <Box
              key={`right-${offset}`}
              onClick={() => setCurrentIndex(rightIndex)}
              sx={{
                position: "absolute",
                // Place to the right by a computed distance that guarantees non-overlap
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
                />
              </Box>
            </Box>
          );
        })}

        {/* Left Arrow */}
        {images.length > 1 && currentIndex > 0 && (
          <IconButton
            onClick={goToPrevious}
            sx={{
              position: "absolute",
              right: `calc(50% + ${arrowOffsetPx}px)`,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 4,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}

        {/* Right Arrow */}
        {images.length > 1 && currentIndex < images.length - 1 && (
          <IconButton
            onClick={goToNext}
            sx={{
              position: "absolute",
              left: `calc(50% + ${arrowOffsetPx}px)`,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 4,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
            }}
          >
            <ArrowForwardIosIcon />
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
