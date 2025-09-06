"use client";

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CloudImage from './CloudImage';

export default function ImageGrid({ images }: { images: string[] }) {
  return (
    <Grid container spacing={2}>
      {images.map((src, i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <Card>
            <CloudImage src={src} alt="" />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
