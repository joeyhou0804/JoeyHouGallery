"use client";

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useTranslation } from '@/hooks/useTranslation';
import type { Section as SectionType } from '@/content/types';
import { GlowPillButton } from '../../app/apps/GlowPillButton';
import ControllableCarousel from './ControllableCarousel';
import Section from './Section';

// MainSection Component: Contains section title, text content, and buttons with background
export default function MainSection({ 
  section, 
  time, 
  isFirst = true, 
  backgroundType = 'full',
  extraTopPadding = 0
}: { 
  section: Extract<SectionType, { type: 'intro' }>, 
  time?: string, 
  isFirst?: boolean,
  backgroundType?: 'full' | 'bottom-only',
  extraTopPadding?: number
}) {
  const { t, language } = useTranslation();
  
  // Use translated content for Chinese, original content for English
  const isChineseLang = language === 'zh-CN';
  const title = isChineseLang ? t('pages.applications.stickyarTitle') : section.title;
  const bodyContent = isChineseLang 
    ? t('pages.applications.stickyarDescription') 
    : section.body || [];
  const linkLabel = isChineseLang ? t('pages.applications.githubLabel') : (section.links?.[0]?.label || 'Go to my GitHub');

  return (
    <Box
      sx={(theme) => {
        const depth = {
          xs: 6,   // smaller depth on mobile
          sm: 8,   // medium depth on small screens
          md: 10,  // original depth on medium+ screens
        };
        const steps = 120;     // number of teeth * 2

        return {
          backgroundImage: `url(/backgrounds/section_background.png)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          position: 'relative',
          zIndex: 5, // Lower z-index than title section
          paddingTop: `calc(${theme.spacing(4)} + ${extraTopPadding}px)`,
          marginBottom: 0,

          // Responsive zigzag configuration
          [theme.breakpoints.up('xs')]: backgroundType === 'bottom-only' ? {
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
          } : {
            paddingTop: isFirst ? `calc(${theme.spacing(4)} + ${depth.xs + 40 + extraTopPadding}px)` : `calc(${theme.spacing(4)} + ${depth.xs + extraTopPadding}px)`,
            paddingBottom: `calc(${theme.spacing(6)} + ${depth.xs}px)`,
            marginTop: isFirst ? `-${depth.xs + 40}px` : `-${depth.xs}px`,
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
          [theme.breakpoints.up('sm')]: backgroundType === 'bottom-only' ? {
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
          } : {
            paddingTop: isFirst ? `calc(${theme.spacing(4)} + ${depth.sm + 40 + extraTopPadding}px)` : `calc(${theme.spacing(4)} + ${depth.sm + extraTopPadding}px)`,
            paddingBottom: `calc(${theme.spacing(6)} + ${depth.sm}px)`,
            marginTop: isFirst ? `-${depth.sm + 40}px` : `-${depth.sm}px`,
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
          [theme.breakpoints.up('md')]: backgroundType === 'bottom-only' ? {
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
          } : {
            paddingTop: isFirst ? `calc(${theme.spacing(4)} + ${depth.md + 40 + extraTopPadding}px)` : `calc(${theme.spacing(4)} + ${depth.md + extraTopPadding}px)`,
            paddingBottom: `calc(${theme.spacing(6)} + ${depth.md}px)`,
            marginTop: isFirst ? `-${depth.md + 40}px` : `-${depth.md}px`,
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
    >
      <Section>
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
                {time || '2022.04'}
              </Typography>
              <Typography sx={{ color: '#BB8F43', fontSize: '0.9rem', pt: '2px' }}>★</Typography>
            </Box>
        
        <Box
        sx={(theme) => {
          const depth = 30; // increased depth for taller zigzags
          const hasMultipleLines = title.includes('&');
          const zigzagCount = hasMultipleLines ? 3 : 2; // 3 zigzags for multi-line, 2 for single line

          // Create zigzag polygon with dynamic zigzag count (90-degree angles)
          const zigzagPolygon = (() => {
            const pts: string[] = [];
            // Top edge (left to right)
            pts.push('0% 0%', '100% 0%');
            
            // Right edge with dynamic zigzags (90-degree angles)
            pts.push('100% 0%');        // start at top-right
            if (zigzagCount === 2) {
              // 2 zigzags: 25%, 50%, 75%
              pts.push(`calc(100% - ${depth}px) 25%`);  // in to first zigzag
              pts.push('100% 50%');       // out to middle peak
              pts.push(`calc(100% - ${depth}px) 75%`);  // in to second zigzag
            } else if (zigzagCount === 3) {
              // 3 zigzags evenly distributed: 16.67%, 33.33%, 50%, 66.67%, 83.33%
              pts.push(`calc(100% - ${depth}px) 16.67%`);  // in to first zigzag
              pts.push('100% 33.33%');       // out to first peak
              pts.push(`calc(100% - ${depth}px) 50%`);  // in to second zigzag
              pts.push('100% 66.67%');       // out to second peak
              pts.push(`calc(100% - ${depth}px) 83.33%`);  // in to third zigzag
            }
            pts.push('100% 100%');      // end at bottom-right
            
            // Bottom edge (right to left)
            pts.push('100% 100%', '0% 100%');
            
            // Left edge with dynamic zigzags (90-degree angles, bottom to top)
            pts.push('0% 100%');        // start at bottom-left
            if (zigzagCount === 2) {
              // 2 zigzags: 75%, 50%, 25%
              pts.push(`${depth}px 75%`); // in to first zigzag
              pts.push('0% 50%');         // out to middle peak
              pts.push(`${depth}px 25%`); // in to second zigzag
            } else if (zigzagCount === 3) {
              // 3 zigzags evenly distributed: 83.33%, 66.67%, 50%, 33.33%, 16.67%
              pts.push(`${depth}px 83.33%`); // in to third zigzag
              pts.push('0% 66.67%');         // out to second peak
              pts.push(`${depth}px 50%`); // in to second zigzag
              pts.push('0% 33.33%');         // out to first peak
              pts.push(`${depth}px 16.67%`); // in to first zigzag
            }
            pts.push('0% 0%');          // end at top-left
            
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
          {title.includes('&') ? (
            <>
              {title.split('&')[0]?.trim()}
              <br />
              & {title.split('&')[1]?.trim()}
            </>
          ) : (
            title
          )}
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

          {/* Display carousel if images are provided */}
          {(section as any).images && (section as any).images.length > 0 && (
            <ControllableCarousel images={(section as any).images} />
          )}

        </Stack>
      </Section>
    </Box>
  );
}