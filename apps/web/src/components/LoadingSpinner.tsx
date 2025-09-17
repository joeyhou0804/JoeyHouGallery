"use client";

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.8);
  }
`;

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  variant?: 'circular' | 'pulse' | 'minimal';
}

export default function LoadingSpinner({
  size = 40,
  color = '#BB8F43',
  variant = 'circular'
}: LoadingSpinnerProps) {
  if (variant === 'pulse') {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color,
          animation: `${pulse} 1.5s ease-in-out infinite`,
        }}
      />
    );
  }

  if (variant === 'minimal') {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            width: size * 0.8,
            height: size * 0.8,
            borderRadius: '50%',
            border: `2px solid ${color}`,
            borderTop: '2px solid transparent',
            animation: 'spin 1s linear infinite',
          },
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      />
    );
  }

  return (
    <CircularProgress
      size={size}
      sx={{
        color,
        '& .MuiCircularProgress-circle': {
          strokeLinecap: 'round',
        }
      }}
    />
  );
}