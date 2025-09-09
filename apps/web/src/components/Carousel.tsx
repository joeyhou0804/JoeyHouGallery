"use client";

import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';

// Carousel Component: Infinite carousels with yellow background
export default function Carousel({ images }: { images: string[] }) {
  // Split images into two groups (roughly half each)
  const midpoint = Math.ceil(images.length / 2);
  const firstHalf = images.slice(0, midpoint);
  const secondHalf = images.slice(midpoint);

  // Animation for right to left scrolling
  const scrollRightToLeft = keyframes`
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  `;

  // Animation for left to right scrolling  
  const scrollLeftToRight = keyframes`
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  `;

  const CarouselRow = ({ images, direction }: { images: string[], direction: 'rtl' | 'ltr' }) => (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        mb: 2,
        zIndex: 2, // Above yellow background
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          animation: direction === 'rtl' 
            ? `${scrollRightToLeft} 25s linear infinite`
            : `${scrollLeftToRight} 25s linear infinite`,
          width: 'fit-content',
        }}
      >
        {/* Double the images for seamless infinite scroll */}
        {[...images, ...images].map((img, index) => (
          <Box
            key={index}
            sx={{
              minWidth: '280px',
              height: '180px',
              flexShrink: 0,
            }}
          >
            <img
              src={img}
              alt={`Manipulation ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '6px solid white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ position: 'relative', mt: 8, mb: 4 }}>
      {/* Background section with zigzag top */}
      <Box
        sx={(theme) => {
          const depth = {
            xs: 6,   // smaller depth on mobile
            sm: 8,   // medium depth on small screens
            md: 10,  // original depth on medium+ screens
          };
          const steps = 120;

          return {
            position: 'absolute',
            top: '90px', // Start at vertical middle of first carousel (180px / 2)
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            width: '100vw', // Full screen width
            height: 'calc(100% - 90px + 50px)', // Extend beyond carousels but stop before footer
            zIndex: 1, // Above blue background, behind carousels
            
            // Yellow gradient with stripes (matches StickyAR section title)
            '--stripe': `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              rgba(255, 255, 255, 0.3) 8px,
              rgba(255, 255, 255, 0.3) 16px
            )`,
            '--yellow': 'linear-gradient(to bottom, #BB8F43, #DFBF23)',
            backgroundImage: 'var(--stripe), var(--yellow)',
            backgroundRepeat: 'repeat, no-repeat',
            backgroundSize: 'auto, 100% 100%',
            backgroundPosition: 'left top, left top',

            // Responsive zigzag top and bottom
            [theme.breakpoints.up('xs')]: {
              paddingTop: `${depth.xs}px`,
              clipPath: `polygon(
                0% 0%,
                ${Array.from({ length: steps + 1 }, (_, i) => {
                  const x = (i / steps) * 100;
                  const isPeak = i % 2 === 0;
                  const y = isPeak ? '0%' : `${depth.xs}px`;
                  return `${x.toFixed(2)}% ${y}`;
                }).join(', ')},
                100% 0%, 100% calc(100% - ${depth.xs}px),
                ${Array.from({ length: steps + 1 }, (_, i) => {
                  const x = ((steps - i) / steps) * 100;
                  const isPeak = i % 2 === 0;
                  const y = isPeak ? '100%' : `calc(100% - ${depth.xs}px)`;
                  return `${x.toFixed(2)}% ${y}`;
                }).join(', ')},
                0% calc(100% - ${depth.xs}px), 0% 0%
              )`,
            },
            [theme.breakpoints.up('sm')]: {
              paddingTop: `${depth.sm}px`,
              clipPath: `polygon(
                0% 0%,
                ${Array.from({ length: steps + 1 }, (_, i) => {
                  const x = (i / steps) * 100;
                  const isPeak = i % 2 === 0;
                  const y = isPeak ? '0%' : `${depth.sm}px`;
                  return `${x.toFixed(2)}% ${y}`;
                }).join(', ')},
                100% 0%, 100% calc(100% - ${depth.sm}px),
                ${Array.from({ length: steps + 1 }, (_, i) => {
                  const x = ((steps - i) / steps) * 100;
                  const isPeak = i % 2 === 0;
                  const y = isPeak ? '100%' : `calc(100% - ${depth.sm}px)`;
                  return `${x.toFixed(2)}% ${y}`;
                }).join(', ')},
                0% calc(100% - ${depth.sm}px), 0% 0%
              )`,
            },
            [theme.breakpoints.up('md')]: {
              paddingTop: `${depth.md}px`,
              clipPath: `polygon(
                0% 0%,
                ${Array.from({ length: steps + 1 }, (_, i) => {
                  const x = (i / steps) * 100;
                  const isPeak = i % 2 === 0;
                  const y = isPeak ? '0%' : `${depth.md}px`;
                  return `${x.toFixed(2)}% ${y}`;
                }).join(', ')},
                100% 0%, 100% calc(100% - ${depth.md}px),
                ${Array.from({ length: steps + 1 }, (_, i) => {
                  const x = ((steps - i) / steps) * 100;
                  const isPeak = i % 2 === 0;
                  const y = isPeak ? '100%' : `calc(100% - ${depth.md}px)`;
                  return `${x.toFixed(2)}% ${y}`;
                }).join(', ')},
                0% calc(100% - ${depth.md}px), 0% 0%
              )`,
            },
          };
        }}
      />
      
      {/* Carousels on top */}
      <CarouselRow images={firstHalf} direction="rtl" />
      <CarouselRow images={secondHalf} direction="ltr" />
    </Box>
  );
}