import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Typography, Link as MuiLink, useTheme } from '@mui/material';

import { getAllSections, Section } from '@/utils/md';

type Props = { sections: Section[] };

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { sections: getAllSections() },
});

export default function KnowledgeIndex({ sections }: Props) {
  const theme = useTheme();

  if (!sections.length)
    return <Typography align="center">Nenhum tópico encontrado.</Typography>;

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
          variant="h4"
          align="center"
          sx={{ mb: 4, fontWeight: 600 }}
        >
          Technical Knowledge
        </Typography>

        {sections.map(({ area, topics }) => (
          <Box key={area} sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                textTransform: 'uppercase',
                mb: 2,
                color: 'text.secondary',
              }}
            >
              {area}
            </Typography>

            <Box sx={{ display: 'grid', gap: 2 }}>
              {topics.map(({ slug, title }) => (
                <MuiLink
                  key={slug}
                  component={NextLink}
                  href={`/learning/${slug}`}
                  underline="none"
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.mode === 'light' ? '#f9fafb' : '#1e1e1e',
                    color: theme.palette.text.primary,
                    transition: '0.2s',
                    '&:hover': {
                      backgroundColor:
                        theme.palette.mode === 'light'
                          ? '#f0f0f0'
                          : '#2a2a2a',
                    },
                  }}
                >
                  {title}
                </MuiLink>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
