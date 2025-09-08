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
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
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

function Gallery({ section }: { section: Extract<SectionType, { type: 'gallery' }> }) {
  const { t, language } = useTranslation();
  
  // Use translated content for Chinese, original content for English
  const isChineseLang = language === 'zh-CN';
  const title = isChineseLang ? t('pages.applications.applicationIdeaTitle') : section.title;
  const body = isChineseLang ? t('pages.applications.applicationIdeaDescription') : section.body;

  return (
    <Stack spacing={2}>
      <TextBlock centered>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        {body && <Typography color="text.secondary">{body}</Typography>}
      </TextBlock>
      <ImageGrid images={section.images} />
    </Stack>
  );
}

export default function ApplicationsPage() {
  const data = content as PageContent;
  
  return (
    <PageHeader pageKey="applications">
      {data.sections.map((s, i) => (
        <Section key={i}>{s.type === 'intro' ? <Intro section={s} /> : <Gallery section={s} />}</Section>
      ))}
    </PageHeader>
  );
}
