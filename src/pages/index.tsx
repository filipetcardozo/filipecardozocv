import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Filipe Cardozo — Currículo</title>
        <meta name="description" content="Currículo de Filipe Cardozo" />
      </Head>
      <main>
        <main className="min-h-screen w-screen h-screen m-0 p-0 overflow-hidden">
          <iframe
            src="https://joyous-eater-924.notion.site/ebd/21642363eee6800d8f5be092eee6d4b7"
            className="w-full h-full border-0"
            allowFullScreen
          ></iframe>
        </main>
      </main>
    </>
  );
}
