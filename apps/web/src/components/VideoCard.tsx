"use client";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useMediaQuery, useTheme } from '@mui/material';
import YouTubeEmbed from './YouTubeEmbed';
import { useTranslation } from '@/hooks/useTranslation';
import { vw, rvw } from '@/utils/scaling';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  return (
    <Box
      sx={{
        backgroundImage: `url(/backgrounds/section_background.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: rvw(12, 12),
        boxShadow: {
          xs: `0 ${vw(8, 'mobile')} ${vw(32, 'mobile')} rgba(0, 0, 0, 0.12)`,
          md: `0 ${vw(8)} ${vw(32)} rgba(0, 0, 0, 0.12)`,
        },
        borderWidth: rvw(6, 6),
        borderStyle: 'solid',
        borderColor: 'white',
        overflow: 'hidden',
        mb: rvw(32, 32),
        position: 'relative',
        ...sx,
      }}
    >
      {isMobile ? (
        // Mobile layout: vertical stack
        <Box sx={{ p: vw(8, 'mobile') }}>
          <Stack spacing={vw(12, 'mobile')} alignItems="center">
            {/* Video */}
            <Box
              sx={{
                width: '100%',
                maxWidth: vw(400, 'mobile'),
                aspectRatio: '16/9',
                borderRadius: vw(8, 'mobile'),
                overflow: 'hidden',
                boxShadow: `0 ${vw(4, 'mobile')} ${vw(16, 'mobile')} rgba(0,0,0,0.1)`,
              }}
            >
              <YouTubeEmbed id={youtubeId} title={title} />
            </Box>

            {/* Colored stripe with title */}
            <Box
              sx={{
                width: `calc(100% + ${vw(16, 'mobile')})`,
                marginLeft: vw(-8, 'mobile'),
                marginRight: vw(-8, 'mobile'),
                height: vw(50, 'mobile'),
                backgroundImage: backgroundGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: vw(16, 'mobile'),
                mb: description ? vw(8, 'mobile') : 0,
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                  fontSize: vw(17, 'mobile'),
                  fontWeight: 'normal',
                  textShadow: `${vw(1, 'mobile')} ${vw(1, 'mobile')} ${vw(2, 'mobile')} rgba(0,0,0,0.3)`,
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
                  fontSize: vw(28, 'mobile'),
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
                <Stack spacing={vw(8, 'mobile')}>
                  {Array.isArray(body) ? body.map((p, i) => (
                    <Typography
                      key={i}
                      sx={{
                        color: '#432F2F',
                        fontSize: vw(17, 'mobile'),
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
                        fontSize: vw(17, 'mobile'),
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
            top: vw(48),
            height: vw(50),
            backgroundImage: backgroundGradient,
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          {/* Reserve: left column width (60%) + the right column's inner left padding (COL_GAP)
              -> ensures the stripe title's left edge aligns with the colored text */}
          <Box sx={{ flex: `0 0 calc(60% + ${vw(12)})` }} />

          {/* Title area: no extra padding so it lines up with right column text */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Typography
              sx={{
                color: 'white',
                fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                fontSize: vw(22),
                fontWeight: 'normal',
                textShadow: `${vw(1)} ${vw(1)} ${vw(2)} rgba(0,0,0,0.3)`,
                lineHeight: 1.2,
                textAlign: 'left',
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        {/* Main content sits above the stripe */}
        <Box sx={{ display: 'flex', minHeight: vw(300), position: 'relative', zIndex: 2 }}>
          {/* Video: equal top/left/bottom; smaller right padding to create the gap */}
          <Box
            sx={{
              width: '60%',
              pt: vw(24), pl: vw(24), pb: vw(24),
              pr: vw(12),
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: vw(8),
                overflow: 'hidden',
                boxShadow: `0 ${vw(4)} ${vw(16)} rgba(0,0,0,0.1)`,
              }}
            >
              <YouTubeEmbed id={youtubeId} title={title} />
            </Box>
          </Box>

          {/* Right text column: left padding = COL_GAP so it matches the stripe title start */}
          <Box
            sx={{
              width: '40%',
              pt: vw(24), pr: vw(24), pb: vw(24),
              pl: vw(12),
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
            }}
          >
            {/* Spacer ensures text starts below stripe */}
            <Box sx={{ height: vw(74) }} />

            {description && (
              <Typography
                sx={{
                  color: rightColor,
                  fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                  fontSize: vw(36),
                  fontWeight: 'normal',
                  mb: vw(10),
                  lineHeight: 1.2,
                  textAlign: 'left',
                }}
              >
                {description}
              </Typography>
            )}

            {body && (
              <Stack spacing={vw(8)}>
                {Array.isArray(body) ? body.map((p, i) => (
                  <Typography
                    key={i}
                    sx={{
                      color: '#432F2F',
                      fontSize: vw(20),
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
                      fontSize: vw(20),
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
