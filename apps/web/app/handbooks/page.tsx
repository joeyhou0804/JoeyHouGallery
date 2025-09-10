"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import TextBlock from '@/components/TextBlock';
import MainSection from '@/components/MainSection';
import type { PageContent } from '@/content/types';
import content from '@/content/handbooks.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { GlowPillButton } from '../applications/GlowPillButton';

// SubSection Component: For download sections with white container and gradient title
function SubSection({ section, year }: { section: Extract<any, { type: 'intro' }>, year: string }) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        mx: 2,
        mt: 6,
      }}
    >
      {/* Title section with gradient and zigzag */}
      <Box sx={{ position: 'relative' }}>
        {/* Capsule with year at the top */}
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            border: '2px solid #DFBF23',
            borderRadius: '20px',
            padding: '4px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            zIndex: 1,
          }}
        >
          <Typography sx={{ color: '#DFBF23', fontSize: '0.9rem', pt: '2px' }}>★</Typography>
          <Typography sx={{ color: '#DFBF23', fontWeight: 'bold', fontSize: '1.2rem', pt: '2px' }}>
            {year}
          </Typography>
          <Typography sx={{ color: '#DFBF23', fontSize: '0.9rem', pt: '2px' }}>★</Typography>
        </Box>

        {/* Gradient title background with zigzag */}
        <Box
          sx={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 8px,
                rgba(255, 255, 255, 0.3) 8px,
                rgba(255, 255, 255, 0.3) 16px
              ),
              linear-gradient(to right, #DFBF23, #F5D76E)
            `,
            backgroundRepeat: 'repeat, no-repeat',
            backgroundSize: 'auto, 100% 100%',
            backgroundPosition: 'left top, left top',
            padding: 2,
            margin: '32px 32px 0 32px',
            clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 30px) 25%, 100% 50%, calc(100% - 30px) 75%, 100% 100%, 0% 100%)',
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Mario, sans-serif',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), 0px 0px 1px rgba(0, 0, 0, 0.5)',
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
            }}
          >
            {section.title}
          </Typography>
        </Box>
      </Box>

      {/* Body content with buttons */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
          {section.links?.map((l: any) => (
            <GlowPillButton
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
            >
              {l.label}
            </GlowPillButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// SectionBackground Component: Section background with responsive zigzag
function SectionBackground({ children, isFirst = false }: { children: React.ReactNode; isFirst?: boolean }) {
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

          // Responsive zigzag top and bottom
          [theme.breakpoints.up('xs')]: {
            paddingTop: isFirst ? `calc(${theme.spacing(4)} + ${depth.xs + 40}px)` : `calc(${theme.spacing(4)} + ${depth.xs}px)`,
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
          [theme.breakpoints.up('sm')]: {
            paddingTop: isFirst ? `calc(${theme.spacing(4)} + ${depth.sm + 40}px)` : `calc(${theme.spacing(4)} + ${depth.sm}px)`,
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
          [theme.breakpoints.up('md')]: {
            paddingTop: isFirst ? `calc(${theme.spacing(4)} + ${depth.md + 40}px)` : `calc(${theme.spacing(4)} + ${depth.md}px)`,
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
      {children}
    </Box>
  );
}

export default function HandbooksPage() {
  const data = content as PageContent;
  return (
    <PageHeader pageKey="handbooks">
      {data.sections.map((s, i) => (
        s.type === 'intro' && i === 0 ? (
          <SectionBackground key={i} isFirst={i === 0}>
            <Section>
              <MainSection section={s} time="2019‑2025" />
            </Section>
          </SectionBackground>
        ) : s.type === 'intro' && s.title === 'Simplified Chinese Version' ? (
          <Section key={i}>
            <SubSection section={s} year="2019" />
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
