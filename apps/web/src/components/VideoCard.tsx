"use client";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useMediaQuery, useTheme } from '@mui/material';
import YouTubeEmbed from './YouTubeEmbed';
import { useTranslation } from '@/hooks/useTranslation';

interface VideoCardProps {
  title: string;
  youtubeId: string;
  description?: string;
  body?: string | string[];
  colorIndex?: number;
  customGradient?: string;
  sx?: any;
}

export default function VideoCard({
  title,
  youtubeId,
  description,
  body,
  colorIndex = 0,
  customGradient,
  sx
}: VideoCardProps) {
  const { language } = useTranslation();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // xs screens only

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
  const CARD_PAD = 24;          // top/bottom/left padding around video (p:3)
  const STRIPE_HEIGHT = 50;     // stripe height
  const STRIPE_TOP = 48;        // stripe sits below the video top (video top is 24)
  const COL_GAP = 12;           // visual gap between video and right text (video pr & right pl)
  const RIGHT_SPACER = Math.max(0, STRIPE_TOP + STRIPE_HEIGHT - CARD_PAD);

  return (
    <Box
      sx={{
        backgroundImage: `url(/backgrounds/section_background.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        border: '6px solid white',
        overflow: 'hidden',
        mb: 4,
        position: 'relative',
        ...sx,
      }}
    >
      {isXs ? (
        // Mobile layout: vertical stack
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Stack spacing={3} alignItems="center">
            {/* Video */}
            <Box
              sx={{
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '16/9',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
            >
              <YouTubeEmbed id={youtubeId} title={title} />
            </Box>
            
            {/* Colored stripe with title */}
            <Box
              sx={{
                width: 'calc(100% + 48px)', // Extend beyond the padding
                marginLeft: '-24px',
                marginRight: '-24px',
                height: STRIPE_HEIGHT,
                backgroundImage: backgroundGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                mb: description ? 1 : 0, // Reduce bottom margin when description follows
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                  fontSize: { xs: '1.1rem' },
                  fontWeight: 'normal',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  lineHeight: 1.2,
                  textAlign: 'center',
                }}
              >
                {title}
              </Typography>
            </Box>
            
            {/* Colored description text */}
            {description && (
              <Typography
                sx={{
                  color: rightColor,
                  fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                  fontSize: { xs: '1.75rem' },
                  fontWeight: 'normal',
                  lineHeight: 1.2,
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {description}
              </Typography>
            )}
            
            {/* Body text */}
            {body && (
              <Box sx={{ width: '100%' }}>
                <Stack spacing={1}>
                  {Array.isArray(body) ? body.map((p, i) => (
                    <Typography
                      key={i}
                      sx={{
                        color: '#432F2F',
                        fontSize: { xs: '1.05rem' },
                        lineHeight: 1.6,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {p}
                    </Typography>
                  )) : (
                    <Typography
                      sx={{
                        color: '#432F2F',
                        fontSize: { xs: '1.05rem' },
                        lineHeight: 1.6,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {body}
                    </Typography>
                  )}
                </Stack>
              </Box>
            )}
          </Stack>
        </Box>
      ) : (
        // Desktop layout: original side-by-side
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
          {/* Reserve: left column width (60%) + the right column's inner left padding (COL_GAP)
              -> ensures the stripe title's left edge aligns with the colored text */}
          <Box sx={{ flex: `0 0 calc(60% + ${COL_GAP}px)` }} />

          {/* Title area: no extra padding so it lines up with right column text */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Typography
              sx={{
                color: 'white',
                fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' }, // keep stripe title smaller
                fontWeight: 'normal',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                lineHeight: 1.2,
                textAlign: 'left',
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        {/* Main content sits above the stripe */}
        <Box sx={{ display: 'flex', minHeight: 300, position: 'relative', zIndex: 2 }}>
          {/* Video: equal top/left/bottom; smaller right padding to create the gap */}
          <Box
            sx={{
              width: '60%',
              pt: 3, pl: 3, pb: 3,
              pr: COL_GAP / 8 * 1, // keep as 1.5 if you prefer; here just to show it's tied to COL_GAP
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
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

          {/* Right text column: left padding = COL_GAP so it matches the stripe title start */}
          <Box
            sx={{
              width: '40%',
              pt: 3, pr: 3, pb: 3,
              pl: 1.5, // 12px (== COL_GAP)
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
            }}
          >
            {/* Spacer ensures text starts below stripe */}
            <Box sx={{ height: RIGHT_SPACER }} />

            {description && (
              <Typography
                sx={{
                  color: rightColor,
                  fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                  // Larger colored text
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  fontWeight: 'normal',
                  mb: 1.25,
                  lineHeight: 1.2,
                  textAlign: 'left',
                }}
              >
                {description}
              </Typography>
            )}

            {body && (
              <Stack spacing={1}>
                {Array.isArray(body) ? body.map((p, i) => (
                  <Typography
                    key={i}
                    sx={{
                      color: '#432F2F',
                      fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.25rem' },
                      lineHeight: 1.6,
                      fontWeight: 500,
                      textAlign: 'left',
                    }}
                  >
                    {p}
                  </Typography>
                )) : (
                  <Typography
                    sx={{
                      color: '#432F2F',
                      fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.25rem' },
                      lineHeight: 1.6,
                      fontWeight: 500,
                      textAlign: 'left',
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
      )}
    </Box>
  );
}
