import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import type { PageContent, Section as SectionType } from '@/content/types';
import content from '@/content/applications.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const metadata = { title: 'Applications · Joey Hou Gallery' };

function Intro({ section }: { section: Extract<SectionType, { type: 'intro' }> }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {section.title}
        </Typography>
        <Stack spacing={1} sx={{ mb: 2 }}>
          {section.body?.map((p, i) => (
            <Typography key={i}>{p}</Typography>
          ))}
        </Stack>
        {section.links?.map((l) => (
          <Button key={l.href} href={l.href} target="_blank" rel="noreferrer" variant="contained">
            {l.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

function Gallery({ section }: { section: Extract<SectionType, { type: 'gallery' }> }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">{section.title}</Typography>
      {section.body && <Typography color="text.secondary">{section.body}</Typography>}
      <ImageGrid images={section.images} />
    </Stack>
  );
}

export default function ApplicationsPage() {
  const data = content as PageContent;
  return (
    <>
      <Section>
        <Typography variant="h3" gutterBottom>
          {data.title}
        </Typography>
      </Section>
      {data.sections.map((s, i) => (
        <Section key={i}>{s.type === 'intro' ? <Intro section={s} /> : <Gallery section={s} />}</Section>
      ))}
    </>
  );
}
