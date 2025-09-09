"use client";

import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import Subsection from '@/components/Subsection';
import Carousel from '@/components/Carousel';
import type { PageContent, Section as SectionType } from '@/content/types';
import content from '@/content/applications.json';
import Box from '@mui/material/Box';

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
          <MainSection section={introSection} />
        </Section>
      </Box>

      {gallerySections.map((s, i) => (
        <Section key={i}>
          {s.title === 'Manipulation' ? (
            <>
              <Subsection section={{ ...s, images: [] }} index={i} />
              <Carousel images={s.images || []} />
            </>
          ) : (
            <Subsection section={s} index={i} />
          )}
        </Section>
      ))}
    </PageHeader>
  );
}