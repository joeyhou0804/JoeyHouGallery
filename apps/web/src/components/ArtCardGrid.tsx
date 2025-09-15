"use client";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, useState, useRef } from 'react';
import type { Language } from '@joey/atoms';

interface ArtCardGridProps {
  images: string[];
  titles?: string[];
}

// Individual card component with animation
function AnimatedArtCard({
  image,
  title,
  color,
  index,
  language
}: {
  image: string;
  title: string;
  color: string;
  index: number;
  language: Language;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node || hasAnimated) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    let timeoutId: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = window.setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, index * 150); // 150ms delay between each card
            observer.unobserve(node);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(node);
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [index, hasAnimated]);

  return (
    <Box
      ref={cardRef}
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, opacity',
      }}
    >
      {/* Title above the image */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(to right, ${color}, ${color})`,
          padding: 1.5,
          mb: 2,
          clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 15px) 25%, 100% 50%, calc(100% - 15px) 75%, 100% 100%, 0% 100%)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            color: 'white',
            fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), 0px 0px 1px rgba(0, 0, 0, 0.5)',
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
          }}
        >
          {title}
        </Typography>
      </Box>

      <img
        src={image}
        alt={`${title} Art`}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          display: 'block',
        }}
      />
    </Box>
  );
}

export default function ArtCardGrid({ images, titles }: ArtCardGridProps) {
  const { language } = useTranslation();
  
  // Default titles if not provided
  const defaultTitles = ["Renaissance", "Cubism", "Moderism", "Impressionism"];
  const artTitles = titles || defaultTitles;
  
  // Color palette that loops back when there are more images than colors
  const colors = ["#F1B17E", "#39DF88", "#6CBEEB", "#F58EC3", "#A69CE8", "#6D9CEB", "#D1393E"];

  return (
    <Box sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 4,
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        {images.map((image: string, imgIndex: number) => {
          const colorIndex = imgIndex % colors.length; // Loop back when exceeding color array
          const titleText = artTitles[imgIndex] || `Art ${imgIndex + 1}`;

          return (
            <AnimatedArtCard
              key={imgIndex}
              image={image}
              title={titleText}
              color={colors[colorIndex] || '#F1B17E'}
              index={imgIndex}
              language={(language || 'en') as Language}
            />
          );
        })}
      </Box>
    </Box>
  );
}