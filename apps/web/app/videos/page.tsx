"use client";

import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import MainSection from '@/components/MainSection';
import VideoCard from '@/components/VideoCard';
import TextBlock from '@/components/TextBlock';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import PageFooter from '@/components/PageFooter';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PageLoadingScreen from '@/components/PageLoadingScreen';
import { useTranslation } from '@/hooks/useTranslation';
import { usePageLoading } from '@/hooks/usePageLoading';

export default function VideosPage() {
  const { t } = useTranslation();
  const { isLoading, progress } = usePageLoading({ duration: 1400 });

  if (isLoading) {
    return <PageLoadingScreen progress={progress} title={t('videos')} />;
  }
  
  // Create translated content structure
  const data = {
    sections: [
      {
        type: 'intro' as const,
        title: t('pages.videos.videoEssayTitle'),
        time: '2021.12',
        body: t('pages.videos.videoEssayDescription')
      },
      {
        type: 'videos' as const,
        title: t('pages.videos.videoEssayTitle'),
        items: [
          {
            title: t('pages.videos.introVideoTitle'),
            youtubeId: "Xz08rpOaU0M",
            description: t('pages.videos.videoEssayLabel'),
            body: t('pages.videos.videoEssayBody')
          }
        ]
      },
      {
        type: 'intro' as const,
        title: t('pages.videos.orientationTitle'),
        time: '2020-2021',
        body: t('pages.videos.orientationDescription')
      },
      {
        type: 'videos' as const,
        title: 'Columbia & CityU HK JBDP Pre-departure Orientation Session',
        items: [
          {
            title: t('pages.videos.episode2Title'),
            youtubeId: "8d3AIE3-kQA",
            description: t('pages.videos.qaLabel'),
            body: t('pages.videos.episode2Body')
          },
          {
            title: t('pages.videos.episode1Title'),
            youtubeId: "DNJFN6HK7MQ",
            description: t('pages.videos.qaLabel'),
            body: t('pages.videos.episode1Body')
          }
        ]
      },
      {
        type: 'intro' as const,
        title: t('pages.videos.courseCreativeTitle'),
        time: '2020.08',
        body: t('pages.videos.courseCreativeDescription')
      },
      {
        type: 'videos' as const,
        title: t('pages.videos.courseCreativeTitle'),
        items: [
          {
            title: t('pages.videos.courseCreativeVideoTitle'),
            youtubeId: "hPJm2Xb1Wd0",
            description: t('pages.videos.courseCreativeVideoDescription'),
            body: t('pages.videos.courseCreativeVideoBody')
          }
        ]
      }
    ]
  };
  // Track VideoCard color index across all sections
  let globalVideoIndex = 0;

  return (
    <PageHeader pageKey="videos">
      {data.sections.map((section, i) => (
        section.type === 'intro' ? (
          section.title === t('pages.videos.courseCreativeTitle') ? (
            <Box key={i} sx={{ mt: 8 }}>
              <MainSection
                section={section as Extract<typeof section, { type: 'intro' }>}
                time={section.time}
                backgroundType="full"
                extraTopPadding={0}
              />
            </Box>
          ) : (
            <MainSection
              key={i}
              section={section as Extract<typeof section, { type: 'intro' }>}
              time={section.time}
              backgroundType={section.title === t('pages.videos.orientationTitle') ? 'full' : 'bottom-only'}
              extraTopPadding={0}
            />
          )
        ) : (
          <Section key={i}>
            {section.title === t('pages.videos.videoEssayTitle') || section.title === 'Columbia & CityU HK JBDP Pre-departure Orientation Session' || section.title === t('pages.videos.courseCreativeTitle') ? (
              // Use VideoCard for Video Essay and Orientation sections
              section.items.map((v, idx) => {
                // Add extra spacing for specific videos
                let sx = {};
                if (section.title === t('pages.videos.videoEssayTitle')) {
                  // Video Essay: add top and bottom spaces
                  sx = { mt: 4, mb: 10 };
                } else if (v.title === t('pages.videos.episode2Title')) {
                  // 2021 Episode 2: add top spaces
                  sx = { mt: 4 };
                }

                const currentColorIndex = globalVideoIndex++;

                return (
                  <VideoCard
                    key={v.youtubeId}
                    title={v.title}
                    youtubeId={v.youtubeId}
                    description={v.description}
                    body={v.body}
                    colorIndex={currentColorIndex}
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
