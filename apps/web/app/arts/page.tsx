"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import ArtCardGrid from '@/components/ArtCardGrid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageFooter from '@/components/PageFooter';
import { useTranslation } from '@/hooks/useTranslation';

export default function ArtsPage() {
  const { t, language } = useTranslation();
  
  // Create translated content structure
  const chineseCharactersSection = {
    type: 'intro' as const,
    title: t('pages.arts.chineseCharactersTitle'),
    body: t('pages.arts.chineseCharactersDescription'),
    time: '2020.08'
  };

  const travelJournalsSection = {
    type: 'intro' as const,
    title: t('pages.arts.travelJournalsTitle'),
    body: t('pages.arts.travelJournalsDescription'),
    time: '2017.08',
    images: [
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638406455/joeyhougallery/arts/Trip%202017/IMG_0661_dizzso.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638406455/joeyhougallery/arts/Trip%202017/IMG_0662_sjlnsx.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638406455/joeyhougallery/arts/Trip%202017/IMG_0660_vtjmfn.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638406455/joeyhougallery/arts/Trip%202017/IMG_0663_a8nmkd.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638406455/joeyhougallery/arts/Trip%202017/IMG_0664_aqshzq.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638406455/joeyhougallery/arts/Trip%202017/IMG_0665_cpckpl.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407305/joeyhougallery/arts/Trip%202017/IMG_0676_sqewbq.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407306/joeyhougallery/arts/Trip%202017/IMG_0677_xro2ck.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407306/joeyhougallery/arts/Trip%202017/IMG_0678_pcmnuo.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407306/joeyhougallery/arts/Trip%202017/IMG_0679_kblrgh.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638407306/joeyhougallery/arts/Trip%202017/IMG_0680_uqoog8.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428104/joeyhougallery/arts/Trip%202017/IMG_0694_vbwwn0.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428105/joeyhougallery/arts/Trip%202017/IMG_0695_kohldb.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428105/joeyhougallery/arts/Trip%202017/IMG_0698_f5ffks.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428105/joeyhougallery/arts/Trip%202017/IMG_0699_ftuswv.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428106/joeyhougallery/arts/Trip%202017/IMG_0696_gz7muc.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428109/joeyhougallery/arts/Trip%202017/IMG_0697_aogxip.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428409/joeyhougallery/arts/Trip%202017/IMG_0717_ksn5i4.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428409/joeyhougallery/arts/Trip%202017/IMG_0718_g58kuo.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428410/joeyhougallery/arts/Trip%202017/IMG_0716_vykwdm.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428765/joeyhougallery/arts/Trip%202017/IMG_0719_al9nqd.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428765/joeyhougallery/arts/Trip%202017/IMG_0721_tsnplr.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428765/joeyhougallery/arts/Trip%202017/IMG_0723_sgjqek.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428766/joeyhougallery/arts/Trip%202017/IMG_0720_jrp5th.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428767/joeyhougallery/arts/Trip%202017/IMG_0722_jyyxsp.jpg",
      "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638428767/joeyhougallery/arts/Trip%202017/IMG_0724_zkr3wd.jpg"
    ]
  };

  const chineseCharactersImages = [
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638399168/joeyhougallery/arts/1597601129319_obvqqm.jpg",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638399153/joeyhougallery/arts/1597601129623_xu5gy3.jpg",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638399161/joeyhougallery/arts/1597601129522_rzpqgu.jpg",
    "https://res.cloudinary.com/joey-hou-homepage/image/upload/v1638399175/joeyhougallery/arts/1597601129386_tbwdji.jpg"
  ];

  return (
    <PageHeader pageKey="arts">
      <MainSection 
        section={chineseCharactersSection} 
        time="2020.08" 
        isFirst={true} 
        extendBackground={false} 
      />
      
      <Section>
        <ArtCardGrid 
          images={chineseCharactersImages} 
          titles={["Renaissance", "Cubism", "Moderism", "Impressionism"]} 
        />
      </Section>

      <MainSection 
        section={travelJournalsSection} 
        time="2017.08" 
        isFirst={false} 
        extendBackground={true} 
      />

      <PageFooter />
    </PageHeader>
  );
}
