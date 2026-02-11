"use client";

import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { rvw } from '@/utils/scaling';

interface TextBlockProps {
  children: ReactNode;
  centered?: boolean;
}

export default function TextBlock({ children, centered = false }: TextBlockProps) {
  return (
    <Box sx={{
      backgroundColor: 'white',
      padding: rvw(16, 16),
      borderRadius: rvw(8, 8),
      mb: rvw(16, 16),
      ...(centered && { textAlign: 'center' })
    }}>
      {children}
    </Box>
  );
}