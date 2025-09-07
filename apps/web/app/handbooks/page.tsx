import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import type { PageContent } from '@/content/types';
import content from '@/content/handbooks.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const metadata = { title: 'Handbooks · Joey Hou Gallery' };

export default function HandbooksPage() {
  const data = content as PageContent;
  return (
    <PageHeader pageKey="handbooks">
      {data.sections.map((s, i) => (
        <Section key={i}>
          {s.type === 'intro' ? (
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {s.title}
                </Typography>
                {Array.isArray(s.body) && (
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    {s.body.map((p, idx) => (
                      <Typography key={idx}>{p}</Typography>
                    ))}
                  </Stack>
                )}
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
