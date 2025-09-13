"use client";

import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import Carousel from '@/components/Carousel';
import ImageGrid from '@/components/ImageGrid';
import TextBlock from '@/components/TextBlock';
import PageFooter from '@/components/PageFooter';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTranslation } from '@/hooks/useTranslation';

export default function WebsitesPage() {
  const { t } = useTranslation();
  
  // Create translated content structure
  const blackBoxIntroSection = {
    type: 'intro' as const,
    time: '2021.07',
    title: t('pages.websites.consultingTitle'),
    body: t('pages.websites.consultingDescription'),
    links: [
      { label: t('pages.websites.visitOfficial'), href: "https://www.theblackboxinstitute.com/" }
    ]
  };
  
  const musicIntroSection = {
    type: 'intro' as const,
    time: '2022.04',
    title: t('pages.websites.musicTitle'),
    body: t('pages.websites.musicDescription'),
    links: [
      { label: t('pages.websites.codeOnGithub'), href: "https://github.com/joeyhou0804" }
    ]
  };
  
  const blackBoxGallerySection = {
    type: 'gallery' as const,
    title: 'Screenshots — The Black Box Institute',
    images: [
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663659501/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-20_%E4%B8%8A%E5%8D%8812.36.02_qbr2dx.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663659501/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-20_%E4%B8%8A%E5%8D%8812.37.30_qnazeo.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663659501/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-20_%E4%B8%8A%E5%8D%8812.36.45_s3i8nk.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663659501/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-20_%E4%B8%8A%E5%8D%8812.37.16_nbjxwi.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663659501/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-20_%E4%B8%8A%E5%8D%8812.36.35_aacpfs.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663659502/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-20_%E4%B8%8A%E5%8D%8812.36.12_e7gmir.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663659502/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-20_%E4%B8%8A%E5%8D%8812.37.47_d3joal.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663659502/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-20_%E4%B8%8A%E5%8D%8812.37.57_nwzdgs.png"
    ]
  };
  
  const musicGallerySection = {
    type: 'gallery' as const,
    title: 'Screenshots — Music Site',
    images: [
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663660204/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-17_%E4%B8%8B%E5%8D%889.28.17_edxifz.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663660204/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-17_%E4%B8%8B%E5%8D%889.28.45_hqnvqh.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663660205/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-17_%E4%B8%8B%E5%8D%889.28.33_asv7cz.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663660205/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-17_%E4%B8%8B%E5%8D%889.28.54_e6aaln.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663660205/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-17_%E4%B8%8B%E5%8D%889.29.03_eplxto.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663660206/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-17_%E4%B8%8B%E5%8D%889.29.25_tz6dqd.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663660205/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-17_%E4%B8%8B%E5%8D%889.29.10_aou7wo.png",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1663660205/joeyhougallery/websites/%E6%88%AA%E5%B1%8F2022-09-17_%E4%B8%8B%E5%8D%889.29.37_djjaki.png"
    ]
  };
  
  return (
    <PageHeader pageKey="websites">
      {/* Black Box Institute Section */}
      <MainSection section={blackBoxIntroSection} time={blackBoxIntroSection.time} backgroundType="bottom-only" />
      <Section>
        <Carousel images={blackBoxGallerySection.images} />
      </Section>

      {/* Music Theory Section */}
      <MainSection section={musicIntroSection} time={musicIntroSection.time} backgroundType="full" />
      <Section>
        <Carousel images={musicGallerySection.images} />
      </Section>

      <PageFooter />
    </PageHeader>
  );
}
