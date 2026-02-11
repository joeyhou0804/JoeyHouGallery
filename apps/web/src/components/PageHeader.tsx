"use client";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Section from './Section';
import PageBackground from './PageBackground';
import { useTranslation } from '@/hooks/useTranslation';
import ColorizedMarioText from './ColorizedMarioText';
import { vw, rvw } from '@/utils/scaling';

interface PageHeaderProps {
  pageKey: 'applications' | 'apps' | 'arts' | 'handbooks' | 'posters' | 'reports' | 'videos' | 'websites';
  children?: React.ReactNode;
}

export default function PageHeader({ pageKey, children }: PageHeaderProps) {
  const { t, language } = useTranslation();

  // Map pageKey to character image filename
  const getCharacterImage = (key: string) => {
    const mapping: Record<string, string> = {
      'applications': 'character_app.png',
      'apps': 'character_app.png',
      'arts': 'character_art.png',
      'handbooks': 'character_handbook.png',
      'posters': 'character_poster.png',
      'reports': 'character_report.png',
      'videos': 'character_video.png',
      'websites': 'character_website.png'
    };
    return mapping[key] || 'character_app.png'; // fallback
  };

  return (
    <PageBackground>
      {/* Light blue section with title and zigzag bottom */}
      <Box
        sx={(theme) => {
          const steps = { xs: 40, md: 120 };
          const dXs = vw(6, 'mobile');
          const dMd = vw(10);

          return {
            // one background, so no phase/mismatch issues
            backgroundRepeat: 'repeat, no-repeat',
            backgroundSize: 'auto, 100% 100%',
            backgroundPosition: 'left top, left top',

            position: 'relative',
            zIndex: 10,
            paddingTop: rvw(8, 16),
            marginBottom: 0,

            // Responsive zigzag bottom
            [theme.breakpoints.up('xs')]: {
              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent ${vw(8, 'mobile')}, rgba(255, 255, 255, 0.3) ${vw(8, 'mobile')}, rgba(255, 255, 255, 0.3) ${vw(16, 'mobile')}), linear-gradient(to bottom, #6BB6E0, #87CEEB)`,
              paddingBottom: vw(10, 'mobile'),
              clipPath: `polygon(
                0% 0%, 100% 0%,
                100% calc(100% - ${dXs}),
                ${Array.from({ length: steps.xs + 1 }, (_, i) => {
                  const x = ((steps.xs - i) / steps.xs) * 100;
                  const isPeak = i % 2 === 0;
                  const y = isPeak ? '100%' : `calc(100% - ${dXs})`;
                  return `${x.toFixed(2)}% ${y}`;
                }).join(', ')},
                0% calc(100% - ${dXs})
              )`,
            },
            [theme.breakpoints.up('md')]: {
              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent ${vw(8)}, rgba(255, 255, 255, 0.3) ${vw(8)}, rgba(255, 255, 255, 0.3) ${vw(16)}), linear-gradient(to bottom, #6BB6E0, #87CEEB)`,
              paddingBottom: vw(22),
              clipPath: `polygon(
                0% 0%, 100% 0%,
                100% calc(100% - ${dMd}),
                ${Array.from({ length: steps.md + 1 }, (_, i) => {
                  const x = ((steps.md - i) / steps.md) * 100;
                  const isPeak = i % 2 === 0;
                  const y = isPeak ? '100%' : `calc(100% - ${dMd})`;
                  return `${x.toFixed(2)}% ${y}`;
                }).join(', ')},
                0% calc(100% - ${dMd})
              )`,
            },
          };
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', height: rvw(180, 300) }}>
          {/* Container for character and title - left aligned on mobile, centered on larger screens */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              gap: rvw(12, 24),
              zIndex: 2
            }}
          >
            {/* Character image on the left - responsive size */}
            <Box sx={{ height: rvw(140, 240), maxWidth: rvw(180, 400) }}>
              <Image
                src={`/titles/${getCharacterImage(pageKey)}`}
                alt={`${pageKey} character`}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>

            {/* Title on the right */}
            <Box>
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontFamily: language === 'zh-CN' ? 'MarioChinese, Mario, sans-serif' : 'Mario, sans-serif',
                  textShadow: {
                    xs: `${vw(1, 'mobile')} ${vw(1, 'mobile')} ${vw(2, 'mobile')} rgba(0, 0, 0, 0.3), 0px 0px ${vw(1, 'mobile')} rgba(0, 0, 0, 0.5)`,
                    md: `${vw(1)} ${vw(1)} ${vw(2)} rgba(0, 0, 0, 0.3), 0px 0px ${vw(1)} rgba(0, 0, 0, 0.5)`,
                  },
                  fontSize: rvw(26, 72),
                  textAlign: 'left',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  writingMode: 'horizontal-tb',
                  textOrientation: 'mixed'
                }}
              >
                {t(`pages.${pageKey}.title`)}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {children}
    </PageBackground>
  );
}
