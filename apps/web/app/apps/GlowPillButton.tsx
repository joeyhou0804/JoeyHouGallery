import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { vw } from '@/utils/scaling';

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
  fontSize: vw(24),
  lineHeight: 1.15,
  padding: `${vw(16)} ${vw(28)}`,
  color: '#fff',
  background: 'var(--pink)',
  boxShadow:
    `0 ${vw(8)} ${vw(24)} rgba(0,0,0,0.12), 0 0 ${vw(36)} ${vw(10)} var(--glow)`,
  '&:hover': {
    background: 'var(--pink-hover)',
    boxShadow:
      `0 ${vw(12)} ${vw(34)} rgba(0,0,0,0.14), 0 0 ${vw(42)} ${vw(12)} var(--glow)`,
  },

  // bigger end icon
  '& .MuiButton-endIcon': { marginLeft: vw(16) },
  '& .cta-circle': {
    width: vw(44),
    height: vw(44),
    borderRadius: '9999px',
    display: 'inline-grid',
    placeItems: 'center',
    background: 'var(--yellow)',
    boxShadow: `inset 0 ${vw(2)} ${vw(6)} rgba(0,0,0,0.12), 0 ${vw(4)} ${vw(10)} rgba(0,0,0,0.18)`,
  },
  '& .cta-arrow': {
    fontSize: vw(26),
    fontWeight: 900,
    lineHeight: 1,
    color: 'var(--pink)',
    transform: `translateX(${vw(1)})`,
  },

  [theme.breakpoints.down('md')]: {
    fontSize: vw(14, 'mobile'),
    padding: `${vw(8, 'mobile')} ${vw(14, 'mobile')}`,
    boxShadow: `0 ${vw(8, 'mobile')} ${vw(24, 'mobile')} rgba(0,0,0,0.12), 0 0 ${vw(36, 'mobile')} ${vw(10, 'mobile')} var(--glow)`,
    '&:hover': {
      boxShadow: `0 ${vw(12, 'mobile')} ${vw(34, 'mobile')} rgba(0,0,0,0.14), 0 0 ${vw(42, 'mobile')} ${vw(12, 'mobile')} var(--glow)`,
    },
    '& .MuiButton-endIcon': { marginLeft: vw(8, 'mobile') },
    '& .cta-circle': {
      width: vw(28, 'mobile'),
      height: vw(28, 'mobile'),
      boxShadow: `inset 0 ${vw(2, 'mobile')} ${vw(6, 'mobile')} rgba(0,0,0,0.12), 0 ${vw(4, 'mobile')} ${vw(10, 'mobile')} rgba(0,0,0,0.18)`,
    },
    '& .cta-arrow': { fontSize: vw(16, 'mobile') },
  },
}));

export function GlowPillButton({ children, sx, animate = false, ...props }: ButtonProps & { animate?: boolean }) {
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
        fontFamily: '"Sofia Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        ...sx,
      }}
      {...props}
    >
      {children}
    </CtaButton>
  );
}
