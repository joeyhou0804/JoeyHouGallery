"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 0, py: 4, backgroundColor: '#2B91E1', position: 'relative', zIndex: 10 }}>
      <Container>
        <Typography variant="body2" sx={{ color: 'white', fontWeight: 900 }}>
          © {new Date().getFullYear()} Joey Hou. Built with Next.js & MUI.
        </Typography>
      </Container>
    </Box>
  );
}

