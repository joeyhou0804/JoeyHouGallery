"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url(/backgrounds/homepage_background.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff'
    }}>
      <Container sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ 
          textAlign: 'center', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 3
        }}>
          
          {/* Left cluster: 2x2 buttons */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 140px)',
            gridTemplateRows: 'repeat(2, 120px)',
            gap: 2,
            justifyItems: 'center',
            alignItems: 'center',
            width: '296px',
            height: '256px'
          }}>
            {sections.slice(0, 4).map((s) => {
              const buttonImage = language === 'zh-CN' 
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
          
          {/* Center logo */}
          <Box sx={{ 
            mx: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '600px',
            height: '500px'
          }}>
            <Image
              src={language === 'zh-CN' ? '/logos/logo_cn.png' : '/logos/logo_en.png'}
              alt={language === 'zh-CN' ? '小猴同学作品集' : "Joey Hou's Gallery"}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: 'auto',
                height: '500px',
                maxWidth: '600px',
                objectFit: 'contain',
              }}
            />
          </Box>
          
          {/* Right cluster: 2x2 buttons */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 140px)',
            gridTemplateRows: 'repeat(2, 120px)',
            gap: 2,
            justifyItems: 'center',
            alignItems: 'center',
            width: '296px',
            height: '256px'
          }}>
            {sections.slice(4, 7).map((s) => {
              const buttonImage = language === 'zh-CN' 
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
            <Box onClick={handleLanguageSwitch}>
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
      </Container>
    </Box>
  );
}
