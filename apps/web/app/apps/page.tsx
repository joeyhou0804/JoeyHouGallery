"use client";

import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import SubsectionBox from '@/components/SubsectionBox';
import Carousel from '@/components/Carousel';
import PageFooter from '@/components/PageFooter';
import { useTranslation } from '@/hooks/useTranslation';

export default function ApplicationsPage() {
  const { t, language } = useTranslation();

  // Create translated content structure
  const introSection = {
    type: 'intro' as const,
    title: t('pages.apps.stickyarTitle'),
    time: '2022.04',
    body: t('pages.apps.stickyarDescription'),
    links: [{ label: t('pages.apps.githubLabel'), href: 'https://github.com/joeyhou0804/StickyAR' }]
  };

  const gallerySections = [
    {
      type: 'gallery' as const,
      title: t('pages.apps.applicationIdeaTitle'),
      body: t('pages.apps.applicationIdeaDescription'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653460/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.54.23_pv2ni6.png"
      ]
    },
    {
      type: 'gallery' as const,
      title: t('pages.apps.highLevelOverviewTitle'),
      body: Array.isArray(t('pages.apps.highLevelOverviewDescription')) 
        ? (t('pages.apps.highLevelOverviewDescription') as string[]).join(' ')
        : t('pages.apps.highLevelOverviewDescription'),
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653460/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.54.33_upkbhu.png"
      ]
    },
    {
      type: 'gallery' as const,
      title: t('pages.apps.manipulationTitle'),
      body: Array.isArray(t('pages.apps.highLevelOverviewDescription')) 
        ? (t('pages.apps.highLevelOverviewDescription') as string[])[1] || ''
        : '',
      images: [
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653461/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.55.00_lmwf4y.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653460/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.55.04_kgugak.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653459/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.54.51_km1gfy.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653459/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.54.55_k0mz0g.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653460/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.54.38_umtn54.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653460/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.54.44_adhipq.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653461/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.55.11_eqfa2s.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653461/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.55.16_dxuiqf.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653462/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.55.07_dui1yc.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653462/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.55.19_nehmqs.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653462/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.55.28_uupbyc.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653462/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.55.32_uovebk.png",
        "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663653462/joeyhougallery/applications/%E6%88%AA%E5%B1%8F2022-09-19_%E4%B8%8B%E5%8D%8810.55.36_jvdkkj.png"
      ]
    }
  ];
  
  return (
    <PageHeader pageKey="apps">
      <MainSection section={introSection} backgroundType="bottom-only" />

      {gallerySections.map((s, i) => (
        <Section key={i}>
          {i === 2 ? ( // Third section (index 2) is the Manipulation section
            <>
              <SubsectionBox section={{ ...s, images: [] }} index={i} />
              <Carousel images={s.images || []} />
            </>
          ) : (
            <SubsectionBox section={s} index={i} />
          )}
        </Section>
      ))}

      <PageFooter />
    </PageHeader>
  );
}