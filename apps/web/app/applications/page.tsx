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
      <MainSection section={introSection} backgroundType="bottom-only" />

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