"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

const sections = [
  { href: '/applications', labelKey: 'sectionsLabels.applications' },
  { href: '/arts', labelKey: 'sectionsLabels.arts' },
  { href: '/handbooks', labelKey: 'sectionsLabels.handbooks' },
  { href: '/posters', labelKey: 'sectionsLabels.posters' },
  { href: '/reports', labelKey: 'sectionsLabels.reports' },
  { href: '/videos', labelKey: 'sectionsLabels.videos' },
  { href: '/websites', labelKey: 'sectionsLabels.websites' }
];

export default function HomePage() {
  const { t, language } = useTranslation();
  return (
    <Box sx={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: `url(/title_background.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff'
    }}>
      <Container>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          {/* First row: "This is" / "这里是" */}
          <Typography variant="h5" gutterBottom>
            {t('thisIs')}
          </Typography>
          
          {/* Second row: Gallery title */}
          <Typography variant="h2" gutterBottom sx={{ 
            fontWeight: language === 'zh-CN' ? 'normal' : 'bold', 
            mb: 3, 
            fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif' 
          }}>
            {t('galleryTitle')}
          </Typography>
          
          {/* Third row: Welcome message */}
          <Typography variant="h6" sx={{ py: 3, maxWidth: 600, mx: 'auto' }}>
            {t('welcomeMessage')}
          </Typography>
          
          {/* Fourth row: Navigation buttons */}
          <Box sx={{ mt: 4 }}>
            <Stack 
              direction="row" 
              spacing={2} 
              justifyContent="center" 
              flexWrap="wrap" 
              sx={{ gap: 2 }}
            >
              {sections.map((s) => (
                <Button 
                  key={s.href} 
                  component={Link} 
                  href={s.href}
                  variant="outlined"
                  sx={{
                    borderRadius: '50px',
                    border: '2px solid white',
                    backgroundColor: 'transparent',
                    color: 'white',
                    px: 3,
                    py: 1,
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '2px solid white',
                    }
                  }}
                >
                  {t(s.labelKey)}
                </Button>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
