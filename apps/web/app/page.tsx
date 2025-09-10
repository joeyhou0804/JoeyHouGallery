"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import ColorizedMarioText from '@/components/ColorizedMarioText';

const sections = [
  { href: '/apps', labelKey: 'sectionsLabels.applications', buttonIndex: 1 },
  { href: '/arts', labelKey: 'sectionsLabels.arts', buttonIndex: 2 },
  { href: '/handbooks', labelKey: 'sectionsLabels.handbooks', buttonIndex: 3 },
  { href: '/posters', labelKey: 'sectionsLabels.posters', buttonIndex: 4 },
  { href: '/reports', labelKey: 'sectionsLabels.reports', buttonIndex: 5 },
  { href: '/videos', labelKey: 'sectionsLabels.videos', buttonIndex: 6 },
  { href: '/websites', labelKey: 'sectionsLabels.websites', buttonIndex: 7 }
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
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 900 }}>
            {t('thisIs')}
          </Typography>
          
          {/* Second row: Gallery title */}
          <Typography variant="h1" gutterBottom sx={{ 
            mb: 3, 
            textAlign: 'center',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' }
          }}>
            <ColorizedMarioText
              text={t('galleryTitle')}
              fontFamily={language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif'}
              fontSize="inherit"
              fontWeight={language === 'zh-CN' ? 'normal' : 'bold'}
              language={language}
              variant="gradient"
            />
          </Typography>
          
          {/* Third row: Welcome message */}
          <Typography variant="h5" sx={{ py: 3, maxWidth: 600, mx: 'auto', fontWeight: 900 }}>
            {t('welcomeMessage')}
          </Typography>
          
          {/* Fourth row: Navigation buttons */}
          <Box sx={{ mt: 4 }}>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 2,
                justifyItems: 'center',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
              }}
            >
              {sections.map((s) => {
                const buttonImage = language === 'zh-CN' 
                  ? `/buttons/button_cn_${s.buttonIndex}.png`
                  : `/buttons/button_en_${s.buttonIndex}.png`;
                
                return (
                  <Link key={s.href} href={s.href}>
                    <Image
                      src={buttonImage}
                      alt={t(s.labelKey)}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: '120px',
                        maxWidth: '360px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, opacity 0.2s ease',
                        flexShrink: 1,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </Link>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
