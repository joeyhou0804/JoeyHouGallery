import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import ImageGrid from '@/components/ImageGrid';
import type { PageContent } from '@/content/types';
import content from '@/content/posters.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const metadata = { title: 'Posters · Joey Hou Gallery' };

export default function PostersPage() {
  const data = content as PageContent;
  return (
    <PageHeader pageKey="posters">
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
              </CardContent>
            </Card>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                {s.title}
              </Typography>
              {'body' in s && s.body && (
                <Typography variant="body1" color="text.secondary" paragraph>
                  {s.body as any}
                </Typography>
              )}
              <ImageGrid images={(s as any).images} />
            </>
          )}
        </Section>
      ))}
    </PageHeader>
  );
}
