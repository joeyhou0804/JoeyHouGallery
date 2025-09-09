"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import TextBlock from '@/components/TextBlock';
import type { PageContent, Section as SectionType } from '@/content/types';
import content from '@/content/applications.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTranslation } from '@/hooks/useTranslation';
import { GlowPillButton } from './GlowPillButton';
import { keyframes } from '@mui/system';

function Intro({ section }: { section: Extract<SectionType, { type: 'intro' }> }) {
  const { t, language } = useTranslation();
  
  // Use translated content for Chinese, original content for English
  const isChineseLang = language === 'zh-CN';
  const title = isChineseLang ? t('pages.applications.stickyarTitle') : section.title;
  const bodyContent = isChineseLang 
    ? t('pages.applications.stickyarDescription') 
    : section.body || [];
  const linkLabel = isChineseLang ? t('pages.applications.githubLabel') : (section.links?.[0]?.label || 'Go to my GitHub');

  return (
    <Stack spacing={3}>
      {/* Rectangle with zigzag borders for the title */}
      <Box sx={{ position: 'relative' }}>
        {/* Capsule with date at the top */}
        <Box
          sx={{
            position: 'absolute',
            top: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            border: '2px solid #BB8F43',
            borderRadius: '20px',
            padding: '4px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            zIndex: 1,
          }}
        >
          <Typography sx={{ color: '#BB8F43', fontSize: '0.9rem', pt: '2px' }}>★</Typography>
          <Typography sx={{ color: '#BB8F43', fontWeight: 'bold', fontSize: '1.2rem', pt: '2px' }}>
            2022.04
          </Typography>
          <Typography sx={{ color: '#BB8F43', fontSize: '0.9rem', pt: '2px' }}>★</Typography>
        </Box>
        
        <Box
        sx={(theme) => {
          const depth = 30; // increased depth for taller zigzags

          // Create zigzag polygon with 2 zigzags on each side (90-degree angles)
          const zigzagPolygon = (() => {
            const pts: string[] = [];
            // Top edge (left to right)
            pts.push('0% 0%', '100% 0%');
            
            // Right edge with 2 zigzags (90-degree angles)
            pts.push('100% 0%');        // start at top-right
            pts.push(`calc(100% - ${depth}px) 25%`);  // in to first zigzag
            pts.push('100% 50%');       // out to middle peak
            pts.push(`calc(100% - ${depth}px) 75%`);  // in to second zigzag
            pts.push('100% 100%');      // out to bottom-right
            
            // Bottom edge (right to left)
            pts.push('100% 100%', '0% 100%');
            
            // Left edge with 2 zigzags (90-degree angles, bottom to top)
            pts.push('0% 100%');        // start at bottom-left
            pts.push(`${depth}px 75%`); // in to first zigzag
            pts.push('0% 50%');         // out to middle peak
            pts.push(`${depth}px 25%`); // in to second zigzag
            pts.push('0% 0%');          // out to top-left
            
            return `polygon(${pts.join(', ')})`;
          })();

          return {
            // Yellow gradient background with stripes
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
            
            position: 'relative',
            padding: 4,
            clipPath: zigzagPolygon,
            margin: 2,
          };
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center',
            color: 'white',
            fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), 0px 0px 1px rgba(0, 0, 0, 0.5)',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }
          }}
        >
          {title}
        </Typography>
        </Box>
      </Box>

      {/* Description text below the zigzag banner */}
      <Box sx={{ px: '30px' }}>
        <Stack spacing={1}>
          {Array.isArray(bodyContent) ? bodyContent.map((p, i) => (
            <Typography 
              key={i}
              sx={{ 
                color: '#432F2F',
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                lineHeight: 1.6,
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              {p}
            </Typography>
          )) : (
            <Typography
              sx={{ 
                color: '#432F2F',
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                lineHeight: 1.6,
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              {bodyContent}
            </Typography>
          )}
        </Stack>
      </Box>

      {section.links?.map((l) => (
        <GlowPillButton
          key={l.href}
          href={l.href}
          sx={{ alignSelf: 'center', width: 'fit-content' }}
        >
          {linkLabel}
        </GlowPillButton>
      ))}

    </Stack>
  );
}

function Gallery({ section, index }: { section: Extract<SectionType, { type: 'gallery' }>, index: number }) {
  const { t, language } = useTranslation();
  
  // Use translated content for Chinese, original content for English
  const isChineseLang = language === 'zh-CN';
  const title = isChineseLang ? t('pages.applications.applicationIdeaTitle') : section.title;
  const body = isChineseLang ? t('pages.applications.applicationIdeaDescription') : section.body;

  // Color gradients for different sections (left to right)
  const gradients = [
    'linear-gradient(to right, #75C5EB, #297BC8)', // Blue gradient
    'linear-gradient(to right, #FF8E65, #FF4582)', // Red/Pink gradient  
    'linear-gradient(to right, #39DE88, #17CACB)', // Green/Teal gradient
  ];
  
  const backgroundGradient = gradients[index] || gradients[0];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        mx: 2,
        mt: index === 0 ? 6 : 1, // Extra margin top for the first gallery section (Application Idea)
      }}
    >
      {/* Yellow striped header section */}
      <Box
        sx={{
          backgroundImage: `
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              rgba(255, 255, 255, 0.3) 8px,
              rgba(255, 255, 255, 0.3) 16px
            ),
            ${backgroundGradient}
          `,
          backgroundRepeat: 'repeat, no-repeat',
          backgroundSize: 'auto, 100% 100%',
          backgroundPosition: 'left top, left top',
          padding: 2,
          margin: '32px 32px 0 32px',
          clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 30px) 25%, 100% 50%, calc(100% - 30px) 75%, 100% 100%, 0% 100%)',
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center',
            color: 'white',
            fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), 0px 0px 1px rgba(0, 0, 0, 0.5)',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Body text section */}
      <Box sx={{ p: 3 }}>
        {body && (
          <Typography
            sx={{ 
              color: '#432F2F',
              fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
              lineHeight: 1.6,
              textAlign: 'center',
              fontWeight: 500,
              mb: 3,
            }}
          >
            {body}
          </Typography>
        )}
        
        {/* Centered image */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {section.images && section.images.length === 1 && (index === 0 || index === 1) ? (
            // Single image centered and larger for Application Idea and High Level Overview
            <Box
              sx={{
                maxWidth: '70%',
                width: 'fit-content',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={section.images[0]}
                alt={title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Box>
          ) : (
            // Regular ImageGrid for other sections
            <ImageGrid images={section.images} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

function ManipulationCarousels({ images }: { images: string[] }) {
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

export default function ApplicationsPage() {
  const data = content as PageContent;
  const introSection = data.sections.find(s => s.type === 'intro') as Extract<SectionType, { type: 'intro' }>;
  const gallerySections = data.sections.filter(s => s.type === 'gallery') as Extract<SectionType, { type: 'gallery' }>[];
  
  return (
    <PageHeader pageKey="applications">
      {/* White section with StickyAR intro and zigzag bottom */}
      <Box
        sx={(theme) => {
          const depth = {
            xs: 6,   // smaller depth on mobile
            sm: 8,   // medium depth on small screens
            md: 10,  // original depth on medium+ screens
          };
          const steps = 120;     // number of teeth * 2

          return {
            backgroundImage: `url(/section_background.png)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'relative',
            zIndex: 5, // Lower z-index than title section
            paddingTop: theme.spacing(4),
            marginBottom: 0,

            // Responsive zigzag bottom
            [theme.breakpoints.up('xs')]: {
              paddingBottom: `calc(${theme.spacing(6)} + ${depth.xs}px)`,
              marginTop: `-${depth.xs}px`,
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
              marginTop: `-${depth.sm}px`,
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
              marginTop: `-${depth.md}px`,
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
        <Section>
          <Intro section={introSection} />
        </Section>
      </Box>

      {gallerySections.map((s, i) => (
        <Section key={i}>
          {s.title === 'Manipulation' ? (
            <>
              <Gallery section={{ ...s, images: [] }} index={i} />
              <ManipulationCarousels images={s.images || []} />
            </>
          ) : (
            <Gallery section={s} index={i} />
          )}
        </Section>
      ))}
    </PageHeader>
  );
}
