import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import { Breadcrumbs, Link as MuiLink, Typography, useTheme, Box } from '@mui/material';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import { getAllSections, getTopicContent } from '@/utils/md';
import { useThemeMode } from '@/contexts/ThemeModeContext';
import { ParticlesBackground } from "@/components/ParticlesBackground";

interface PageProps {
  contentHtml: string;
  area: string;
  title: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllSections().flatMap((s) =>
    s.topics.map(({ slug }) => ({
      params: { learning: slug.split('/') },
    }))
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const segments = params!.learning as string[];
  const learning = segments.join('/');
  const { contentHtml } = await getTopicContent(learning);

  const area = segments[0];
  const title = segments[1]
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return { props: { contentHtml, area, title } };
};

export default function LearningTopicPage({ contentHtml, area, title }: PageProps) {
  const { mode, theme, toggleMode } = useThemeMode();

  return (
    <>
      <Head>
        <title>{title} – Knowledge</title>
      </Head>

      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          px: 2,
          overflowX: 'hidden',
        }}
      >
        <Breadcrumbs sx={{ mb: 4, maxWidth: 1024, mx: 'auto', pt: 4 }}>
          <MuiLink component={NextLink} href="/learning" underline="hover">
            Learning
          </MuiLink>

          <MuiLink
            component="span"
            underline="none"
            sx={{ textTransform: 'uppercase', color: 'text.secondary' }}
          >
            {area}
          </MuiLink>

          <Typography color="text.primary">{title}</Typography>
        </Breadcrumbs>

        <Box
          component="article"
          sx={{
            maxWidth: 1024,
            mx: 'auto',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.6,
            wordBreak: 'break-word',
            '& code': {
              bgcolor: theme.palette.mode === 'dark' ? '#272822' : '#f4f4f4',
              px: 0.5,
              py: 0.2,
              borderRadius: 0.5,
              fontSize: '0.875em',
              fontFamily: 'monospace',
            },
            '& pre code': {
              display: 'block',
              p: 2,
              overflowX: 'auto',
            },
          }}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </Box>

      <ToggleThemeButton mode={mode} toggle={toggleMode} />

      <ParticlesBackground />
    </>
  );
}
