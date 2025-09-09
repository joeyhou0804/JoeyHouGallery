"use client";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageGrid from '@/components/ImageGrid';
import { useTranslation } from '@/hooks/useTranslation';
import type { Section as SectionType } from '@/content/types';

// SubsectionTitle Component: Colored gradient backgrounds for subsection titles  
function SubsectionTitle({ title, language, colorIndex }: { title: string; language: string; colorIndex: number }) {
  // Color gradients for different sections (left to right)
  const gradients = [
    'linear-gradient(to right, #75C5EB, #297BC8)', // Blue gradient
    'linear-gradient(to right, #FF8E65, #FF4582)', // Red/Pink gradient  
    'linear-gradient(to right, #39DE88, #17CACB)', // Green/Teal gradient
  ];
  
  const backgroundGradient = gradients[colorIndex] || gradients[0];

  return (
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
  );
}

// Subsection Component: White box container with title, text and images
export default function Subsection({ section, index }: { section: Extract<SectionType, { type: 'gallery' }>, index: number }) {
  const { t, language } = useTranslation();
  
  // Use translated content for Chinese, original content for English
  const isChineseLang = language === 'zh-CN';
  const title = isChineseLang ? t('pages.applications.applicationIdeaTitle') : section.title;
  const body = isChineseLang ? t('pages.applications.applicationIdeaDescription') : section.body;

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
      {/* SubsectionTitle */}
      <SubsectionTitle title={title} language={language} colorIndex={index} />

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