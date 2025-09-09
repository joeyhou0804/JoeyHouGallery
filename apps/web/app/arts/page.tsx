"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import type { PageContent } from '@/content/types';
import content from '@/content/arts.json';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTranslation } from '@/hooks/useTranslation';

// SectionTitle Component: Yellow striped background for section titles with date capsule
function SectionTitle({ title, language, time }: { title: string; language: string; time?: string }) {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* Capsule with date at the top */}
      {time && (
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
            {time}
          </Typography>
          <Typography sx={{ color: '#BB8F43', fontSize: '0.9rem', pt: '2px' }}>★</Typography>
        </Box>
      )}
      
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
              {title.split('&')[0].trim()}
              <br />
              & {title.split('&')[1].trim()}
            </>
          ) : (
            title
          )}
        </Typography>
      </Box>
    </Box>
  );
}

// SectionBackground Component: Section background with responsive zigzag
function SectionBackground({ children }: { children: React.ReactNode }) {
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
      {children}
    </Box>
  );
}

export default function ArtsPage() {
  const data = content as PageContent;
  const { language } = useTranslation();
  
  return (
    <PageHeader pageKey="arts">
      {data.sections.map((s, i) => (
        s.type === 'intro' ? (
          <SectionBackground key={i}>
            <Section>
              <Stack spacing={3}>
                {/* SectionTitle with yellow background and date capsule */}
                <SectionTitle title={s.title} language={language} time={s.time} />
                
                {/* Body content with exact applications page styling */}
                <Box sx={{ px: '30px' }}>
                  <Stack spacing={1}>
                    {Array.isArray(s.body) ? s.body.map((p, idx) => (
                      <Typography 
                        key={idx} 
                        sx={{
                          color: 'white',
                          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                          lineHeight: 1.6,
                          textAlign: 'center',
                          fontWeight: 500,
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {p}
                      </Typography>
                    )) : s.body ? (
                      <Typography 
                        sx={{
                          color: 'white',
                          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                          lineHeight: 1.6,
                          textAlign: 'center',
                          fontWeight: 500,
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {s.body}
                      </Typography>
                    ) : null}
                  </Stack>
                </Box>
              </Stack>
            </Section>
          </SectionBackground>
        ) : (
          <Section key={i}>
            {s.title ? (
              <>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography 
                    variant="h4" 
                    sx={{
                      color: 'white',
                      fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), 0px 0px 1px rgba(0, 0, 0, 0.5)',
                      fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                      mb: 2,
                    }}
                  >
                    {s.title}
                  </Typography>
                </Box>
                <ImageGrid images={(s as any).images} />
              </>
            ) : (
              <ImageGrid images={(s as any).images} />
            )}
          </Section>
        )
      ))}
    </PageHeader>
  );
}
