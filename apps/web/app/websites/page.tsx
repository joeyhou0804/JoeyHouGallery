import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import type { PageContent } from '@/content/types';
import content from '@/content/websites.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export const metadata = { title: 'Websites · Joey Hou Gallery' };

export default function WebsitesPage() {
  const data = content as PageContent;
  return (
    <>
      <Section>
        <Typography variant="h3" gutterBottom>
          {data.title}
        </Typography>
      </Section>
      {data.sections.map((s, i) => (
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
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                {s.title}
              </Typography>
              <ImageGrid images={(s as any).images} />
            </>
          )}
        </Section>
      ))}
    </>
  );
}
