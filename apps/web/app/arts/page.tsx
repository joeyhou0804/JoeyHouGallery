"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import ArtCardGrid from '@/components/ArtCardGrid';
import type { PageContent } from '@/content/types';
import content from '@/content/arts.json';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageFooter from '@/components/PageFooter';
import { useTranslation } from '@/hooks/useTranslation';

export default function ArtsPage() {
  const data = content as PageContent;
  const { language } = useTranslation();
  
  return (
    <PageHeader pageKey="arts">
      {data.sections.map((s, i) => (
        s.type === 'intro' ? (
          <MainSection key={i} section={s} time={s.time} isFirst={i === 0} />
        ) : (
          <Section key={i}>
            {s.title ? (
              <>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography 
                    variant="h4" 
                    sx={{
                      color: 'white',
                      fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), 0px 0px 1px rgba(0, 0, 0, 0.5)',
                      fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                      mb: 2,
                    }}
                  >
                    {s.title}
                  </Typography>
                </Box>
                <ImageGrid images={(s as any).images} />
              </>
            ) : (
              // Chinese Characters images using ArtCardGrid component
              <ArtCardGrid 
                images={(s as any).images} 
                titles={["Renaissance", "Cubism", "Moderism", "Impressionism"]} 
              />
            )}
          </Section>
        )
      ))}

      <PageFooter />
    </PageHeader>
  );
}
