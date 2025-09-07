"use client";

import Box from '@mui/material/Box';
import { ReactNode } from 'react';

interface TextBlockProps {
  children: ReactNode;
  centered?: boolean;
}

export default function TextBlock({ children, centered = false }: TextBlockProps) {
  return (
    <Box sx={{
      backgroundColor: 'white',
      padding: 2,
      borderRadius: 2,
      mb: 2,
      ...(centered && { textAlign: 'center' })
    }}>
      {children}
    </Box>
  );
}