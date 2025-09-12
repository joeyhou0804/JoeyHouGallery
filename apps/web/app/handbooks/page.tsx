"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import TextBlock from '@/components/TextBlock';
import MainSection from '@/components/MainSection';
import Subsection from '@/components/Subsection';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { GlowPillButton } from '../apps/GlowPillButton';
import PageFooter from '@/components/PageFooter';
import { useTranslation } from '@/hooks/useTranslation';

export default function HandbooksPage() {
  const { t } = useTranslation();
  
  // Create translated content structure
  const admissionSection = {
    type: 'intro' as const,
    title: t('pages.handbooks.admissionPediaTitle'),
    body: t('pages.handbooks.admissionPediaDescription'),
  };

  const simplifiedSection = {
    type: 'intro' as const,
    title: t('pages.handbooks.simplifiedTitle'),
    links: [
      { label: t('pages.handbooks.downloadCityU'), href: "https://40a431a6-5c85-45f3-b955-58c8e40d7db4.filesusr.com/ugd/6a9383_014e1a0451a1438a8f1b090e55967da3.pdf" },
      { label: t('pages.handbooks.downloadColumbia'), href: "https://40a431a6-5c85-45f3-b955-58c8e40d7db4.filesusr.com/ugd/6a9383_6581e003ac7e47429655508e49198406.pdf" }
    ]
  };

  const traditionalSection = {
    type: 'intro' as const,
    title: t('pages.handbooks.traditionalTitle'),
    links: [
      { label: t('pages.handbooks.downloadCityU'), href: "https://40a431a6-5c85-45f3-b955-58c8e40d7db4.filesusr.com/ugd/6a9383_7eb71bbd629145ffbe84c3c0754bb7bc.pdf" },
      { label: t('pages.handbooks.downloadColumbia'), href: "https://40a431a6-5c85-45f3-b955-58c8e40d7db4.filesusr.com/ugd/6a9383_e9f8a4b95f7146c2a0fa3b5ba9d56502.pdf" }
    ]
  };

  const englishSection = {
    type: 'intro' as const,
    title: t('pages.handbooks.englishTitle'),
    links: [
      { label: t('pages.handbooks.downloadCityU'), href: "https://40a431a6-5c85-45f3-b955-58c8e40d7db4.filesusr.com/ugd/6a9383_b59f2b2b34854d32bce83b1f0c2dd6c2.pdf" }
    ]
  };

  const musicSection = {
    type: 'intro' as const,
    title: t('pages.handbooks.musicTitle'),
    body: t('pages.handbooks.musicDescription'),
    time: '2018.06',
    links: [
      { label: t('pages.handbooks.downloadTextbook'), href: "https://40a431a6-5c85-45f3-b955-58c8e40d7db4.filesusr.com/ugd/6a9383_22eb6cd3c73a43ef8a4b89df506e82f9.pdf" }
    ],
    images: [
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638423030/joeyhougallery/handbooks/Music/IMG_4255_rwycth.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638423030/joeyhougallery/handbooks/Music/IMG_4256_ioek0q.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638423034/joeyhougallery/handbooks/Music/IMG_4257_h8k7no.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638423030/joeyhougallery/handbooks/Music/IMG_4258_jo8j9t.jpg"
    ]
  };

  // Static images arrays
  const simplifiedOriginalImages = [
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409686/joeyhougallery/handbooks/Admission-pedia/%E7%AE%80%E4%BD%93/IMG_7695.PNG_h0fnln.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409685/joeyhougallery/handbooks/Admission-pedia/%E7%AE%80%E4%BD%93/IMG_7700.PNG_jc51yy.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409683/joeyhougallery/handbooks/Admission-pedia/%E7%AE%80%E4%BD%93/IMG_7696.PNG_utqe5e.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409683/joeyhougallery/handbooks/Admission-pedia/%E7%AE%80%E4%BD%93/IMG_7697.PNG_npawrf.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409683/joeyhougallery/handbooks/Admission-pedia/%E7%AE%80%E4%BD%93/IMG_7698.PNG_er8mgj.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409684/joeyhougallery/handbooks/Admission-pedia/%E7%AE%80%E4%BD%93/IMG_7699.PNG_chhlad.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409683/joeyhougallery/handbooks/Admission-pedia/%E7%AE%80%E4%BD%93/IMG_7701.PNG_xycp5f.png"
  ];
  
  const simplifiedExampleImages = [
    simplifiedOriginalImages[0], // 0
    simplifiedOriginalImages[2], // 2
    simplifiedOriginalImages[3], // 3
    simplifiedOriginalImages[4], // 4
    simplifiedOriginalImages[5], // 5
    simplifiedOriginalImages[1], // 1 (moved to second-to-last)
    simplifiedOriginalImages[6]  // 6
  ].filter(Boolean) as string[]; // Remove any undefined values

  const traditionalExampleImages = [
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409913/joeyhougallery/handbooks/Admission-pedia/%E7%B9%81%E9%AB%94/IMG_7702.PNG_hc9u8u.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409914/joeyhougallery/handbooks/Admission-pedia/%E7%B9%81%E9%AB%94/IMG_7703.PNG_rk6ndc.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409914/joeyhougallery/handbooks/Admission-pedia/%E7%B9%81%E9%AB%94/IMG_7704.PNG_mwvszw.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409914/joeyhougallery/handbooks/Admission-pedia/%E7%B9%81%E9%AB%94/IMG_7705.PNG_kgbr2z.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409914/joeyhougallery/handbooks/Admission-pedia/%E7%B9%81%E9%AB%94/IMG_7706.PNG_cvzlhk.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409915/joeyhougallery/handbooks/Admission-pedia/%E7%B9%81%E9%AB%94/IMG_7707.PNG_iqccqb.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409916/joeyhougallery/handbooks/Admission-pedia/%E7%B9%81%E9%AB%94/IMG_7708.PNG_fzfj2e.png"
  ];

  const englishExampleImages = [
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409684/joeyhougallery/handbooks/Admission-pedia/English/IMG_8216.PNG_y5afkq.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409683/joeyhougallery/handbooks/Admission-pedia/English/IMG_8217.PNG_coztwk.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409683/joeyhougallery/handbooks/Admission-pedia/English/IMG_8218.PNG_sfmprt.png",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638409683/joeyhougallery/handbooks/Admission-pedia/English/IMG_8219_fmdvkz.png"
  ];

  // Custom images for first Simplified Chinese section (zh_cn_1 to zh_cn_5)
  const firstSimplifiedImages = [
    '/zh_cn_1.png',
    '/zh_cn_2.png', 
    '/zh_cn_3.png',
    '/zh_cn_4.png',
    '/zh_cn_5.png'
  ];

  // Custom order array for Subsection components
  const customOrder = [
    // 1. Simplified Chinese Version (first)
    <Subsection 
      key="simplified-1"
      section={simplifiedSection} 
      index={0} 
      year="2025"
      title={t('pages.handbooks.simplifiedTitle')}
      carouselImages={firstSimplifiedImages}
      carouselSpacing={6}
      zIndex={4}
      customColor="red"
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
        {simplifiedSection?.links?.slice(1).map((l: any) => (
          <GlowPillButton
            key={l.href}
            href={l.href}
            rel="noreferrer"
          >
            {l.label}
          </GlowPillButton>
        ))}
      </Stack>
    </Subsection>,

    // 2. English Version
    <Subsection 
      key="english"
      section={englishSection} 
      index={2} 
      year="2019"
      title={t('pages.handbooks.englishTitle')}
      backgroundImage="/backgrounds/subsection_background_3.png"
      carouselImages={englishExampleImages}
      carouselSpacing={6}
      zIndex={3}
      customColor="blue"
    >
      <Box sx={{ textAlign: 'center' }}>
        {englishSection?.links?.[0] && (
          <GlowPillButton
            href={englishSection.links[0].href}
            rel="noreferrer"
          >
            {englishSection.links[0].label}
          </GlowPillButton>
        )}
      </Box>
    </Subsection>,

    // 3. Traditional Chinese Version
    <Subsection 
      key="traditional"
      section={traditionalSection} 
      index={1} 
      year="2019"
      title={t('pages.handbooks.traditionalTitle')}
      backgroundImage="/backgrounds/subsection_background_2.png"
      carouselImages={traditionalExampleImages}
      carouselSpacing={6}
      zIndex={2}
      customColor="green"
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
        {traditionalSection?.links?.map((l: any) => (
          <GlowPillButton
            key={l.href}
            href={l.href}
            rel="noreferrer"
          >
            {l.label}
          </GlowPillButton>
        ))}
      </Stack>
    </Subsection>,

    // 4. Simplified Chinese Version (second copy)
    <Subsection 
      key="simplified-2"
      section={simplifiedSection} 
      index={0} 
      year="2019"
      title={t('pages.handbooks.simplifiedTitle')}
      carouselImages={simplifiedExampleImages}
      carouselSpacing={6}
      zIndex={1}
      customColor="red"
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
        {simplifiedSection?.links?.map((l: any) => (
          <GlowPillButton
            key={l.href}
            href={l.href}
            rel="noreferrer"
          >
            {l.label}
          </GlowPillButton>
        ))}
      </Stack>
    </Subsection>
  ];

  return (
    <PageHeader pageKey="handbooks">
      {/* MainSection for Admission-pedia */}
      <MainSection 
        section={admissionSection} 
        time="2019‑2025" 
        isFirst={true} 
      />
      
      {/* Custom ordered Subsection components */}
      {customOrder}
      
      {/* Music Tutorial Textbook MainSection */}
      <Box sx={{ marginTop: '-40px' }}>
        <MainSection 
          section={musicSection} 
          time="2018.06" 
          isFirst={false} 
          extraTopPadding={40}
          extendBackground={true}
        />
      </Box>
      
      <PageFooter />
    </PageHeader>
  );
}
