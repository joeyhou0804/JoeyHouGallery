import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const CtaButton = styled(Button)(({ theme }) => ({
  // Tweak these to match your palette
  '--pink': '#FF4F8B',
  '--pink-hover': '#FF5D96',
  '--yellow': '#FFD84D',
  '--glow': 'rgba(255, 79, 139, 0.18)', // match your page blue for the halo

  position: 'relative',
  isolation: 'isolate',
  borderRadius: 9999,
  textTransform: 'none',
  fontWeight: 800,
  fontSize: 24,
  lineHeight: 1.15,
  padding: '16px 28px',
  color: '#fff',
  background: 'var(--pink)',
  boxShadow:
    '0 8px 24px rgba(0,0,0,0.12), 0 0 36px 10px var(--glow)', // soft outer blue glow
  '&:hover': {
    background: 'var(--pink-hover)',
    boxShadow:
      '0 12px 34px rgba(0,0,0,0.14), 0 0 42px 12px var(--glow)',
  },

  // bigger end icon
  '& .MuiButton-endIcon': { marginLeft: 16 },
  '& .cta-circle': {
    width: 44,
    height: 44,
    borderRadius: '9999px',
    display: 'inline-grid',
    placeItems: 'center',
    background: 'var(--yellow)',
    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.18)',
  },
  '& .cta-arrow': {
    fontSize: 26,
    fontWeight: 900,
    lineHeight: 1,
    color: 'var(--pink)',
    transform: 'translateX(1px)',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
    padding: '12px 20px',
    '& .cta-circle': { width: 36, height: 36 },
    '& .cta-arrow': { fontSize: 22 },
  },
}));

export function GlowPillButton({ children, ...props }: ButtonProps) {
  return (
    <CtaButton
      variant="contained"
      disableElevation
      disableRipple
      endIcon={
        <Box className="cta-circle">
          <span className="cta-arrow">›</span>
        </Box>
      }
      sx={{
        // optional: match your JP font
        fontFamily: '"Sofia Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
      {...props}
    >
      {children}
    </CtaButton>
  );
}
