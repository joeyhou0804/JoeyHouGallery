"use client";

import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { vw } from '@/utils/scaling';

interface PageBackgroundProps {
  children: ReactNode;
}

export default function PageBackground({ children }: PageBackgroundProps) {
  return (
    <Box sx={{
      minHeight: { xs: `calc(100vh - ${vw(120, 'mobile')})`, md: `calc(100vh - ${vw(120)})` },
      backgroundColor: '#2B91E1'
    }}>
      {children}
    </Box>
  );
}
