"use client";

import Typography from '@mui/material/Typography';
import Section from './Section';
import { useTranslation } from '@/hooks/useTranslation';

interface PageHeaderProps {
  pageKey: 'arts' | 'handbooks' | 'posters' | 'reports' | 'videos' | 'websites';
}

export default function PageHeader({ pageKey }: PageHeaderProps) {
  const { t } = useTranslation();
  
  return (
    <Section>
      <Typography variant="h3" gutterBottom>
        {t(`pages.${pageKey}.title`)}
      </Typography>
    </Section>
  );
}