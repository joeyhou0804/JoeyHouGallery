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
  const originalImages = data.sections
    .find(s => s.title === 'Page Examples — Simplified')?.images || [];
  
  const simplifiedExampleImages = originalImages.length >= 7 
    ? [
        originalImages[0], // 0
        originalImages[2], // 2
        originalImages[3], // 3
        originalImages[4], // 4
        originalImages[5], // 5
        originalImages[1], // 1 (moved to second-to-last)
        originalImages[6]  // 6
      ]
    : [...originalImages]; // fallback to original order if less than 7 images
  
  return (
    <PageHeader pageKey="handbooks">
      {data.sections
        .filter(s => s.title !== 'Page Examples — Simplified') // Exclude this section as images are now in Subsection
        .map((s, i) => (
        s.type === 'intro' && i === 0 ? (
          <MainSection key={i} section={s} time="2019‑2025" isFirst={i === 0} />
        ) : s.type === 'intro' && s.title === 'Simplified Chinese Version' ? (
          <Box 
            sx={(theme) => {
              const depth = {
                xs: 6,   // smaller depth on mobile
                sm: 8,   // medium depth on small screens
                md: 10,  // original depth on medium+ screens
              };
              const steps = 120;

              return {
                backgroundImage: 'url(/subsection_background_1.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                position: 'relative',
                marginTop: '-40px', // Move whole part up 40px to overlap MainSection zigzags
                paddingTop: '40px', // Add padding to compensate for content position
                
                // Responsive zigzag bottom (matching MainSection pattern)
                [theme.breakpoints.up('xs')]: {
                  paddingBottom: `calc(${theme.spacing(6)} + ${depth.xs}px)`,
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
            <Section key={i} sx={{ mt: 5 }}> {/* Move content down 40px */}
              <Subsection 
                section={s} 
                index={0} 
                year="2019"
                title={s.title}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
                  {s.links?.map((l: any) => (
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
              
              {simplifiedExampleImages.length > 0 && (
                <ControllableCarousel images={simplifiedExampleImages} />
              )}
            </Section>
          </Box>
        ) : (
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
        )
      ))}
    </PageHeader>
  );
}
