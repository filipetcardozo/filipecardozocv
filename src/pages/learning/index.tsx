import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box, Typography, Link as MuiLink, IconButton,
  Accordion, AccordionSummary, AccordionDetails,
  Chip, Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import { ResetLearningTimeButton } from '@/components/ResetLearningTimeButton';
import { getTimes, formatSeconds } from '@/utils/learningTime';
import { getContentTree, listAllDocSlugs, ContentNode } from '@/utils/md';
import { useThemeMode } from '@/contexts/ThemeModeContext';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { getStars, toggleStar } from '@/utils/stars';

type Props = { tree: ContentNode[]; totalDocs: number };

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tree = getContentTree();
  const totalDocs = listAllDocSlugs(tree).length;
  return { props: { tree, totalDocs } };
};

const usePersistentBool = (key: string, initial = false) => {
  const [value, setValue] = useState<boolean>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw));
    } catch { }
  }, [key]);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { }
  }, [key, value]);
  return [value, setValue] as const;
};

const TopicItem = memo(({
  slug, title, seconds, starred, onToggleStar, divider, bg, text,
}: {
  slug: string; title: string; seconds: number; starred: boolean;
  onToggleStar: (slug: string) => void;
  divider: string; bg: string; text: string;
}) => (
  <MuiLink
    component={NextLink}
    href={`/learning/${slug}`}
    underline="none"
    sx={{
      px: 2, py: 1, borderRadius: 1.5,
      border: `1px solid ${divider}`,
      backgroundColor: bg, color: text,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      transition: '0.2s', '&:hover': { filter: 'brightness(0.97)' },
    }}
  >
    <span>{title}</span>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {seconds > 0 && (
        <Typography component="span" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
          {formatSeconds(seconds)}
        </Typography>
      )}
      <IconButton
        size="small"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleStar(slug); }}
        sx={{ color: starred ? 'warning.main' : 'text.disabled' }}
      >
        {starred ? <StarIcon fontSize="inherit" /> : <StarBorderIcon fontSize="inherit" />}
      </IconButton>
    </Box>
  </MuiLink>
));

const countDocs = (node: ContentNode): number => {
  if (node.kind === 'doc') return 1;
  return (node.children ?? []).reduce((acc, c) => acc + countDocs(c), 0);
};

const isExpandedInStorage = (slugOrRoot: string) => {
  try {
    const key = `kn:dir:${slugOrRoot || '__root'}:expanded`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) === true : false;
  } catch { return false; }
};

const anyDescendantExpanded = (node: ContentNode): boolean => {
  if (!node.children || !node.children.length) return false;
  for (const child of node.children) {
    if (child.kind === 'dir') {
      if (isExpandedInStorage(child.slug) || anyDescendantExpanded(child)) return true;
    }
  }
  return false;
};

const TreeNode = memo(({
  node, times, stars, onToggleStar, palette, depth = 0,
}: {
  node: ContentNode;
  times: Record<string, number>;
  stars: Record<string, boolean>;
  onToggleStar: (slug: string) => void;
  palette: { divider: string; mode: 'light' | 'dark'; text: string; headerBg: string };
  depth?: number;
}) => {
  if (node.kind === 'doc') {
    return (
      <TopicItem
        slug={node.slug}
        title={node.title ?? node.name}
        seconds={times[node.slug] ?? 0}
        starred={!!stars[node.slug]}
        onToggleStar={onToggleStar}
        divider={palette.divider}
        bg={palette.mode === 'light' ? '#ffffff' : '#151515'}
        text={palette.text}
      />
    );
  }

  const storageKey = `kn:dir:${node.slug || '__root'}:expanded`;
  const [expanded, setExpanded] = usePersistentBool(storageKey, false);
  const badge = countDocs(node);

  useEffect(() => {
    if (!expanded) {
      if (isExpandedInStorage(node.slug || '__root') || anyDescendantExpanded(node)) {
        setExpanded(true);
      }
    }
  }, [node.slug]); // node é estável; usar slug evita reexecuções desnecessárias

  return (
    <Accordion
      disableGutters
      elevation={0}
      square
      expanded={expanded}
      onChange={(_, isExp) => setExpanded(isExp)}
      TransitionProps={{ unmountOnExit: true }}
      sx={{
        mb: 1,
        border: `1px solid ${palette.divider}`,
        borderRadius: 2,
        overflow: 'hidden',
        '&:before': { display: 'none' },
        ml: depth ? `${Math.min(depth, 6)}ch` : 0,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: palette.headerBg }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant={depth === 0 ? 'h6' : depth === 1 ? 'subtitle1' : 'subtitle2'} sx={{ textTransform: depth === 0 ? 'uppercase' : 'none', color: depth === 0 ? 'text.secondary' : 'text.primary' }}>
            {node.slug || 'Root'}
          </Typography>
          <Chip size="small" label={badge} />
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 2 }}>
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          {(node.children ?? []).map((child) => (
            <TreeNode
              key={`${child.kind}-${child.slug || child.name}`}
              node={child}
              times={times}
              stars={stars}
              onToggleStar={onToggleStar}
              palette={palette}
              depth={depth + 1}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
});

const KnowledgeIndex = ({ tree, totalDocs }: Props) => {
  const { mode, theme, toggleMode } = useThemeMode();
  const [times, setTimes] = useState<Record<string, number>>({});
  const [stars, setStars] = useState<Record<string, boolean>>({});

  useEffect(() => { setTimes(getTimes()); setStars(getStars()); }, []);

  const onToggleStar = useCallback((slug: string) => {
    const next = toggleStar(slug);
    setStars((prev) => {
      const copy = { ...prev };
      if (next) copy[slug] = true; else delete copy[slug];
      return copy;
    });
  }, []);

  if (!tree.length) return <Typography align="center">No topics found.</Typography>;

  const palette = {
    mode: theme.palette.mode,
    divider: theme.palette.divider,
    headerBg: theme.palette.mode === 'light' ? '#f9fafb' : '#1e1e1e',
    text: theme.palette.text.primary,
  };

  return (
    <>
      <Head><title>Technical Knowledge</title></Head>
      <Box sx={{ maxWidth: 1024, mx: 'auto', py: 4, px: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>Technical Knowledge</Typography>
          <Typography variant="body2" color="text.secondary">{totalDocs} docs</Typography>
        </Stack>

        {(tree as ContentNode[]).map((n) => (
          <TreeNode
            key={`${n.kind}-${n.slug || n.name}`}
            node={n}
            times={times}
            stars={stars}
            onToggleStar={onToggleStar}
            palette={palette}
          />
        ))}
      </Box>

      <ToggleThemeButton mode={mode} toggle={toggleMode} />
      <ResetLearningTimeButton onReset={() => setTimes({})} />
      <ParticlesBackground />
    </>
  );
};

export default KnowledgeIndex;
