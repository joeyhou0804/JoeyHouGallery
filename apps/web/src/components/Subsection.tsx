"use client";

import Box from '@mui/material/Box';
import Section from '@/components/Section';
import SubsectionBox from '@/components/SubsectionBox';
import ControllableCarousel from '@/components/ControllableCarousel';
import type { Section as SectionType } from '@/content/types';

// Subsection Component: Background container with SubsectionBox and optional carousel
export default function Subsection({ 
  section, 
  index, 
  year,
  customGradient,
  children,
  title,
  backgroundImage = '/backgrounds/subsection_background_1.png',
  carouselImages,
  carouselSpacing = 6,
  zIndex = 1,
  customColor
}: { 
  section: Extract<SectionType, { type: 'gallery' }> | any, 
  index: number,
  year?: string,
  customGradient?: string,
  children?: React.ReactNode,
  title?: string,
  backgroundImage?: string,
  carouselImages?: string[],
  carouselSpacing?: number,
  zIndex?: number,
  customColor?: 'red' | 'blue' | 'green'
}) {
  // Convert customColor to gradient
  const colorGradients = {
    red: 'linear-gradient(to right, #FF8E65, #FF4582)',
    blue: 'linear-gradient(to right, #75C5EB, #297BC8)', 
    green: 'linear-gradient(to right, #39DE88, #17CACB)'
  };
  
  const finalGradient = customColor ? colorGradients[customColor] : customGradient;
  
  return (
    <Box 
      sx={(theme) => {
        const depth = {
          xs: 6,   // smaller depth on mobile
          sm: 8,   // medium depth on small screens
          md: 10,  // original depth on medium+ screens
        };
        const steps = 120;

        return {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          position: 'relative',
          zIndex: zIndex,
          marginTop: '-40px', // Move whole part up 40px to overlap MainSection zigzags
          paddingTop: '40px', // Add padding to compensate for content position
          
          // Responsive zigzag bottom (matching MainSection pattern)
          [theme.breakpoints.up('xs')]: {
            paddingBottom: `calc(${theme.spacing(6)} + ${depth.xs}px)`,
            clipPath: `polygon(
              0% 0%, 100% 0%, 
              100% calc(100% - ${depth.xs}px),
              ${Array.from({ length: steps + 1 }, (_, i) => {
                const x = ((steps - i) / steps) * 100;
                const isPeak = i % 2 === 0;
                const y = isPeak ? '100%' : `calc(100% - ${depth.xs}px)`;
                return `${x.toFixed(2)}% ${y}`;
              }).join(', ')},
              0% calc(100% - ${depth.xs}px)
            )`,
          },
          [theme.breakpoints.up('sm')]: {
            paddingBottom: `calc(${theme.spacing(6)} + ${depth.sm}px)`,
            clipPath: `polygon(
              0% 0%, 100% 0%, 
              100% calc(100% - ${depth.sm}px),
              ${Array.from({ length: steps + 1 }, (_, i) => {
                const x = ((steps - i) / steps) * 100;
                const isPeak = i % 2 === 0;
                const y = isPeak ? '100%' : `calc(100% - ${depth.sm}px)`;
                return `${x.toFixed(2)}% ${y}`;
              }).join(', ')},
              0% calc(100% - ${depth.sm}px)
            )`,
          },
          [theme.breakpoints.up('md')]: {
            paddingBottom: `calc(${theme.spacing(6)} + ${depth.md}px)`,
            clipPath: `polygon(
              0% 0%, 100% 0%, 
              100% calc(100% - ${depth.md}px),
              ${Array.from({ length: steps + 1 }, (_, i) => {
                const x = ((steps - i) / steps) * 100;
                const isPeak = i % 2 === 0;
                const y = isPeak ? '100%' : `calc(100% - ${depth.md}px)`;
                return `${x.toFixed(2)}% ${y}`;
              }).join(', ')},
              0% calc(100% - ${depth.md}px)
            )`,
          },
        };
      }}
    >
      <Section sx={{ mt: 5 }}> {/* Move content down 40px */}
        <SubsectionBox 
          section={section} 
          index={index} 
          year={year}
          title={title}
          customGradient={finalGradient}
        >
          {children}
        </SubsectionBox>
        
        {carouselImages && carouselImages.length > 0 && (
          <Box sx={{ mt: carouselSpacing }}>
            <ControllableCarousel images={carouselImages} />
          </Box>
        )}
      </Section>
    </Box>
  );
}