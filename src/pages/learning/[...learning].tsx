import { getAllTopics, getTopicContent } from '@/utils/md';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

export default function LearningTopicPage({ contentHtml }: { contentHtml: string }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Learning Topic</title>
      </Head>

      <main
        style={{
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          color: '#1f2937',
          padding: '1rem',
          boxSizing: 'border-box',
          overflowX: 'hidden'
        }}
      >
        <div
          style={{
            maxWidth: '1024px',
            width: '100%',
            margin: '5rem auto 0',
            padding: '0 1rem',
            boxSizing: 'border-box',
          }}
        >
          <article
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.6',
              wordBreak: 'break-word',
              overflowWrap: 'anywhere'
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </article>
        </div>
      </main>

    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = getAllTopics();

  const paths = topics.map(({ learning }) => ({
    params: { learning: learning.split('/') },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const learning = (params!.learning as string[]).join('/');
  const { contentHtml } = await getTopicContent(learning);

  return { props: { contentHtml } };
};
