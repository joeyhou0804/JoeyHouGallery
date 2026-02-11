"use client";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingSpinner from './LoadingSpinner';
import { useTranslation } from '@/hooks/useTranslation';
import { vw, rvw } from '@/utils/scaling';

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
        gap: rvw(24, 24),
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
          gap: rvw(24, 24),
        }}
      >
        <Box sx={{ width: rvw(50, 50), height: rvw(50, 50) }}>
          <LoadingSpinner size="100%" variant="circular" />
        </Box>

        {(title || subtitle) && (
          <Box sx={{ textAlign: 'center' }}>
            {title && (
              <Typography
                sx={{
                  color: '#432F2F',
                  fontSize: rvw(19, 19),
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
                  fontSize: rvw(26, 26),
                  fontWeight: 'normal',
                  textAlign: 'center',
                  fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                  mt: rvw(4, 4),
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
            fontSize: rvw(16, 16),
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
