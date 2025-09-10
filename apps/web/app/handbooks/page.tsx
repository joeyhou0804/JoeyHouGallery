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
          <Section key={i}>
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
              <Box sx={{ position: 'relative', mt: 4, mb: 4 }}>
                {/* Yellow striped background with zigzag borders */}
                <Box
                  sx={(theme) => {
                    const depth = {
                      xs: 6,   // smaller depth on mobile
                      sm: 8,   // medium depth on small screens
                      md: 10,  // original depth on medium+ screens
                    };
                    const steps = 120;

                    return {
                      position: 'absolute',
                      top: '70%', // Start lower, at middle of the carousel images
                      left: '50%',
                      right: '50%',
                      marginLeft: '-50vw',
                      marginRight: '-50vw',
                      width: '100vw', // Full screen width
                      height: '40%', // Shorter height, end higher
                      zIndex: 1, // Behind carousel content
                      
                      // Yellow gradient with stripes (matches MainSection styling)
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

                      // Responsive zigzag top and bottom
                      [theme.breakpoints.up('xs')]: {
                        paddingTop: `${depth.xs}px`,
                        paddingBottom: `${depth.xs}px`,
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
                      [theme.breakpoints.up('sm')]: {
                        paddingTop: `${depth.sm}px`,
                        paddingBottom: `${depth.sm}px`,
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
                      [theme.breakpoints.up('md')]: {
                        paddingTop: `${depth.md}px`,
                        paddingBottom: `${depth.md}px`,
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
                />
                
                {/* ControllableCarousel on top of background */}
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  <ControllableCarousel images={simplifiedExampleImages} />
                </Box>
              </Box>
            )}
          </Section>
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
