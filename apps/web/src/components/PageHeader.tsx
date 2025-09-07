"use client";

import Typography from '@mui/material/Typography';
import Section from './Section';
import PageBackground from './PageBackground';
import { useTranslation } from '@/hooks/useTranslation';

interface PageHeaderProps {
  pageKey: 'applications' | 'arts' | 'handbooks' | 'posters' | 'reports' | 'videos' | 'websites';
  children?: React.ReactNode;
}

export default function PageHeader({ pageKey, children }: PageHeaderProps) {
  const { t } = useTranslation();
  
  return (
    <PageBackground>
      <Section>
        <Typography variant="h3" gutterBottom>
          {t(`pages.${pageKey}.title`)}
        </Typography>
      </Section>
      {children}
    </PageBackground>
  );
}