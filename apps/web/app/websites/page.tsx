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
  const introSection = data.sections.find(s => s.type === 'intro') as Extract<SectionType, { type: 'intro' }>;
  const otherSections = data.sections.slice(1);
  
  return (
    <PageHeader pageKey="websites">
      <MainSection section={introSection} time={introSection.time} backgroundType="bottom-only" />

      {otherSections.map((s, i) => (
        <Section key={i}>
          {s.type === 'intro' ? (
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {s.title}
                </Typography>
                {Array.isArray(s.body) && s.body.map((p, idx) => (
                  <Typography key={idx} paragraph>
                    {p}
                  </Typography>
                ))}
                {s.links?.map((l) => (
                  <Button key={l.href} href={l.href} target="_blank" rel="noreferrer" sx={{ mr: 1 }} variant="contained">
                    {l.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          ) : s.title === 'Screenshots — The Black Box Institute' ? (
            <Carousel images={(s as any).images} />
          ) : (
            <>
              <TextBlock centered>
                <Typography variant="h5">
                  {s.title}
                </Typography>
              </TextBlock>
              <ImageGrid images={(s as any).images} />
            </>
          )}
        </Section>
      ))}

      <PageFooter />
    </PageHeader>
  );
}
