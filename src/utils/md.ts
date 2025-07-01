import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentRoot = path.join(process.cwd(), 'src/markdowns');

export function getAllTopics() {
  const areas = fs.readdirSync(contentRoot);

  return areas.flatMap(area => {
    const files = fs.readdirSync(path.join(contentRoot, area));
    return files.map(filename => ({
      learning: `${area}/${filename.replace(/\.md$/, '')}`,
      title: filename.replace(/\.md$/, '').replace(/-/g, ' '),
      area,
    }));
  });
}

export async function getTopicContent(learning: string) {
  const fullPath = path.join(contentRoot, `${learning}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { content, data } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    learning,
    contentHtml,
    data,
  };
}
