"use client";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import YouTubeEmbed from './YouTubeEmbed';
import { useTranslation } from '@/hooks/useTranslation';

interface VideoCardProps {
  title: string;
  youtubeId: string;
  description?: string;
  body?: string | string[];
  colorIndex?: number;
  customGradient?: string;
}

export default function VideoCard({
  title,
  youtubeId,
  description,
  body,
  colorIndex = 0,
  customGradient
}: VideoCardProps) {
  const { language } = useTranslation();

  const gradients = [
    'linear-gradient(to right, #75C5EB, #297BC8)',
    'linear-gradient(to right, #FF8E65, #FF4582)',
    'linear-gradient(to right, #39DE88, #17CACB)',
  ];
  const backgroundGradient = customGradient || gradients[colorIndex] || gradients[0];

  const rightColor = (() => {
    const match = backgroundGradient?.match(/#[A-Fa-f0-9]{6}(?![A-Fa-f0-9])/g);
    return match && match.length >= 2 ? match[1] : '#297BC8';
  })();

  // Layout constants
  const CARD_PAD = 24;        // equals p:3
  const STRIPE_HEIGHT = 80;   // height of the stripe
  const STRIPE_TOP = 48;      // move stripe down (video top is 24, so this is lower)
  const RIGHT_SPACER = Math.max(0, STRIPE_TOP + STRIPE_HEIGHT - CARD_PAD);

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        overflow: 'hidden',
        mb: 4,
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Absolute colored stripe (below video top) */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: STRIPE_TOP,
            height: STRIPE_HEIGHT,
            backgroundImage: backgroundGradient,
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          {/* Reserve the left video area (60% + padding) */}
          <Box sx={{ flex: `0 0 calc(60% + ${CARD_PAD}px)` }} />
          {/* Title only on the right side */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              sx={{
                color: 'white',
                fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        {/* Main content sits above the stripe */}
        <Box sx={{ display: 'flex', minHeight: 300, position: 'relative', zIndex: 2 }}>
          {/* Video: equal padding on all sides */}
          <Box sx={{ width: '60%', p: 3, display: 'flex', alignItems: 'flex-start' }}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
            >
              <YouTubeEmbed id={youtubeId} title={title} />
            </Box>
          </Box>

          {/* Right text column */}
          <Box sx={{ width: '40%', p: 3, display: 'flex', flexDirection: 'column' }}>
            {/* Spacer ensures text starts below stripe */}
            <Box sx={{ height: RIGHT_SPACER }} />

            {body && (
              <Stack spacing={1}>
                {Array.isArray(body) ? body.map((p, i) => (
                  <Typography
                    key={i}
                    sx={{
                      color: '#432F2F',
                      fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    {p}
                  </Typography>
                )) : (
                  <Typography
                    sx={{
                      color: '#432F2F',
                      fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    {body}
                  </Typography>
                )}
              </Stack>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
