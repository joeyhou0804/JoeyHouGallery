import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import VideoCard from '@/components/VideoCard';
import TextBlock from '@/components/TextBlock';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import PageFooter from '@/components/PageFooter';
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
        section.type === 'intro' ? (
          <MainSection 
            key={i}
            section={section as Extract<typeof section, { type: 'intro' }>}
            time={section.time}
            backgroundType={section.title === 'Orientation Videos' ? 'full' : 'bottom-only'}
          />
        ) : (
          <Section key={i}>
            {section.title === 'Video Essay' || section.title === 'Columbia & CityU HK JBDP Pre-departure Orientation Session' ? (
              // Use VideoCard for Video Essay and Orientation sections
              section.items.map((v, idx) => {
                // Add extra spacing for specific videos
                let sx = {};
                if (section.title === 'Video Essay') {
                  // Video Essay: add top and bottom spaces
                  sx = { mt: 4, mb: 10 };
                } else if (v.title === '2021 - Episode 2') {
                  // 2021 Episode 2: add top spaces
                  sx = { mt: 4 };
                }
                
                return (
                  <VideoCard
                    key={v.youtubeId}
                    title={v.title}
                    youtubeId={v.youtubeId}
                    description={v.description}
                    body={v.body}
                    colorIndex={idx}
                    sx={sx}
                  />
                );
              })
            ) : (
              // Keep original layout for other video sections
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
        )
      ))}

      <PageFooter />
    </PageHeader>
  );
}
