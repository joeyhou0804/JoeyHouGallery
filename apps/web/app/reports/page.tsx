import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import Subsection from '@/components/Subsection';
import PageFooter from '@/components/PageFooter';
import type { PageContent, Section as SectionType } from '@/content/types';
import content from '@/content/reports.json';

export const metadata = { title: 'Reports · Joey Hou Gallery' };

export default function ReportsPage() {
  const data = content as PageContent;
  const introSection = data.sections.find(s => s.type === 'intro') as Extract<SectionType, { type: 'intro' }>;
  const gallerySections = data.sections.filter(s => s.type === 'gallery') as Extract<SectionType, { type: 'gallery' }>[];
  
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
        />
      ))}

      <PageFooter />
    </PageHeader>
  );
}
