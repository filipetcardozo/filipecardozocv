import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export interface Topic {
  slug: string;
  title: string;
}

export interface Section {
  area: string;
  topics: Topic[];
}

const contentRoot = path.join(process.cwd(), 'src/markdowns');

const naturalSort = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

export function getAllSections(): Section[] {
  try {
    const areas = fs
      .readdirSync(contentRoot, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .sort((a, b) => naturalSort(a.name, b.name));

    return areas.map<Section>((dir) => {
      const area = dir.name;

      const files = fs
        .readdirSync(path.join(contentRoot, area), { withFileTypes: true })
        .filter((f) => f.isFile() && f.name.endsWith('.md'))
        .sort((a, b) => naturalSort(a.name, b.name));

      const topics = files.map<Topic>((file) => {
        const base = file.name.replace(/\.md$/, '');
        const slug = `${area}/${base}`;

        const title = base
          .replace(/^\d+-/, '')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return { slug, title };
      });

      return { area, topics };
    });
  } catch (err) {
    console.error('❌ getAllSections():', err);
    return [];
  }
}

export async function getTopicContent(learning: string): Promise<{
  contentHtml: string;
  data: Record<string, unknown>;
}> {
  const fullPath = path.join(contentRoot, `${learning}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { content, data } = matter(fileContents);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return { contentHtml: processed.toString(), data };
}
