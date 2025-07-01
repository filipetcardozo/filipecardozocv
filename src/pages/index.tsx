import { FloatingMenu } from '@/components/FloatingMenu';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Filipe Cardozo</title>
        <meta name="description" content="Currículo de Filipe Cardozo" />
      </Head>

      <div
        style={{
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        }}
      >
        <iframe
          src="https://joyous-eater-924.notion.site/ebd/21642363eee6800d8f5be092eee6d4b7"
          style={{
            height: '100%',
            width: '100%',
            border: 'none',
          }}
          allowFullScreen
        />
      </div>

      <FloatingMenu />
    </>
  );
}
