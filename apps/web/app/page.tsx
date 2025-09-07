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
  const { t } = useTranslation();
  return (
    <Box sx={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638396794/joeyhougallery/arts/IMG_0954_ursbh1.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff'
    }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              {t('galleryTitle')}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t('welcomeMessage')}
            </Typography>
            <Box mt={4}>
              <Button href="http://www.joeyhou.org" target="_blank" rel="noreferrer" variant="outlined" color="inherit">
                {t('backToHomepage')}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              {sections.map((s) => (
                <Button key={s.href} component={Link} href={s.href} variant="contained" color="primary">
                  {t(s.labelKey)}
                </Button>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
