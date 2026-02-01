"use client";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingSpinner from './LoadingSpinner';
import { useTranslation } from '@/hooks/useTranslation';

interface PageLoadingScreenProps {
  progress: number;
  title?: string;
  subtitle?: string;
}

export default function PageLoadingScreen({ progress, title, subtitle }: PageLoadingScreenProps) {
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

        {(title || subtitle) && (
          <Box sx={{ textAlign: 'center' }}>
            {title && (
              <Typography
                sx={{
                  color: '#432F2F',
                  fontSize: '1.2rem',
                  fontWeight: 'normal',
                  textAlign: 'center',
                  fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                sx={{
                  color: '#432F2F',
                  fontSize: '1.6rem',
                  fontWeight: 'normal',
                  textAlign: 'center',
                  fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                  mt: 0.5,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
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