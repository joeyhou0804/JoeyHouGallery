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

  // Tweak these if you want a different ratio:
  // edge tracks (bigger) vs inner gap tracks (smaller)
  const EDGE_FR = 2;     // bigger "edge" gutters
  const INNER_FR = 1;    // smaller gaps between clusters and logo

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        // 7 tracks on md+: edge | left cluster | inner gap | logo | inner gap | right cluster | edge
        gridTemplateColumns: {
          xs: '1fr', // stack on mobile
          md: `${EDGE_FR}fr auto ${INNER_FR}fr minmax(320px, 600px) ${INNER_FR}fr auto ${EDGE_FR}fr`,
        },
        alignItems: 'center',
        // no uniform grid gap—gaps are modeled as dedicated FR tracks
        backgroundImage: `url(/backgrounds/homepage_background.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        // full viewport height centering
        minWidth: 0,
      }}
    >
      {/* Left cluster (md+: column 2). On mobile, row 1 */}
      <Box
        sx={{
          gridColumn: { xs: '1', md: '2' },
          justifySelf: { xs: 'center', md: 'center' },
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 140px)',
          gridTemplateRows: 'repeat(2, 120px)',
          gap: 2,
          justifyItems: 'center',
          alignItems: 'center',
          width: 296,
          height: 256,
          transform: { xs: 'scale(0.9)', sm: 'scale(1)' },
          my: { xs: 3, md: 0 },
        }}
      >
        {sections.slice(0, 4).map((s) => {
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </Link>
          );
        })}
      </Box>

      {/* Center logo (md+: column 4). On mobile, row 2 */}
      <Box
        sx={{
          gridColumn: { xs: '1', md: '4' },
          justifySelf: 'center',
          alignSelf: 'center',
          width: { xs: '100%', md: 600 },
          height: { xs: 300, md: 500 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: { xs: 1, md: 0 },
        }}
      >
        <Image
          src={language === 'zh-CN' ? '/logos/logo_cn.png' : '/logos/logo_en.png'}
          alt={language === 'zh-CN' ? '小猴同学作品集' : "Joey Hou's Gallery"}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: 'auto',
            height: '100%',
            maxWidth: '600px',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Right cluster (md+: column 6). On mobile, row 3 */}
      <Box
        sx={{
          gridColumn: { xs: '1', md: '6' },
          justifySelf: { xs: 'center', md: 'center' },
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 140px)',
          gridTemplateRows: 'repeat(2, 120px)',
          gap: 2,
          justifyItems: 'center',
          alignItems: 'center',
          width: 296,
          height: 256,
          transform: { xs: 'scale(0.9)', sm: 'scale(1)' },
          my: { xs: 3, md: 0 },
        }}
      >
        {sections.slice(4, 7).map((s) => {
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </Link>
          );
        })}

        {/* Language switching button */}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}