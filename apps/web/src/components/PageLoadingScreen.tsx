"use client";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingSpinner from './LoadingSpinner';
import { useTranslation } from '@/hooks/useTranslation';

interface PageLoadingScreenProps {
  progress: number;
  title?: string;
}

export default function PageLoadingScreen({ progress, title }: PageLoadingScreenProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        gap: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          opacity: 0.8,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <LoadingSpinner size={50} variant="circular" />

        {title && (
          <Typography
            sx={{
              color: '#432F2F',
              fontSize: '1.4rem',
              fontWeight: 600,
              textAlign: 'center',
              fontFamily: 'Mario, sans-serif',
            }}
          >
            {title}
          </Typography>
        )}

        <Typography
          sx={{
            color: '#666',
            fontSize: '1rem',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          {t('ui.loading')}
        </Typography>

        {/* Progress bar */}
        <Box
          sx={{
            width: 240,
            height: 6,
            backgroundColor: '#e0e0e0',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          <Box
            sx={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #BB8F43, #DFBF23)',
              transition: 'width 0.2s ease',
              borderRadius: 3,
            }}
          />
        </Box>

        <Typography
          sx={{
            color: '#888',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          {Math.round(progress)}%
        </Typography>
      </Box>
    </Box>
  );
}