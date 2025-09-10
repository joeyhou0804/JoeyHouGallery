import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import SubsectionBox from '@/components/SubsectionBox';
import PageFooter from '@/components/PageFooter';
import type { PageContent, Section as SectionType } from '@/content/types';
import content from '@/content/posters.json';

export const metadata = { title: 'Posters · Joey Hou Gallery' };

export default function PostersPage() {
  const data = content as PageContent;
  const introSection = data.sections.find(s => s.type === 'intro') as Extract<SectionType, { type: 'intro' }>;
  const gallerySections = data.sections.filter(s => s.type === 'gallery') as Extract<SectionType, { type: 'gallery' }>[];
  
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
