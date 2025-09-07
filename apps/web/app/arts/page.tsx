import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import TextBlock from '@/components/TextBlock';
import type { PageContent } from '@/content/types';
import content from '@/content/arts.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const metadata = { title: 'Arts · Joey Hou Gallery' };

export default function ArtsPage() {
  const data = content as PageContent;
  return (
    <PageHeader pageKey="arts">
      {data.sections.map((s, i) => (
        <Section key={i}>
          {s.type === 'intro' ? (
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {s.title}
                </Typography>
                {s.body?.map((p, idx) => (
                  <Typography key={idx} paragraph>
                    {p}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ) : (
            <>
              <TextBlock centered>
                <Typography variant="h5" gutterBottom>
                  {s.title}
                </Typography>
                {s.body && (
                  <Typography variant="body1" color="text.secondary">
                    {s.body}
                  </Typography>
                )}
              </TextBlock>
              <ImageGrid images={(s as any).images} />
            </>
          )}
        </Section>
      ))}
    </PageHeader>
  );
}
