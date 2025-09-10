"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import TextBlock from '@/components/TextBlock';
import MainSection from '@/components/MainSection';
import Subsection from '@/components/Subsection';
import type { PageContent } from '@/content/types';
import content from '@/content/handbooks.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { GlowPillButton } from '../applications/GlowPillButton';
import ControllableCarousel from '@/components/ControllableCarousel';

export default function HandbooksPage() {
  const data = content as PageContent;
  
  // Get images from "Page Examples — Simplified" section and reorder to: 0, 2, 3, 4, 5, 1, 6
  const simplifiedGallerySection = data.sections
    .find(s => s.title === 'Page Examples — Simplified' && s.type === 'gallery') as Extract<typeof data.sections[0], { type: 'gallery' }>;
  const simplifiedOriginalImages = simplifiedGallerySection?.images || [];
  
  const simplifiedExampleImages = simplifiedOriginalImages.length >= 7 
    ? [
        simplifiedOriginalImages[0], // 0
        simplifiedOriginalImages[2], // 2
        simplifiedOriginalImages[3], // 3
        simplifiedOriginalImages[4], // 4
        simplifiedOriginalImages[5], // 5
        simplifiedOriginalImages[1], // 1 (moved to second-to-last)
        simplifiedOriginalImages[6]  // 6
      ].filter(Boolean) as string[] // Remove any undefined values
    : [...simplifiedOriginalImages]; // fallback to original order if less than 7 images

  // Get images from "Page Examples — Traditional" section for carousel
  const traditionalGallerySection = data.sections
    .find(s => s.title === 'Page Examples — Traditional' && s.type === 'gallery') as Extract<typeof data.sections[0], { type: 'gallery' }>;
  const traditionalExampleImages = traditionalGallerySection?.images || [];

  // Get images from "Page Examples — English" section for carousel
  const englishGallerySection = data.sections
    .find(s => s.title === 'Page Examples — English' && s.type === 'gallery') as Extract<typeof data.sections[0], { type: 'gallery' }>;
  const englishExampleImages = englishGallerySection?.images || [];
  
  // Get typed sections for proper TypeScript support
  const simplifiedSection = data.sections.find(s => s.title === 'Simplified Chinese Version' && s.type === 'intro') as Extract<typeof data.sections[0], { type: 'intro' }>;
  const englishSection = data.sections.find(s => s.title === 'English Version' && s.type === 'intro') as Extract<typeof data.sections[0], { type: 'intro' }>;
  const traditionalSection = data.sections.find(s => s.title === 'Traditional Chinese Version' && s.type === 'intro') as Extract<typeof data.sections[0], { type: 'intro' }>;
  const admissionSection = data.sections.find(s => s.type === 'intro' && s.title === 'Admission‑pedia') as Extract<typeof data.sections[0], { type: 'intro' }>;

  // Custom order array for Subsection components
  const customOrder = [
    // 1. Simplified Chinese Version (first)
    <Subsection 
      key="simplified-1"
      section={simplifiedSection} 
      index={0} 
      year="2019"
      title="Simplified Chinese Version"
      carouselImages={simplifiedExampleImages}
      carouselSpacing={6}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
        {simplifiedSection?.links?.map((l: any) => (
          <GlowPillButton
            key={l.href}
            href={l.href}
            rel="noreferrer"
          >
            {l.label}
          </GlowPillButton>
        ))}
      </Stack>
    </Subsection>,

    // 2. English Version
    <Subsection 
      key="english"
      section={englishSection} 
      index={2} 
      year="2019"
      title="English Version"
      backgroundImage="/subsection_background_3.png"
      carouselImages={englishExampleImages}
      carouselSpacing={6}
    >
      <Box sx={{ textAlign: 'center' }}>
        {englishSection?.links?.[0] && (
          <GlowPillButton
            href={englishSection.links[0].href}
            rel="noreferrer"
          >
            Download Volume of CityU
          </GlowPillButton>
        )}
      </Box>
    </Subsection>,

    // 3. Traditional Chinese Version
    <Subsection 
      key="traditional"
      section={traditionalSection} 
      index={1} 
      year="2019"
      title="Traditional Chinese Version"
      backgroundImage="/subsection_background_2.png"
      carouselImages={traditionalExampleImages}
      carouselSpacing={6}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
        {traditionalSection?.links?.map((l: any) => (
          <GlowPillButton
            key={l.href}
            href={l.href}
            rel="noreferrer"
          >
            {l.label}
          </GlowPillButton>
        ))}
      </Stack>
    </Subsection>,

    // 4. Simplified Chinese Version (second copy)
    <Subsection 
      key="simplified-2"
      section={simplifiedSection} 
      index={0} 
      year="2019"
      title="Simplified Chinese Version"
      carouselImages={simplifiedExampleImages}
      carouselSpacing={6}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
        {simplifiedSection?.links?.map((l: any) => (
          <GlowPillButton
            key={l.href}
            href={l.href}
            rel="noreferrer"
          >
            {l.label}
          </GlowPillButton>
        ))}
      </Stack>
    </Subsection>
  ];

  return (
    <PageHeader pageKey="handbooks">
      {/* MainSection for Admission-pedia */}
      <MainSection 
        section={admissionSection} 
        time="2019‑2025" 
        isFirst={true} 
      />
      
      {/* Custom ordered Subsection components */}
      {customOrder}
      
      {/* Remaining sections (Music Tutorial, etc.) */}
      {data.sections
        .filter(s => 
          s.title !== 'Admission‑pedia' && 
          s.title !== 'Simplified Chinese Version' && 
          s.title !== 'Traditional Chinese Version' && 
          s.title !== 'English Version' &&
          s.title !== 'Page Examples — Simplified' && 
          s.title !== 'Page Examples — Traditional' && 
          s.title !== 'Page Examples — English'
        )
        .map((s, i) => (
          <Section key={i}>
            {s.type === 'intro' ? (
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {s.title}
                  </Typography>
                  {Array.isArray(s.body) && (
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      {s.body.map((p, idx) => (
                        <Typography key={idx}>{p}</Typography>
                      ))}
                    </Stack>
                  )}
                  {s.links?.map((l) => (
                    <Button key={l.href} href={l.href} target="_blank" rel="noreferrer" sx={{ mr: 1 }} variant="contained">
                      {l.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <>
                <TextBlock centered>
                  <Typography variant="h5" gutterBottom>
                    {s.title}
                  </Typography>
                  {'body' in s && s.body && (
                    <Typography variant="body1" color="text.secondary">
                      {s.body as any}
                    </Typography>
                  )}
                </TextBlock>
                <ImageGrid images={(s as any).images} />
              </>
            )}
          </Section>
        ))}
    </PageHeader>
  );
}
