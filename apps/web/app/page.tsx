"use client";

import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { useAtom } from 'jotai';
import { languageAtom, Language } from '@joey/atoms';

const sections = [
  { href: '/apps', labelKey: 'sectionsLabels.applications', buttonIndex: 1 },
  { href: '/arts', labelKey: 'sectionsLabels.arts', buttonIndex: 2 },
  { href: '/handbooks', labelKey: 'sectionsLabels.handbooks', buttonIndex: 3 },
  { href: '/posters', labelKey: 'sectionsLabels.posters', buttonIndex: 4 },
  { href: '/reports', labelKey: 'sectionsLabels.reports', buttonIndex: 5 },
  { href: '/videos', labelKey: 'sectionsLabels.videos', buttonIndex: 6 },
  { href: '/websites', labelKey: 'sectionsLabels.websites', buttonIndex: 7 }
];

export default function HomePage() {
  const { t, language } = useTranslation();
  const [currentLanguage, setLanguage] = useAtom(languageAtom);

  const handleLanguageSwitch = () => {
    const newLanguage: Language = currentLanguage === 'en' ? 'zh-CN' : 'en';
    setLanguage(newLanguage);
  };

  // Tunables
  const CLUSTER_W = 296;                     // cluster width (matches your grid)
  const LOGO_MIN = 320;
  const LOGO_MAX = 600;
  const EDGE_MIN = 80;                       // min outer gutter
  const INNER_MAX = 'clamp(24px, 5vw, 96px)'; // inner gap max; collapses to 0 first

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        // [edge][cluster][inner gap][logo][inner gap][cluster][edge]
        gridTemplateColumns: {
          xs: '1fr',
          md: `
            minmax(${EDGE_MIN}px, 1fr)
            ${CLUSTER_W}px
            minmax(0, ${INNER_MAX})
            minmax(${LOGO_MIN}px, ${LOGO_MAX}px)
            minmax(0, ${INNER_MAX})
            ${CLUSTER_W}px
            minmax(${EDGE_MIN}px, 1fr)
          `,
        },
        alignItems: 'center',
        backgroundImage: `url(/backgrounds/homepage_background.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        minWidth: 0,
      }}
    >
      {/* Left cluster */}
      <Box
        sx={{
          gridColumn: { xs: '1', md: '2' },
          justifySelf: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 140px)',
          gridTemplateRows: 'repeat(2, 120px)',
          gap: 2,
          justifyItems: 'center',
          alignItems: 'center',
          width: CLUSTER_W,
          height: 256,
          transform: { xs: 'scale(0.9)', sm: 'scale(1)' },
          my: { xs: 3, md: 0 },
        }}
      >
        {/* Language switching button - first position */}
        <Box onClick={handleLanguageSwitch} sx={{ cursor: 'pointer' }}>
          <Image
            src={language === 'zh-CN' ? '/buttons/button_cn_8.png' : '/buttons/button_en_8.png'}
            alt={language === 'zh-CN' ? '切换到英文' : 'Switch to Chinese'}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: 'auto',
              height: '120px',
              maxWidth: '360px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              flexShrink: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </Box>

        {/* Apps, Arts, Handbooks */}
        {sections.slice(0, 3).map((s) => {
          const buttonImage =
            language === 'zh-CN'
              ? `/buttons/button_cn_${s.buttonIndex}.png`
              : `/buttons/button_en_${s.buttonIndex}.png`;
          return (
            <Link key={s.href} href={s.href}>
              <Image
                src={buttonImage}
                alt={t(s.labelKey)}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: '120px',
                  maxWidth: '360px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                  flexShrink: 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </Link>
          );
        })}
      </Box>

      {/* Center logo */}
      <Box
        sx={{
          gridColumn: { xs: '1', md: '4' },
          justifySelf: 'center',
          alignSelf: 'center',
          // IMPORTANT: let the track size the box; don't fix width to LOGO_MAX
          width: { xs: '100%', md: '100%' },
          maxWidth: { xs: LOGO_MAX, md: LOGO_MAX },
          height: { xs: 300, md: 500 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: { xs: 1, md: 0 },
          minWidth: 0, // prevent overflow due to flex content
        }}
      >
        <Image
          src={language === 'zh-CN' ? '/logos/logo_cn.png' : '/logos/logo_en.png'}
          alt={language === 'zh-CN' ? '小猴同学作品集' : "Joey Hou's Gallery"}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',   // <= ensures it never exceeds the track
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Right cluster */}
      <Box
        sx={{
          gridColumn: { xs: '1', md: '6' },
          justifySelf: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 140px)',
          gridTemplateRows: 'repeat(2, 120px)',
          gap: 2,
          justifyItems: 'center',
          alignItems: 'center',
          width: CLUSTER_W,
          height: 256,
          transform: { xs: 'scale(0.9)', sm: 'scale(1)' },
          my: { xs: 3, md: 0 },
        }}
      >
        {/* Posters, Reports, Videos, Websites */}
        {sections.slice(3, 7).map((s) => {
          const buttonImage =
            language === 'zh-CN'
              ? `/buttons/button_cn_${s.buttonIndex}.png`
              : `/buttons/button_en_${s.buttonIndex}.png`;
          return (
            <Link key={s.href} href={s.href}>
              <Image
                src={buttonImage}
                alt={t(s.labelKey)}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: '120px',
                  maxWidth: '360px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                  flexShrink: 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
