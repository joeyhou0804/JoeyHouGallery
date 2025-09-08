"use client";

import Box from '@mui/material/Box';
import { ReactNode } from 'react';

interface PageBackgroundProps {
  children: ReactNode;
}

export default function PageBackground({ children }: PageBackgroundProps) {
  return (
    <Box sx={{
      minHeight: 'calc(100vh - 120px)',
      backgroundColor: 'white'
      // Previous background (saved for future use):
      // backgroundImage: `url(/page_background.png)`,
      // backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat',
      // backgroundPosition: 'center',
      // backgroundAttachment: 'fixed'
    }}>
      {children}
    </Box>
  );
}