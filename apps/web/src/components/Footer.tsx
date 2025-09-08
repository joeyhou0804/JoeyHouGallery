"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 0, py: 4, borderTop: 1, borderColor: 'divider' }}>
      <Container>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Joey Hou. Built with Next.js & MUI.
        </Typography>
      </Container>
    </Box>
  );
}

