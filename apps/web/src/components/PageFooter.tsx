"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Image from 'next/image';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from '@/hooks/useTranslation';
import { useAtom } from 'jotai';
import { languageAtom, Language } from '@joey/atoms';
import { vw, rvw } from '@/utils/scaling';

export default function PageFooter() {
  const { t, language } = useTranslation();
  const [currentLanguage, setLanguage] = useAtom(languageAtom);
  
  const handleLanguageSwitch = () => {
    const newLanguage: Language = currentLanguage === 'en' ? 'zh-CN' : 'en';
    setLanguage(newLanguage);
  };

  const sections = [
    { href: '/apps', labelKey: 'sectionsLabels.applications', buttonIndex: 1 },
    { href: '/arts', labelKey: 'sectionsLabels.arts', buttonIndex: 2 },
    { href: '/handbooks', labelKey: 'sectionsLabels.handbooks', buttonIndex: 3 },
    { href: '/posters', labelKey: 'sectionsLabels.posters', buttonIndex: 4 },
    { href: '/reports', labelKey: 'sectionsLabels.reports', buttonIndex: 5 },
    { href: '/videos', labelKey: 'sectionsLabels.videos', buttonIndex: 6 },
    { href: '/websites', labelKey: 'sectionsLabels.websites', buttonIndex: 7 }
  ];

  return (
    <Box sx={{ position: 'relative', mt: { xs: vw(-20, 'mobile'), md: vw(-20) }, zIndex: 10 }}>
      {/* Yellow striped section with zigzag patterns */}
      <Box
        sx={(theme) => {
          const depth = { xs: 6, md: 10 };
          const steps = {
            xs: 40,   // 20 teeth on mobile
            md: 120,  // 60 teeth on desktop
          };

          const makeClip = (d: string, s: number) => `polygon(
            0% 0%,
            ${Array.from({ length: s + 1 }, (_, i) => {
              const x = (i / s) * 100;
              const isPeak = i % 2 === 0;
              const y = isPeak ? '0%' : d;
              return `${x.toFixed(2)}% ${y}`;
            }).join(', ')},
            100% 0%, 100% calc(100% - ${d}),
            ${Array.from({ length: s + 1 }, (_, i) => {
              const x = ((s - i) / s) * 100;
              const isPeak = i % 2 === 0;
              const y = isPeak ? '100%' : `calc(100% - ${d})`;
              return `${x.toFixed(2)}% ${y}`;
            }).join(', ')},
            0% calc(100% - ${d}), 0% 0%
          )`;

          return {
            position: 'relative',
            width: '100vw',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            minHeight: { xs: vw(160, 'mobile'), md: vw(160) },
            mt: rvw(64, 64),
            mb: 0,
            overflow: 'visible',
            zIndex: 0,

            '--yellow': '#FED936',

            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'var(--yellow)',
              backgroundImage: 'var(--stripe)',
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto',
              backgroundPosition: 'left top',
              pointerEvents: 'none',
              zIndex: 0,

              [theme.breakpoints.up('xs')]: {
                '--stripe': `repeating-linear-gradient(-45deg, transparent, transparent ${vw(8, 'mobile')}, rgba(255, 255, 255, 0.3) ${vw(8, 'mobile')}, rgba(255, 255, 255, 0.3) ${vw(16, 'mobile')})`,
                clipPath: makeClip(vw(depth.xs, 'mobile'), steps.xs),
              },
              [theme.breakpoints.up('md')]: {
                '--stripe': `repeating-linear-gradient(-45deg, transparent, transparent ${vw(8)}, rgba(255, 255, 255, 0.3) ${vw(8)}, rgba(255, 255, 255, 0.3) ${vw(16)})`,
                clipPath: makeClip(vw(depth.md), steps.md),
              },
            },

            '& > .content': {
              position: 'relative',
              zIndex: 1,
            },
          };
        }}
      >
        <Container
          className="content"
          maxWidth="xl"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-end' },
            justifyContent: { xs: 'center', md: 'space-between' },
            px: rvw(32, 32),
            pt: rvw(48, 48),
            pb: rvw(32, 32),
          }}
        >
          {/* Logo */}
          <Box sx={{
            position: 'relative',
            height: { xs: 'auto', md: vw(80) },
            display: 'flex',
            alignItems: { xs: 'center', md: 'flex-end' },
            justifyContent: { xs: 'center', md: 'flex-start' },
            zIndex: 2,
            mb: { xs: vw(64, 'mobile'), md: 0 }
          }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  position: 'absolute',
                  bottom: { xs: vw(-60, 'mobile'), md: 0 },
                  left: { xs: '50%', md: language === 'zh-CN' ? vw(40) : 0 },
                  transform: { xs: 'translateX(-50%)', md: 'none' },
                  '&:hover': { transform: { xs: 'translateX(-50%) scale(1.05)', md: 'scale(1.05)' } },
                }}
              >
                <Box
                  component="img"
                  src={language === 'zh-CN' ? '/logos/logo_plain_cn.png' : '/logos/logo_plain_en.png'}
                  alt={language === 'zh-CN' ? '小猴同学作品集' : "Joey Hou's Gallery"}
                  sx={{
                    width: 'auto',
                    height: rvw(180, 180),
                    maxWidth: rvw(600, 600),
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Link>
          </Box>

          {/* Navigation buttons */}
          <Box sx={{
            display: 'grid',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-end' },
            gridTemplateColumns: { xs: 'repeat(4, 1fr)', md: 'repeat(8, 1fr)' },
            gridTemplateRows: { xs: 'repeat(2, 1fr)', md: '1fr' },
          }}>
            {/* Language switching button - first */}
            <Box
              onClick={handleLanguageSwitch}
              sx={{
                cursor: 'pointer',
                gridColumn: '1',
                gridRow: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box sx={{ position: 'relative', height: { xs: vw(80, 'mobile'), md: vw(100) }, width: { xs: vw(80, 'mobile'), md: vw(100) } }}>
                <Image
                  src={language === 'zh-CN' ? '/buttons/button_homepage_cn_8.png' : '/buttons/button_homepage_en_8.png'}
                  alt={language === 'zh-CN' ? '切换到英文' : 'Switch to Chinese'}
                  fill
                  sizes="200px"
                  style={{
                    objectFit: 'contain',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
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

            {/* All section buttons */}
            {sections.map((s, index) => {
              const buttonImage = language === 'zh-CN'
                ? `/buttons/button_homepage_cn_${s.buttonIndex}.png`
                : `/buttons/button_homepage_en_${s.buttonIndex}.png`;

              const buttonPosition = index + 2; // +2 because language button is position 1

              return (
                <Box
                  key={s.href}
                  sx={{
                    gridColumn: {
                      xs: (buttonPosition <= 4 ? buttonPosition : buttonPosition - 4).toString(),
                      md: buttonPosition.toString(),
                    },
                    gridRow: {
                      xs: buttonPosition <= 4 ? '1' : '2',
                      md: '1',
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Link href={s.href}>
                    <Box sx={{ position: 'relative', height: { xs: vw(80, 'mobile'), md: vw(100) }, width: { xs: vw(80, 'mobile'), md: vw(100) } }}>
                      <Image
                        src={buttonImage}
                        alt={t(s.labelKey)}
                        fill
                        sizes="200px"
                        style={{
                          objectFit: 'contain',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease, opacity 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </Box>
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Footer row below the yellow area */}
      <Box
        sx={{
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          position: 'relative',
          backgroundColor: '#2B91E1',
          px: 0,
          py: rvw(8, 8),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: rvw(12, 12),
            mt: rvw(8, 8),
            mb: rvw(8, 8),
            pl: rvw(32, 32),
          }}
        >
          <Box
            component="p"
            sx={{
              fontSize: rvw(18, 21),
              color: 'white',
              lineHeight: 1.6,
              fontWeight: 500,
              m: 0,
            }}
          >
            {t('ui.madeBy')}
          </Box>

          <Box sx={{ display: 'flex', gap: rvw(4, 4) }}>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/joey1m/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'white',
                p: rvw(4, 4),
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              <LinkedInIcon sx={{ fontSize: rvw(18, 21) }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.facebook.com/JoeyHouKun"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'white',
                p: rvw(4, 4),
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              <FacebookIcon sx={{ fontSize: rvw(18, 21) }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.instagram.com/joeyhou0804/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'white',
                p: rvw(4, 4),
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              <InstagramIcon sx={{ fontSize: rvw(18, 21) }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://github.com/joeyhou0804"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'white',
                p: rvw(4, 4),
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              <GitHubIcon sx={{ fontSize: rvw(18, 21) }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}