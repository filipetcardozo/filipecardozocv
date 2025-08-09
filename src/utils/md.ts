import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export type NodeKind = 'dir' | 'doc';

export type ContentNode = {
  name: string;
  slug: string;
  kind: NodeKind;
  title?: string;
  children?: ContentNode[];
};

const contentRoot = path.join(process.cwd(), 'src/markdowns');

const naturalSort = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

export const toTitleCase = (s: string) =>
  s.replace(/^\d+(?:-\d+)*-/, '')
   .replace(/-/g, ' ')
   .replace(/\b\w/g, c => c.toUpperCase());

const readFrontTitle = (fullPath: string): string | null => {
  try {
    const file = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(file);
    const t = (data?.title ?? data?.name) as string | undefined;
    return t ? String(t) : null;
  } catch { return null; }
};

const toSlug = (absPathWithoutExt: string) =>
  path.relative(contentRoot, absPathWithoutExt).split(path.sep).join('/');

const docNodeFromFile = (absMdPath: string): ContentNode => {
  const noExt = absMdPath.replace(/\.md$/i, '');
  const slug = toSlug(noExt);
  const fmTitle = readFrontTitle(absMdPath);
  const fileBase = path.basename(noExt);
  const title = fmTitle ? fmTitle : toTitleCase(fileBase);
  return { name: fileBase, slug, kind: 'doc', title };
};

const buildTree = (absDir: string, rel: string[] = []): ContentNode[] => {
  const entries = fs.readdirSync(absDir, { withFileTypes: true })
    .sort((a, b) => naturalSort(a.name, b.name));

  const dirs: ContentNode[] = [];
  const docs: ContentNode[] = [];

  for (const e of entries) {
    const full = path.join(absDir, e.name);
    if (e.isDirectory()) {
      const children = buildTree(full, [...rel, e.name]);
      dirs.push({
        name: e.name,
        slug: [...rel, e.name].join('/'),
        kind: 'dir',
        children
      });
    } else if (e.isFile() && e.name.endsWith('.md')) {
      docs.push(docNodeFromFile(full));
    }
  }

  return [...dirs, ...docs];
};

export const getContentTree = (): ContentNode[] => {
  if (!fs.existsSync(contentRoot)) return [];
  return buildTree(contentRoot, []);
};

export const listAllDocSlugs = (nodes: ContentNode[]): string[] => {
  const out: string[] = [];
  const walk = (n: ContentNode) => {
    if (n.kind === 'doc') out.push(n.slug);
    n.children?.forEach(walk);
  };
  nodes.forEach(walk);
  return out.sort(naturalSort);
};

export const getTopicContent = async (learning: string): Promise<{ contentHtml: string; data: Record<string, unknown>; }> => {
  const candidates = [
    path.join(contentRoot, `${learning}.md`),
    path.join(contentRoot, learning, 'index.md'),
  ];
  const fullPath = candidates.find(p => fs.existsSync(p));
  if (!fullPath) throw new Error(`Topic not found: ${learning}`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);
  return { contentHtml: processed.toString(), data };
};
