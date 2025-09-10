"use client";

import Section from '@/components/Section';
import ImageGrid from '@/components/ImageGrid';
import PageHeader from '@/components/PageHeader';
import TextBlock from '@/components/TextBlock';
import MainSection from '@/components/MainSection';
import Subsection from '@/components/Subsection';
import type { PageContent } from '@/content/types';
import content from '@/content/handbooks.json';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { GlowPillButton } from '../applications/GlowPillButton';

export default function HandbooksPage() {
  const data = content as PageContent;
  return (
    <PageHeader pageKey="handbooks">
      {data.sections.map((s, i) => (
        s.type === 'intro' && i === 0 ? (
          <MainSection key={i} section={s} time="2019‑2025" isFirst={i === 0} />
        ) : s.type === 'intro' && s.title === 'Simplified Chinese Version' ? (
          <Section key={i}>
            <Subsection 
              section={s} 
              index={0} 
              year="2019"
              title={s.title}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
                {s.links?.map((l: any) => (
                  <GlowPillButton
                    key={l.href}
                    href={l.href}
                    rel="noreferrer"
                  >
                    {l.label}
                  </GlowPillButton>
                ))}
              </Stack>
            </Subsection>
          </Section>
        ) : (
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
                <TextBlock centered>
                  <Typography variant="h5" gutterBottom>
                    {s.title}
                  </Typography>
                  {'body' in s && s.body && (
                    <Typography variant="body1" color="text.secondary">
                      {s.body as any}
                    </Typography>
                  )}
                </TextBlock>
                <ImageGrid images={(s as any).images} />
              </>
            )}
          </Section>
        )
      ))}
    </PageHeader>
  );
}
