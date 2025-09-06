"use client";

import * as React from 'react';
import Box from '@mui/material/Box';

export default function YouTubeEmbed({ id, title }: { id: string; title?: string }) {
  return (
    <Box sx={{ position: 'relative', pt: '56.25%' }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0`}
        title={title || 'YouTube video player'}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </Box>
  );
}

