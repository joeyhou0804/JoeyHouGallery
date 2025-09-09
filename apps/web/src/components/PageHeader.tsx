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
          const depth = {
            xs: 6,   // smaller depth on mobile
            sm: 8,   // medium depth on small screens
            md: 10,  // original depth on medium+ screens
          };
          const steps = 120;     // number of teeth * 2  (keep your ~0.83% spacing)

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
            marginBottom: 0,

            // Responsive zigzag bottom
            [theme.breakpoints.up('xs')]: {
              '--depth': `${depth.xs}px`,
              paddingBottom: `calc(${theme.spacing(3)} + ${depth.xs}px)`,
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
              '--depth': `${depth.sm}px`,
              paddingBottom: `calc(${theme.spacing(3)} + ${depth.sm}px)`,
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
              '--depth': `${depth.md}px`,
              paddingBottom: `calc(${theme.spacing(3)} + ${depth.md}px)`,
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