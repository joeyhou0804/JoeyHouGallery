import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import TextBlock from '@/components/TextBlock';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import type { VideosPageContent } from '@/content/types';
import content from '@/content/videos.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

export const metadata = { title: 'Videos · Joey Hou Gallery' };

export default function VideosPage() {
  const data = content as unknown as VideosPageContent;
  return (
    <PageHeader pageKey="videos">
      {data.sections.map((section, i) => (
        <Section key={i}>
          {section.type === 'intro' ? (
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {section.title}
                </Typography>
                {Array.isArray(section.body) ? (
                  section.body.map((p, idx) => (
                    <Typography key={idx} paragraph>
                      {p}
                    </Typography>
                  ))
                ) : section.body ? (
                  <Typography paragraph>
                    {section.body}
                  </Typography>
                ) : null}
              </CardContent>
            </Card>
          ) : (
            <>
              <TextBlock centered>
                <Typography variant="h5">
                  {section.title}
                </Typography>
              </TextBlock>
              <Grid container spacing={2}>
                {section.items.map((v) => (
                  <Grid key={v.youtubeId} item xs={12} md={6}>
                    <Card>
                      <YouTubeEmbed id={v.youtubeId} title={v.title} />
                      <CardContent>
                        <Typography variant="subtitle1">{v.title}</Typography>
                        {v.description && (
                          <Typography variant="body2" color="text.secondary">
                            {v.description}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Section>
      ))}
    </PageHeader>
  );
}
