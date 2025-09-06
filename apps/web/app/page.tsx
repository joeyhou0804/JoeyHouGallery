"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

const sections = [
  { href: '/applications', label: 'Applications 应用' },
  { href: '/arts', label: 'Arts 画作' },
  { href: '/handbooks', label: 'Handbooks 手册' },
  { href: '/posters', label: 'Posters 海报' },
  { href: '/reports', label: 'Reports 报告' },
  { href: '/videos', label: 'Videos 视频' },
  { href: '/websites', label: 'Websites 网站' }
];

export default function HomePage() {
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
              This is Joey Hou's Gallery
            </Typography>
            <Typography variant="h6" gutterBottom>
              Welcome to my gallery! Here you can find arts, videos, handbooks, and posters designed by me!
            </Typography>
            <Box mt={3} />
            <Typography variant="h4" gutterBottom>
              小猴同学作品集
            </Typography>
            <Typography variant="h6">
              欢迎来到我的作品集！这里有不少我设计的画、视频、手册以及海报哦！
            </Typography>
            <Box mt={4}>
              <Button href="http://www.joeyhou.org" target="_blank" rel="noreferrer" variant="outlined" color="inherit">
                Back to My Homepage
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              {sections.map((s) => (
                <Button key={s.href} component={Link} href={s.href} variant="contained" color="primary">
                  {s.label}
                </Button>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
