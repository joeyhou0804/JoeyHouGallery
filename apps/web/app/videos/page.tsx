import Section from '@/components/Section';
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
    <>
      <Section>
        <Typography variant="h3" gutterBottom>
          {data.title}
        </Typography>
      </Section>
      {data.sections.map((section, i) => (
        <Section key={i}>
          {section.type === 'intro' ? (
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {section.title}
                </Typography>
                {section.body?.map((p, idx) => (
                  <Typography key={idx} paragraph>
                    {p}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                {section.title}
              </Typography>
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
    </>
  );
}
