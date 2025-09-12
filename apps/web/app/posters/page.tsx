"use client";

import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import SubsectionBox from '@/components/SubsectionBox';
import PageFooter from '@/components/PageFooter';
import { useTranslation } from '@/hooks/useTranslation';

export default function PostersPage() {
  const { t } = useTranslation();
  
  // Create translated content structure  
  const introSection = {
    type: 'intro' as const,
    title: t('pages.posters.wallNewspapersTitle'),
    body: t('pages.posters.wallNewspapersDescription'),
    time: '2014-2017'
  };
  
  const gallerySections = [
    {
      type: 'gallery' as const,
      title: 'High School 1',
      body: t('pages.posters.highSchool1Description'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407917/joeyhougallery/posters/IMG_0949_wm7cwx.jpg",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407917/joeyhougallery/posters/IMG_0950_w7fhod.jpg"
      ]
    },
    {
      type: 'gallery' as const,
      title: 'High School 2',
      body: t('pages.posters.highSchool2Description'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407917/joeyhougallery/posters/IMG_0953_vuilc2.jpg"
      ]
    },
    {
      type: 'gallery' as const,
      title: 'High School 3',
      body: t('pages.posters.highSchool3Description'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407917/joeyhougallery/posters/IMG_0955_s8ia2h.jpg"
      ]
    }
  ];
  
  return (
    <PageHeader pageKey="posters">
      <MainSection section={introSection} time={introSection.time} isFirst={true} />

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
