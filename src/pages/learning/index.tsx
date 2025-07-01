import { getAllTopics } from '@/utils/md';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticProps() {
  return {
    props: {
      topics: getAllTopics(),
    },
  };
}

export default function KnowledgeIndex({ topics }: any) {
  return (
    <>
      <Head>
        <title>Technical Knowledge</title>
        <meta name="description" content="Topics and technical knowledge by Filipe Cardozo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div
        style={{
          maxWidth: '768px',
          margin: '0 auto',
          padding: '2rem 1rem',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          Technical Knowledge
        </h1>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {topics.map((topic: any) => (
            <Link
              key={topic.learning}
              href={`/learning/${topic.learning}`}
              style={{
                display: 'block',
                padding: '1rem 1.25rem',
                borderRadius: '8px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                color: '#111827',
                textDecoration: 'none',
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#f9fafb';
              }}
            >
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                {topic.area}
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: '500' }}>{topic.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
