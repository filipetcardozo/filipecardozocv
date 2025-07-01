import Head from 'next/head';

export default function CoverLetter() {
  return (
    <>
      <Head>
        <title>Filipe Cardozo — Carta de Apresentação</title>
        <meta name="description" content="Carta de apresentação de Filipe Cardozo" />
      </Head>
      <main
        style={{
          minHeight: '100vh',
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <iframe
          src="https://joyous-eater-924.notion.site/ebd/21f42363eee680048073cd5d0a55333f"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allowFullScreen
        />
      </main>
    </>
  );
}
