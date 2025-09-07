"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import TextBlock from '@/components/TextBlock';
import type { PageContent, Section as SectionType } from '@/content/types';
import content from '@/content/applications.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
  const { t } = useTranslation();
  const data = content as PageContent;
  
  return (
    <PageHeader pageKey="applications">
      {data.sections.map((s, i) => (
        <Section key={i}>{s.type === 'intro' ? <Intro section={s} /> : <Gallery section={s} />}</Section>
      ))}
    </PageHeader>
  );
}
