"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import PageBackground from '@/components/PageBackground';
import TextBlock from '@/components/TextBlock';
import ColorizedMarioText from '@/components/ColorizedMarioText';
import type { PageContent, Section as SectionType } from '@/content/types';
import content from '@/content/applications.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTranslation } from '@/hooks/useTranslation';

function Intro({ section }: { section: Extract<SectionType, { type: 'intro' }> }) {
  const { t, language } = useTranslation();
  
  // Use translated content for Chinese, original content for English
  const isChineseLang = language === 'zh-CN';
  const title = isChineseLang ? t('pages.applications.stickyarTitle') : section.title;
  const bodyContent = isChineseLang 
    ? t('pages.applications.stickyarDescription') 
    : section.body || [];
  const linkLabel = isChineseLang ? t('pages.applications.githubLabel') : (section.links?.[0]?.label || 'GitHub');

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Stack spacing={1} sx={{ mb: 2 }}>
          {Array.isArray(bodyContent) ? bodyContent.map((p, i) => (
            <Typography key={i}>{p}</Typography>
          )) : (
            <Typography>{bodyContent}</Typography>
          )}
        </Stack>
        {section.links?.map((l) => (
          <Button key={l.href} href={l.href} target="_blank" rel="noreferrer" variant="contained">
            {linkLabel}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

function Gallery({ section }: { section: Extract<SectionType, { type: 'gallery' }> }) {
  const { t, language } = useTranslation();
  
  // Use translated content for Chinese, original content for English
  const isChineseLang = language === 'zh-CN';
  const title = isChineseLang ? t('pages.applications.applicationIdeaTitle') : section.title;
  const body = isChineseLang ? t('pages.applications.applicationIdeaDescription') : section.body;

  return (
    <Stack spacing={2}>
      <TextBlock centered>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        {body && <Typography color="text.secondary">{body}</Typography>}
      </TextBlock>
      <ImageGrid images={section.images} />
    </Stack>
  );
}

export default function ApplicationsPage() {
  const { t, language } = useTranslation();
  const data = content as PageContent;
  
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
            paddingTop: 4,
            // add the visual depth back under your content
            paddingBottom: `calc(${theme.spacing(6)} + ${depth}px)`,
            marginBottom: 0,

            clipPath: zigzagPolygon, // ✅ no self-intersection → no “X”
          };
        }}
      >
        <Section>
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
            <ColorizedMarioText
              text={t(`pages.applications.title`)}
              fontFamily={language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif'}
              fontSize="inherit"
              fontWeight="normal"
              language={language}
            />
          </Typography>
        </Section>
      </Box>


      {/* Content sections with background */}
      {data.sections.map((s, i) => (
        <Section key={i}>{s.type === 'intro' ? <Intro section={s} /> : <Gallery section={s} />}</Section>
      ))}
    </PageBackground>
  );
}
