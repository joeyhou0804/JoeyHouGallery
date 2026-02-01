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
  const { t, language } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/backgrounds/section_background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        gap: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >

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
              fontWeight: 'normal',
              textAlign: 'center',
              fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
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
      </Box>
    </Box>
  );
}