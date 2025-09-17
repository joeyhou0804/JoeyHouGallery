"use client";

import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import SubsectionBox from '@/components/SubsectionBox';
import PageFooter from '@/components/PageFooter';
import PageLoadingScreen from '@/components/PageLoadingScreen';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageLoading } from '@/hooks/usePageLoading';

export default function PostersPage() {
  const { t } = useTranslation();
  const { isLoading, progress } = usePageLoading({ duration: 1000 });

  if (isLoading) {
    return <PageLoadingScreen progress={progress} title={t('posters')} />;
  }

  // Create translated content structure
  const capstoneSection = {
    type: 'intro' as const,
    title: t('pages.posters.capstoneTitle'),
    body: t('pages.posters.capstoneDescription'),
    time: '2023.05'
  };

  const introSection = {
    type: 'intro' as const,
    title: t('pages.posters.wallNewspapersTitle'),
    body: t('pages.posters.wallNewspapersDescription'),
    time: '2014-2017'
  };

  const capstoneGallerySection = {
    type: 'gallery' as const,
    title: t('pages.posters.projectPosterTitle'),
    body: t('pages.posters.projectPosterDescription'),
    images: ['/181B-poster.png']
  };

  const gallerySections = [
    {
      type: 'gallery' as const,
      title: t('pages.posters.highSchool1Title'),
      body: t('pages.posters.highSchool1Description'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407917/joeyhougallery/posters/IMG_0949_wm7cwx.jpg",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407917/joeyhougallery/posters/IMG_0950_w7fhod.jpg"
      ]
    },
    {
      type: 'gallery' as const,
      title: t('pages.posters.highSchool2Title'),
      body: t('pages.posters.highSchool2Description'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407917/joeyhougallery/posters/IMG_0953_vuilc2.jpg"
      ]
    },
    {
      type: 'gallery' as const,
      title: t('pages.posters.highSchool3Title'),
      body: t('pages.posters.highSchool3Description'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407917/joeyhougallery/posters/IMG_0955_s8ia2h.jpg"
      ]
    }
  ];
  
  return (
    <PageHeader pageKey="posters">
      <MainSection section={capstoneSection} time={capstoneSection.time} isFirst={true} />

      <Section>
        <SubsectionBox section={capstoneGallerySection} index={0} imageLayout="centered-single" sx={{ mb: 12 }} />
      </Section>

      <MainSection section={introSection} time={introSection.time} />

      {gallerySections.map((s, i) => {
        // Determine the image layout based on the subsection index
        let imageLayout: 'default' | 'centered-single' | 'centered-stacked' = 'default';
        if (i === 0) {
          imageLayout = 'centered-stacked'; // High School 1 - Two images stacked
        } else if (i === 1 || i === 2) {
          imageLayout = 'centered-single'; // High School 2 & 3 - Single image centered
        }

        return (
          <Section key={i}>
            <SubsectionBox section={s} index={i} imageLayout={imageLayout} />
          </Section>
        );
      })}

      <PageFooter />
    </PageHeader>
  );
}
