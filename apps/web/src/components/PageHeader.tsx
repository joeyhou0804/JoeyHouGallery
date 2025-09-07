"use client";

import Typography from '@mui/material/Typography';
import Section from './Section';
import PageBackground from './PageBackground';
import { useTranslation } from '@/hooks/useTranslation';
import ColorizedMarioText from './ColorizedMarioText';

interface PageHeaderProps {
  pageKey: 'applications' | 'arts' | 'handbooks' | 'posters' | 'reports' | 'videos' | 'websites';
  children?: React.ReactNode;
}

export default function PageHeader({ pageKey, children }: PageHeaderProps) {
  const { t, language } = useTranslation();
  
  return (
    <PageBackground>
      <Section>
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
          <ColorizedMarioText
            text={t(`pages.${pageKey}.title`)}
            fontFamily={language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif'}
            fontSize="inherit"
            fontWeight="normal"
            language={language}
          />
        </Typography>
      </Section>
      {children}
    </PageBackground>
  );
}