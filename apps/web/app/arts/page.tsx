"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import type { PageContent } from '@/content/types';
import content from '@/content/arts.json';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTranslation } from '@/hooks/useTranslation';


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
              <MainSection section={s} time={s.time} />
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
