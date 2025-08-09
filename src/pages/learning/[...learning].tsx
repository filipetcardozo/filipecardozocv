import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import {
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import { getContentTree, listAllDocSlugs, getTopicContent, toTitleCase } from '@/utils/md';
import { addTime } from '@/utils/learningTime';
import { useThemeMode } from '@/contexts/ThemeModeContext';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { isStarred, toggleStar } from '@/utils/stars';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type PageProps = {
  contentHtml: string;
  area: string;
  title: string;
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tree = getContentTree();
  const slugs = listAllDocSlugs(tree);
  const paths = slugs.map((slug) => ({ params: { learning: slug.split('/') } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const segments = params!.learning as string[];
  const learning = segments.join('/');
  const { contentHtml, data } = await getTopicContent(learning);

  const parts = segments[segments.length - 1] === 'index' ? segments.slice(0, -1) : segments;
  const title =
    (typeof data?.title === 'string' && data.title.trim()) ?
      String(data.title) :
      toTitleCase(parts[parts.length - 1] ?? 'index');
  const area = parts.slice(0, -1).join(' / ').toUpperCase();

  return { props: { contentHtml, area, title, slug: learning } };
};

const wrapTablesWithScroll = (html: string): string =>
  html.replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, '</table></div>');

const LearningTopicPage = ({ contentHtml, area, title, slug }: PageProps) => {
  const { mode, theme, toggleMode } = useThemeMode();
  const [starred, setStarred] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const save = () => {
      const delta = Math.round((Date.now() - start) / 1000);
      addTime(slug, delta);
    };
    window.addEventListener('pagehide', save);
    setStarred(isStarred(slug));
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

          {!!area && (
            <MuiLink
              component='span'
              underline='none'
              sx={{ textTransform: 'uppercase', color: 'text.secondary' }}
            >
              {area}
            </MuiLink>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography color='text.primary'>{title}</Typography>
            <IconButton
              size='small'
              onClick={() => {
                const next = toggleStar(slug);
                setStarred(next);
              }}
              sx={{ color: starred ? 'warning.main' : 'text.disabled' }}
            >
              {starred ? <StarIcon fontSize='inherit' /> : <StarBorderIcon fontSize='inherit' />}
            </IconButton>
          </Box>
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
};

export default LearningTopicPage;
