"use client";

import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import Subsection from '@/components/Subsection';
import PageFooter from '@/components/PageFooter';
import { useTranslation } from '@/hooks/useTranslation';

export default function ReportsPage() {
  const { t } = useTranslation();
  
  // Create translated content structure
  const introSection = {
    type: 'intro' as const,
    title: t('pages.reports.featuredTitle'),
    body: t('pages.reports.featuredDescription'),
    time: '2019-2022'
  };
  
  const gallerySections = [
    {
      type: 'gallery' as const,
      title: t('pages.reports.templateTitle'),
      body: t('pages.reports.templateDescription'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639372416/joeyhougallery/reports/IMG_8757_bkgvdc.jpg",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639372417/joeyhougallery/reports/IMG_8758_nabudq.jpg"
      ]
    },
    {
      type: 'gallery' as const,
      title: t('pages.reports.hungarianTitle'),
      body: t('pages.reports.hungarianDescription'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639376152/joeyhougallery/reports/Hungarian/IMG_8767_jdqdw4.jpg",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639376161/joeyhougallery/reports/Hungarian/IMG_8768_cwlfmh.jpg",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639376171/joeyhougallery/reports/Hungarian/IMG_8769_q5dsry.jpg",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639376185/joeyhougallery/reports/Hungarian/IMG_8770_tm7iji.jpg"
      ]
    },
    {
      type: 'gallery' as const,
      title: t('pages.reports.csTitle'),
      body: t('pages.reports.csDescription'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639373173/joeyhougallery/reports/CS%20Theory/IMG_8763_hjk0om.jpg",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639373166/joeyhougallery/reports/CS%20Theory/IMG_8760_jdlaye.jpg",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639373169/joeyhougallery/reports/CS%20Theory/IMG_8762_ozmopo.jpg",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639373178/joeyhougallery/reports/CS%20Theory/%E7%85%A7%E7%89%87_2021-12-13_12.25.18_%E4%B8%8A%E5%8D%88_wunz16.jpg"
      ]
    },
    {
      type: 'gallery' as const,
      title: t('pages.reports.mathTitle'),
      body: t('pages.reports.mathDescription'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639375168/joeyhougallery/reports/ODE/IMG_8765_n7zgq7.jpg",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1639375176/joeyhougallery/reports/ODE/IMG_8766_syxy0a.jpg"
      ]
    }
  ];
  
  // Background images for each subsection
  const backgroundImages = [
    '/backgrounds/subsection_background_1.png',
    '/backgrounds/subsection_background_2.png', 
    '/backgrounds/subsection_background_3.png',
    '/backgrounds/subsection_background_1.png' // Cycle back for 4th section
  ];

  // Custom colors for each subsection
  const customColors: ('red' | 'blue' | 'green')[] = ['blue', 'red', 'green', 'blue'];
  
  // Years for each subsection
  const years = ['2020-2022', 'Course 1 - 2020', 'Course 2 - 2020', 'Course 3 - 2020'];
  
  return (
    <PageHeader pageKey="reports">
      <MainSection section={introSection} time={introSection.time} isFirst={true} />

      {gallerySections.map((s, i) => (
        <Subsection 
          key={i}
          section={s} 
          index={i}
          year={years[i]}
          title={s.title}
          backgroundImage={backgroundImages[i]}
          carouselImages={s.images}
          carouselSpacing={6}
          zIndex={4 - i} // Decreasing z-index for proper layering
          customColor={customColors[i]}
          extendBackground={i === 3} // Apply extendBackground to the last subsection (Ordinary Differential Equations)
          hideImages={true} // Hide images in SubsectionBox on reports page, show them in carousels instead
        />
      ))}

      <PageFooter />
    </PageHeader>
  );
}
