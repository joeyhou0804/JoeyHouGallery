"use client";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Section from './Section';
import PageBackground from './PageBackground';
import { useTranslation } from '@/hooks/useTranslation';
import ColorizedMarioText from './ColorizedMarioText';

interface PageHeaderProps {
  pageKey: 'applications' | 'arts' | 'handbooks' | 'posters' | 'reports' | 'videos' | 'websites';
  children?: React.ReactNode;
}

export default function PageHeader({ pageKey, children }: PageHeaderProps) {
  const { t, language } = useTranslation();
  
  return (
    <PageBackground>
      {/* Light blue section with title and zigzag bottom */}
      <Box
        sx={(theme) => {
          const depth = 10;      // zigzag tip depth in px
          const steps = 120;     // number of teeth * 2  (keep your ~0.83% spacing)

          // Build a NON-intersecting polygon: clockwise around the shape.
          const zigzagPolygon = (() => {
            const pts: string[] = [];
            // top edge (L → R)
            pts.push('0% 0%', '100% 0%');
            // drop to the inner bottom line at right
            pts.push(`100% calc(100% - ${depth}px)`);
            // walk left creating the teeth (R → L)
            for (let i = steps; i >= 0; i--) {
              const x = (i / steps) * 100;
              const isPeak = i % 2 === 0; // peak = outer bottom edge
              const y = isPeak ? '100%' : `calc(100% - ${depth}px)`;
              pts.push(`${x.toFixed(2)}% ${y}`);
            }
            // close up the left inner corner
            pts.push(`0% calc(100% - ${depth}px)`);
            return `polygon(${pts.join(', ')})`;
          })();

          return {
            // one background, so no phase/mismatch issues
            '--stripe': `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              rgba(255, 255, 255, 0.3) 8px,
              rgba(255, 255, 255, 0.3) 16px
            )`,
            '--sky': 'linear-gradient(to bottom, #6BB6E0, #87CEEB)',
            backgroundImage: 'var(--stripe), var(--sky)',
            backgroundRepeat: 'repeat, no-repeat',
            backgroundSize: 'auto, 100% 100%',
            backgroundPosition: 'left top, left top',

            position: 'relative',
            zIndex: 10, // Ensure title section appears above white section
            paddingTop: 2,
            // add the visual depth back under your content
            paddingBottom: `calc(${theme.spacing(3)} + ${depth}px)`,
            marginBottom: 0,

            clipPath: zigzagPolygon, // ✅ no self-intersection → no "X"
          };
        }}
      >
        <Section>
          <Typography 
            variant="h1" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              color: 'white',
              fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), 0px 0px 1px rgba(0, 0, 0, 0.5)',
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem' }
            }}
          >
            {t(`pages.${pageKey}.title`)}
          </Typography>
        </Section>
      </Box>

      {children}
    </PageBackground>
  );
}