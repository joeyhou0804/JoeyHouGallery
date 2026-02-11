"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CloudImage from './CloudImage';
import { rvw } from '@/utils/scaling';

export default function ImageGrid({ images }: { images: string[] }) {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
      gap: rvw(16, 16),
    }}>
      {images.map((src, i) => (
        <Card key={i}>
          <CloudImage src={src} alt="" />
        </Card>
      ))}
    </Box>
  );
}
