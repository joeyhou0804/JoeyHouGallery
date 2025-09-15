"use client";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import ImageGrid from '@/components/ImageGrid';
import CloudImage from '@/components/CloudImage';
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, useState, useRef } from 'react';
import type { Section as SectionType } from '@/content/types';

// SubsectionTitle Component: Colored gradient backgrounds for subsection titles with optional year capsule
function SubsectionTitle({ 
  title, 
  language, 
  colorIndex, 
  year,
  customGradient 
}: { 
  title: string; 
  language: string; 
  colorIndex: number;
  year?: string;
  customGradient?: string;
}) {
  // Color gradients for different sections (left to right)
  const gradients = [
    'linear-gradient(to right, #75C5EB, #297BC8)', // Blue gradient
    'linear-gradient(to right, #FF8E65, #FF4582)', // Red/Pink gradient  
    'linear-gradient(to right, #39DE88, #17CACB)', // Green/Teal gradient
  ];
  
  const backgroundGradient = customGradient || gradients[colorIndex] || gradients[0];
  
  // Extract right side color from gradient for capsule border
  const rightColor = (() => {
    const match = backgroundGradient?.match(/#[A-Fa-f0-9]{6}(?![A-Fa-f0-9])/g);
    return match ? match[match.length - 1] : '#297BC8'; // fallback to blue
  })();

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Year capsule */}
      {year && (
        <Box
          sx={{
            position: 'absolute',
            top: -18,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            border: `2px solid ${rightColor}`,
            borderRadius: '20px',
            padding: '4px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            zIndex: 1,
          }}
        >
          <Typography sx={{ color: rightColor, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, pt: '2px' }}>★</Typography>
          <Typography sx={{ color: rightColor, fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' }, pt: '2px' }}>
            {year}
          </Typography>
          <Typography sx={{ color: rightColor, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, pt: '2px' }}>★</Typography>
        </Box>
      )}

      {/* Title background */}
      <Box
        sx={(theme) => {
          const depth = {
            xs: 12,   // smaller depth on mobile
            sm: 14,   // medium depth on small screens
            md: 16,   // original depth on medium+ screens
          };

          return {
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
            padding: year ? '32px 16px 16px 16px' : 2, // Add extra padding when capsule is present
            marginTop: year ? '32px' : 0,
            marginBottom: 0, // Fixed bottom margin

            // Responsive margins and zigzag pattern
            [theme.breakpoints.up('xs')]: {
              marginTop: year ? '32px' : '16px',
              marginLeft: '16px',
              marginRight: '16px',
              clipPath: `polygon(0% 0%, 100% 0%, calc(100% - ${depth.xs}px) 25%, 100% 50%, calc(100% - ${depth.xs}px) 75%, 100% 100%, 0% 100%)`,
            },
            [theme.breakpoints.up('sm')]: {
              marginTop: year ? '32px' : '24px',
              marginLeft: '24px',
              marginRight: '24px',
              clipPath: `polygon(0% 0%, 100% 0%, calc(100% - ${depth.sm}px) 25%, 100% 50%, calc(100% - ${depth.sm}px) 75%, 100% 100%, 0% 100%)`,
            },
            [theme.breakpoints.up('md')]: {
              marginTop: year ? '32px' : '32px',
              marginLeft: '32px',
              marginRight: '32px',
              clipPath: `polygon(0% 0%, 100% 0%, calc(100% - ${depth.md}px) 25%, 100% 50%, calc(100% - ${depth.md}px) 75%, 100% 100%, 0% 100%)`,
            },
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
            fontSize: { xs: '1.2rem', sm: '1.6rem', md: '2.8rem', lg: '2.8rem' }
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

// SubsectionBox Component: White box container with title, text and images
export default function SubsectionBox({
  section,
  index,
  year,
  customGradient,
  children,
  title: customTitle,
  imageLayout = 'default',
  hideImages = false,
  sx
}: {
  section: Extract<SectionType, { type: 'gallery' }> | any,
  index: number,
  year?: string,
  customGradient?: string,
  children?: React.ReactNode,
  title?: string,
  imageLayout?: 'default' | 'centered-single' | 'centered-stacked',
  hideImages?: boolean,
  sx?: any
}) {
  const { t, language } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use custom title or the section title
  const title = customTitle || section.title;
  const body = section.body;

  // Fade-in + move-up when the *top* reaches 10% from the bottom of the viewport
  useEffect(() => {
    const node = containerRef.current;
    if (!node || hasAnimated) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    let timeoutId: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // stagger by index for a cascading effect
          timeoutId = window.setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, index * 100);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0,
        // Shrink only the bottom by 10% so it fires as soon as the element's top crosses that line.
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
      ref={containerRef}
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        mt: index === 0 ? 6 : 1, // Extra margin top for the first gallery section (Application Idea)
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, opacity',
        ...sx,
      }}
    >
      {/* SubsectionTitle */}
      <SubsectionTitle 
        title={title} 
        language={language} 
        colorIndex={index} 
        year={year}
        customGradient={customGradient}
      />

      {/* Body content section */}
      <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
        {/* Custom children content (like buttons) */}
        {children && (
          <Box sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {children}
          </Box>
        )}
        
        {/* Default body text only if no images */}
        {body && !children && !section.images && (
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
        
        {/* Images */}
        {section.images && !children && !hideImages && (
          <Box sx={{ mx: { md: '8px' } }}>
            {imageLayout === 'centered-stacked' ? (
              // Two images stacked vertically, centered
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                {section.images.map((src: string, imgIndex: number) => (
                  <Box key={imgIndex} sx={{ width: '100%' }}>
                    <Card>
                      <CloudImage src={src} alt={`${title} - ${imgIndex + 1}`} />
                    </Card>
                  </Box>
                ))}
              </Box>
            ) : imageLayout === 'centered-single' ? (
              // Single image centered
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%' }}>
                  <Card>
                    <CloudImage src={section.images[0]} alt={title} />
                  </Card>
                </Box>
              </Box>
            ) : (
              // Default layout
              <Box>
                {section.images.length === 1 && (index === 0 || index === 1) ? (
                  // Single image centered and larger for Application Idea and High Level Overview
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
            )}
          </Box>
        )}

        {/* Body text below images if it exists */}
        {section.images && !children && !hideImages && (
          <>
            {body && (
              <Box sx={{ mt: 3 }}>
                {Array.isArray(body) ? (
                  <>
                    {/* On xs screens, combine all paragraphs into one */}
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                      <Typography 
                        sx={{ 
                          color: '#432F2F',
                          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                          lineHeight: 1.6,
                          textAlign: 'center',
                          fontWeight: 500,
                        }}
                      >
                        {body.join(' ')}
                      </Typography>
                    </Box>
                    {/* On sm+ screens, keep separate paragraphs */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <Stack spacing={1}>
                        {body.map((p, i) => (
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
                        ))}
                      </Stack>
                    </Box>
                  </>
                ) : (
                  <Typography
                    sx={{ 
                      color: '#432F2F',
                      fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                      lineHeight: 1.6,
                      textAlign: 'center',
                      fontWeight: 500,
                    }}
                  >
                    {body}
                  </Typography>
                )}
              </Box>
            )}
          </>
        )}

        {/* Body text without images */}
        {body && (!section.images || hideImages) && !children && (
          <Box>
            {Array.isArray(body) ? (
              <>
                {/* On xs screens, combine all paragraphs into one */}
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  <Typography 
                    sx={{ 
                      color: '#432F2F',
                      fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                      lineHeight: 1.6,
                      textAlign: 'center',
                      fontWeight: 500,
                    }}
                  >
                    {body.join(' ')}
                  </Typography>
                </Box>
                {/* On sm+ screens, keep separate paragraphs */}
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Stack spacing={1}>
                    {body.map((p, i) => (
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
                    ))}
                  </Stack>
                </Box>
              </>
            ) : (
              <Typography
                sx={{ 
                  color: '#432F2F',
                  fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                  lineHeight: 1.6,
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                {body}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
