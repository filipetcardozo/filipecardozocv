import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import { Breadcrumbs, Link as MuiLink, Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import { ResetLearningTimeButton } from '@/components/ResetLearningTimeButton';
import { getAllSections, getTopicContent } from '@/utils/md';
import { addTime } from '@/utils/learningTime';
import { useThemeMode } from '@/contexts/ThemeModeContext';
import { ParticlesBackground } from '@/components/ParticlesBackground';

interface PageProps {
  contentHtml: string;
  area: string;
  title: string;
  slug: string;
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

  return { props: { contentHtml, area, title, slug: learning } };
};

function wrapTablesWithScroll(html: string): string {
  return html
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

export default function LearningTopicPage({ contentHtml, area, title, slug }: PageProps) {
  const { mode, theme, toggleMode } = useThemeMode();

  useEffect(() => {
    const start = Date.now();
    const save = () => {
      const delta = Math.round((Date.now() - start) / 1000);
      addTime(slug, delta);
    };
    window.addEventListener('pagehide', save);
    return () => {
      save();
      window.removeEventListener('pagehide', save);
    };
  }, [slug]);

  return (
    <>
      <Head>
        <title>{title} – Knowledge</title>
      </Head>

      <Box
        component='main'
        sx={{
          minHeight: '100vh',
          px: 2,
          overflowX: 'hidden',
          pb: 20
        }}
      >
        <Breadcrumbs sx={{ mb: 4, maxWidth: 1024, mx: 'auto', pt: 4 }}>
          <MuiLink component={NextLink} href='/learning' underline='hover'>
            Learning
          </MuiLink>

          <MuiLink
            component='span'
            underline='none'
            sx={{ textTransform: 'uppercase', color: 'text.secondary' }}
          >
            {area}
          </MuiLink>

          <Typography color='text.primary'>{title}</Typography>
        </Breadcrumbs>

        <Box
          component='article'
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
            '& .table-scroll': {
              overflowX: 'auto',
            },
            '& .table-scroll th, & .table-scroll td': {
              padding: '0.75em 1em',
              textAlign: 'left',
              whiteSpace: 'nowrap',
            },
          }}
          dangerouslySetInnerHTML={{ __html: wrapTablesWithScroll(contentHtml) }}
        />
      </Box>

      <ToggleThemeButton mode={mode} toggle={toggleMode} />

      <ParticlesBackground />
    </>
  );
}
