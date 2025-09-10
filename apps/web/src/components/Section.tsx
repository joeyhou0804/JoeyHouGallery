"use client";

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Section({ children, sx }: { children: React.ReactNode, sx?: any }) {
  return (
    <Box component="section" sx={{ py: 6, ...sx }}>
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}

