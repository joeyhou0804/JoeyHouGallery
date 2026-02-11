"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { vw, rvw } from '@/utils/scaling';

export default function Section({ children, sx }: { children: React.ReactNode, sx?: any }) {
  return (
    <Box component="section" sx={{ py: rvw(48, 48), ...sx }}>
      <Box sx={{ maxWidth: { md: vw(1200) }, mx: 'auto', px: rvw(16, 24) }}>{children}</Box>
    </Box>
  );
}

