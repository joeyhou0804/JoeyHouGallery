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
        sx={{
          backgroundColor: '#87CEEB', // Light blue
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            rgba(255, 255, 255, 0.3) 8px,
            rgba(255, 255, 255, 0.3) 16px
          )`,
          position: 'relative',
          paddingTop: 4,
          paddingBottom: 6,
          marginBottom: 0,
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
        
        {/* Zigzag bottom border */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10px',
            left: 0,
            right: 0,
            height: '10px',
            overflow: 'visible',
          }}
        >
          <svg
            width="100%"
            height="20"
            viewBox="0 0 120 20"
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <polygon
              points="0,0 1,10 2,0 3,10 4,0 5,10 6,0 7,10 8,0 9,10 10,0 11,10 12,0 13,10 14,0 15,10 16,0 17,10 18,0 19,10 20,0 21,10 22,0 23,10 24,0 25,10 26,0 27,10 28,0 29,10 30,0 31,10 32,0 33,10 34,0 35,10 36,0 37,10 38,0 39,10 40,0 41,10 42,0 43,10 44,0 45,10 46,0 47,10 48,0 49,10 50,0 51,10 52,0 53,10 54,0 55,10 56,0 57,10 58,0 59,10 60,0 61,10 62,0 63,10 64,0 65,10 66,0 67,10 68,0 69,10 70,0 71,10 72,0 73,10 74,0 75,10 76,0 77,10 78,0 79,10 80,0 81,10 82,0 83,10 84,0 85,10 86,0 87,10 88,0 89,10 90,0 91,10 92,0 93,10 94,0 95,10 96,0 97,10 98,0 99,10 100,0 101,10 102,0 103,10 104,0 105,10 106,0 107,10 108,0 109,10 110,0 111,10 112,0 113,10 114,0 115,10 116,0 117,10 118,0 119,10 120,0 120,0 0,0"
              fill="#87CEEB"
            />
          </svg>
        </Box>
      </Box>

      {/* Content sections with background */}
      {data.sections.map((s, i) => (
        <Section key={i}>{s.type === 'intro' ? <Intro section={s} /> : <Gallery section={s} />}</Section>
      ))}
    </PageBackground>
  );
}
