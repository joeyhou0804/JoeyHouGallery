"use client";

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useTranslation } from '@/hooks/useTranslation';
import type { Section as SectionType } from '@/content/types';
import { GlowPillButton } from '../../app/apps/GlowPillButton';
import ControllableCarousel from './ControllableCarousel';
import Section from './Section';
import { vw, rvw } from '@/utils/scaling';

// MainSection Component: Contains section title, text content, and buttons with background
export default function MainSection({
  section,
  time,
  isFirst = true,
  backgroundType = 'full',
  extraTopPadding = 0,
  extendBackground = false
}: {
  section: Extract<SectionType, { type: 'intro' }>,
  time?: string,
  isFirst?: boolean,
  backgroundType?: 'full' | 'bottom-only',
  extraTopPadding?: number,
  extendBackground?: boolean
}) {
  const { t, language } = useTranslation();

  // Use the content passed in through props
  const title = section.title;
  const bodyContent = section.body || [];
  const linkLabel = section.links?.[0]?.label || t('ui.goToGitHub');

  // Zigzag configuration (2-tier: xs and md)
  const depth = { xs: 6, md: 10 };
  const steps = { xs: 40, md: 120 };
  // Pre-compute vw strings for clip-path usage
  const dXs = vw(depth.xs, 'mobile');
  const dMd = vw(depth.md);

  // Build clipPath polygons with proportional depth
  const bottomOnlyClipXs = `polygon(
    0% 0%, 100% 0%,
    100% calc(100% - ${dXs}),
    ${Array.from({ length: steps.xs + 1 }, (_, i) => {
      const x = ((steps.xs - i) / steps.xs) * 100;
      const isPeak = i % 2 === 0;
      const y = isPeak ? '100%' : `calc(100% - ${dXs})`;
      return `${x.toFixed(2)}% ${y}`;
    }).join(', ')},
    0% calc(100% - ${dXs})
  )`;

  const bottomOnlyClipMd = `polygon(
    0% 0%, 100% 0%,
    100% calc(100% - ${dMd}),
    ${Array.from({ length: steps.md + 1 }, (_, i) => {
      const x = ((steps.md - i) / steps.md) * 100;
      const isPeak = i % 2 === 0;
      const y = isPeak ? '100%' : `calc(100% - ${dMd})`;
      return `${x.toFixed(2)}% ${y}`;
    }).join(', ')},
    0% calc(100% - ${dMd})
  )`;

  const extendClipXs = `polygon(
    0% 0%,
    ${Array.from({ length: steps.xs + 1 }, (_, i) => {
      const x = (i / steps.xs) * 100;
      const isPeak = i % 2 === 0;
      const y = isPeak ? '0%' : dXs;
      return `${x.toFixed(2)}% ${y}`;
    }).join(', ')},
    100% 0%, 100% 100%, 0% 100%, 0% 0%
  )`;

  const extendClipMd = `polygon(
    0% 0%,
    ${Array.from({ length: steps.md + 1 }, (_, i) => {
      const x = (i / steps.md) * 100;
      const isPeak = i % 2 === 0;
      const y = isPeak ? '0%' : dMd;
      return `${x.toFixed(2)}% ${y}`;
    }).join(', ')},
    100% 0%, 100% 100%, 0% 100%, 0% 0%
  )`;

  const fullClipXs = `polygon(
    0% 0%,
    ${Array.from({ length: steps.xs + 1 }, (_, i) => {
      const x = (i / steps.xs) * 100;
      const isPeak = i % 2 === 0;
      const y = isPeak ? '0%' : dXs;
      return `${x.toFixed(2)}% ${y}`;
    }).join(', ')},
    100% 0%, 100% calc(100% - ${dXs}),
    ${Array.from({ length: steps.xs + 1 }, (_, i) => {
      const x = ((steps.xs - i) / steps.xs) * 100;
      const isPeak = i % 2 === 0;
      const y = isPeak ? '100%' : `calc(100% - ${dXs})`;
      return `${x.toFixed(2)}% ${y}`;
    }).join(', ')},
    0% calc(100% - ${dXs}), 0% 0%
  )`;

  const fullClipMd = `polygon(
    0% 0%,
    ${Array.from({ length: steps.md + 1 }, (_, i) => {
      const x = (i / steps.md) * 100;
      const isPeak = i % 2 === 0;
      const y = isPeak ? '0%' : dMd;
      return `${x.toFixed(2)}% ${y}`;
    }).join(', ')},
    100% 0%, 100% calc(100% - ${dMd}),
    ${Array.from({ length: steps.md + 1 }, (_, i) => {
      const x = ((steps.md - i) / steps.md) * 100;
      const isPeak = i % 2 === 0;
      const y = isPeak ? '100%' : `calc(100% - ${dMd})`;
      return `${x.toFixed(2)}% ${y}`;
    }).join(', ')},
    0% calc(100% - ${dMd}), 0% 0%
  )`;

  // Inner title zigzag
  const innerDepth = { xs: 20, md: 30 };
  const hasMultipleLines = title.includes('&');
  const getZigzagCount = (breakpoint: 'xs' | 'md') => {
    if (breakpoint === 'xs') return 2;
    return hasMultipleLines ? 3 : 2;
  };

  const createZigzagPolygon = (zigzagCount: number, d: string) => {
    const pts: string[] = [];
    pts.push('0% 0%', '100% 0%');
    pts.push('100% 0%');
    if (zigzagCount === 2) {
      pts.push(`calc(100% - ${d}) 25%`);
      pts.push('100% 50%');
      pts.push(`calc(100% - ${d}) 75%`);
    } else if (zigzagCount === 3) {
      pts.push(`calc(100% - ${d}) 16.67%`);
      pts.push('100% 33.33%');
      pts.push(`calc(100% - ${d}) 50%`);
      pts.push('100% 66.67%');
      pts.push(`calc(100% - ${d}) 83.33%`);
    }
    pts.push('100% 100%');
    pts.push('100% 100%', '0% 100%');
    pts.push('0% 100%');
    if (zigzagCount === 2) {
      pts.push(`${d} 75%`);
      pts.push('0% 50%');
      pts.push(`${d} 25%`);
    } else if (zigzagCount === 3) {
      pts.push(`${d} 83.33%`);
      pts.push('0% 66.67%');
      pts.push(`${d} 50%`);
      pts.push('0% 33.33%');
      pts.push(`${d} 16.67%`);
    }
    pts.push('0% 0%');
    return `polygon(${pts.join(', ')})`;
  };

  // Determine outer box sx based on backgroundType / extendBackground / isFirst
  const getOuterSx = () => {
    if (backgroundType === 'bottom-only') {
      return {
        // xs: spacing(6)+depth.xs = 48+6 = 54
        paddingBottom: { xs: vw(54, 'mobile'), md: vw(58) },
        marginTop: { xs: vw(-6, 'mobile'), md: vw(-10) },
        clipPath: { xs: bottomOnlyClipXs, md: bottomOnlyClipMd },
      };
    }
    if (extendBackground) {
      return {
        paddingTop: isFirst
          ? { xs: vw(78 + extraTopPadding, 'mobile'), md: vw(98 + extraTopPadding) }
          : { xs: vw(38 + extraTopPadding, 'mobile'), md: vw(50 + extraTopPadding) },
        // xs: spacing(6)+120 = 168, md: spacing(8)+120 = 184
        paddingBottom: { xs: vw(168, 'mobile'), md: vw(184) },
        marginTop: isFirst
          ? { xs: vw(-(depth.xs + 40), 'mobile'), md: vw(-(depth.md + 40)) }
          : { xs: vw(-depth.xs, 'mobile'), md: vw(-depth.md) },
        clipPath: { xs: extendClipXs, md: extendClipMd },
      };
    }
    // Default: full zigzag (top + bottom)
    return {
      paddingTop: isFirst
        ? { xs: vw(78 + extraTopPadding, 'mobile'), md: vw(98 + extraTopPadding) }
        : { xs: vw(38 + extraTopPadding, 'mobile'), md: vw(50 + extraTopPadding) },
      // xs: spacing(6)+depth.xs = 48+6 = 54, md: spacing(6)+depth.md = 48+10 = 58
      paddingBottom: { xs: vw(54, 'mobile'), md: vw(58) },
      marginTop: isFirst
        ? { xs: vw(-(depth.xs + 40), 'mobile'), md: vw(-(depth.md + 40)) }
        : { xs: vw(-depth.xs, 'mobile'), md: vw(-depth.md) },
      clipPath: { xs: fullClipXs, md: fullClipMd },
    };
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(/backgrounds/section_background.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'relative',
        zIndex: 5,
        paddingTop: { xs: vw(24 + extraTopPadding, 'mobile'), md: vw(24 + extraTopPadding) },
        marginBottom: extendBackground ? { xs: vw(-120, 'mobile'), md: vw(-120) } : 0,
        ...getOuterSx(),
      }}
    >
      <Section sx={{ py: rvw(24, 48) }}>
        <Stack spacing={rvw(16, 24)}>
          {/* Rectangle with zigzag borders for the title */}
          <Box
            sx={{
              position: 'relative',
            }}
          >
            {/* Capsule with date at the top */}
            <Box
              sx={{
                position: 'absolute',
                top: rvw(-16, -20),
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                borderWidth: rvw(2, 2),
                borderStyle: 'solid',
                borderColor: '#BB8F43',
                borderRadius: rvw(20, 20),
                py: rvw(4, 4),
                px: rvw(16, 16),
                display: 'flex',
                alignItems: 'center',
                gap: rvw(8, 8),
                zIndex: 1,
              }}
            >
              <Typography sx={{ color: '#BB8F43', fontSize: rvw(11, 14), pt: rvw(2, 2) }}>★</Typography>
              <Typography sx={{ color: '#BB8F43', fontWeight: 'bold', fontSize: rvw(14, 19), pt: rvw(2, 2) }}>
                {time || '2022.04'}
              </Typography>
              <Typography sx={{ color: '#BB8F43', fontSize: rvw(11, 14), pt: rvw(2, 2) }}>★</Typography>
            </Box>

        <Box
        sx={{
          // Yellow gradient background with stripes (proportional)
          backgroundImage: {
            xs: `repeating-linear-gradient(-45deg, transparent, transparent ${vw(8, 'mobile')}, rgba(255, 255, 255, 0.3) ${vw(8, 'mobile')}, rgba(255, 255, 255, 0.3) ${vw(16, 'mobile')}), linear-gradient(to bottom, #BB8F43, #DFBF23)`,
            md: `repeating-linear-gradient(-45deg, transparent, transparent ${vw(8)}, rgba(255, 255, 255, 0.3) ${vw(8)}, rgba(255, 255, 255, 0.3) ${vw(16)}), linear-gradient(to bottom, #BB8F43, #DFBF23)`,
          },
          backgroundRepeat: 'repeat, no-repeat',
          backgroundSize: 'auto, 100% 100%',
          backgroundPosition: 'left top, left top',

          position: 'relative',

          // Responsive padding and clipPath (2-tier)
          padding: { xs: vw(16, 'mobile'), md: vw(32) },
          clipPath: {
            xs: createZigzagPolygon(getZigzagCount('xs'), vw(innerDepth.xs, 'mobile')),
            md: createZigzagPolygon(getZigzagCount('md'), vw(innerDepth.md)),
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            color: 'white',
            fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
            textShadow: {
              xs: `${vw(1, 'mobile')} ${vw(1, 'mobile')} ${vw(2, 'mobile')} rgba(0, 0, 0, 0.3), 0px 0px ${vw(1, 'mobile')} rgba(0, 0, 0, 0.5)`,
              md: `${vw(1)} ${vw(1)} ${vw(2)} rgba(0, 0, 0, 0.3), 0px 0px ${vw(1)} rgba(0, 0, 0, 0.5)`,
            },
            fontSize: rvw(24, 56),
          }}
        >
          {title.includes('&') ? (
            <>
              {title.split('&')[0]?.trim()}
              <br />
              & {title.split('&')[1]?.trim()}
            </>
          ) : (
            title
          )}
        </Typography>
        </Box>
      </Box>

      {/* Description text below the zigzag banner */}
      <Box
        sx={{
          px: rvw(30, 30),
        }}
      >
        <Stack spacing={rvw(8, 8)}>
          {Array.isArray(bodyContent) ? (
            <>
              {/* On xs screens, combine all paragraphs into one */}
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Typography
                  sx={{
                    color: '#432F2F',
                    fontSize: rvw(18, 21),
                    lineHeight: 1.6,
                    textAlign: 'center',
                    fontWeight: 500,
                  }}
                >
                  {bodyContent.join(' ')}
                </Typography>
              </Box>
              {/* On md+ screens, keep separate paragraphs */}
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Stack spacing={rvw(8, 8)}>
                  {bodyContent.map((p, i) => (
                    <Typography
                      key={i}
                      sx={{
                        color: '#432F2F',
                        fontSize: rvw(18, 21),
                        lineHeight: 1.6,
                        textAlign: 'center',
                        fontWeight: 500,
                      }}
                    >
                      {p}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </>
          ) : (
            <Typography
              sx={{
                color: '#432F2F',
                fontSize: rvw(18, 21),
                lineHeight: 1.6,
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              {bodyContent}
            </Typography>
          )}
        </Stack>
      </Box>

      {section.links?.map((l) => (
        <GlowPillButton
          key={l.href}
          href={l.href}
          sx={{ alignSelf: 'center', width: 'fit-content' }}
        >
          {linkLabel}
        </GlowPillButton>
      ))}

          {/* Display carousel if images are provided */}
          {(section as any).images && (section as any).images.length > 0 && (
            <ControllableCarousel images={(section as any).images} />
          )}

        </Stack>
      </Section>
    </Box>
  );
}
