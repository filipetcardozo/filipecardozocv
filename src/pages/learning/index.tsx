import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Typography,
  Link as MuiLink,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import { ResetLearningTimeButton } from '@/components/ResetLearningTimeButton';
import { getTimes, formatSeconds } from '@/utils/learningTime';
import { getAllSections, Section } from '@/utils/md';
import { useThemeMode } from '@/contexts/ThemeModeContext';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { getStars, toggleStar } from '@/utils/stars';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type Props = { sections: Section[] };

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { sections: getAllSections() },
});

export default function KnowledgeIndex({ sections }: Props) {
  const { mode, theme, toggleMode } = useThemeMode();
  const [times, setTimes] = useState<Record<string, number>>({});
  const [stars, setStars] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setTimes(getTimes());
    setStars(getStars());
  }, []);

  if (!sections.length)
    return <Typography align='center'>Nenhum tópico encontrado.</Typography>;

  return (
    <>
      <Head>
        <title>Technical Knowledge</title>
      </Head>

      <Box
        sx={{
          maxWidth: 768,
          mx: 'auto',
          py: 4,
          px: 2,
        }}
      >
        <Typography
          variant='h4'
          align='center'
          sx={{ mb: 4, fontWeight: 600 }}
        >
          Technical Knowledge
        </Typography>

        {sections.map(({ area, topics }) => (
          <Box key={area} sx={{ mb: 4 }}>
            <Typography
              variant='h6'
              sx={{
                textTransform: 'uppercase',
                mb: 2,
                color: 'text.secondary',
              }}
            >
              {area}
            </Typography>

            <Box sx={{ display: 'grid', gap: 2 }}>
              {topics.map(({ slug, title }) => {
                const seconds = times[slug] ?? 0;
                const starred = !!stars[slug];
                return (
                  <MuiLink
                    key={slug}
                    component={NextLink}
                    href={`/learning/${slug}`}
                    underline='none'
                    sx={{
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.mode === 'light' ? '#f9fafb' : '#1e1e1e',
                      color: theme.palette.text.primary,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: '0.2s',
                      '&:hover': {
                        backgroundColor:
                          theme.palette.mode === 'light' ? '#f0f0f0' : '#2a2a2a',
                      },
                    }}
                  >
                    <span>{title}</span>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {seconds > 0 && (
                        <Typography component='span' sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                          {formatSeconds(seconds)}
                        </Typography>
                      )}
                      <IconButton
                        size='small'
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const next = toggleStar(slug);
                          setStars((prev) => {
                            const copy = { ...prev };
                            if (next) copy[slug] = true;
                            else delete copy[slug];
                            return copy;
                          });
                        }}
                        sx={{ color: starred ? 'warning.main' : 'text.disabled' }}
                      >
                        {starred ? <StarIcon fontSize='inherit' /> : <StarBorderIcon fontSize='inherit' />}
                      </IconButton>
                    </Box>
                  </MuiLink>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>

      <ToggleThemeButton mode={mode} toggle={toggleMode} />
      <ResetLearningTimeButton onReset={() => setTimes({})} />

      <ParticlesBackground />
    </>
  );
}
