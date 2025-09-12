import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import Carousel from '@/components/Carousel';
import ImageGrid from '@/components/ImageGrid';
import TextBlock from '@/components/TextBlock';
import PageFooter from '@/components/PageFooter';
import type { PageContent, Section as SectionType } from '@/content/types';
import content from '@/content/websites.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export const metadata = { title: 'Websites · Joey Hou Gallery' };

export default function WebsitesPage() {
  const data = content as PageContent;
  const allIntroSections = data.sections.filter(s => s.type === 'intro') as Extract<SectionType, { type: 'intro' }>[];
  const blackBoxIntroSection = allIntroSections[0];
  const musicIntroSection = allIntroSections[1];
  const allGallerySections = data.sections.filter(s => s.type === 'gallery') as Extract<SectionType, { type: 'gallery' }>[];
  const blackBoxGallerySection = allGallerySections[0];
  const musicGallerySection = allGallerySections[1];
  
  return (
    <PageHeader pageKey="websites">
      {/* Black Box Institute Section */}
      <MainSection section={blackBoxIntroSection} time={blackBoxIntroSection.time} backgroundType="bottom-only" />
      <Section>
        <Carousel images={blackBoxGallerySection.images} />
      </Section>

      {/* Music Theory Section */}
      <MainSection section={musicIntroSection} time={musicIntroSection.time} backgroundType="bottom-only" />
      <Section>
        <Carousel images={musicGallerySection.images} />
      </Section>

      <PageFooter />
    </PageHeader>
  );
}
