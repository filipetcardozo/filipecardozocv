import Head from "next/head";
import * as React from "react";
import { FloatingMenu } from "@/components/FloatingMenu";

export default function Home() {
  type Lang = "pt" | "en";
  const [lang, setLang] = React.useState<Lang>("pt");

  const ptSrc =
    "https://joyous-eater-924.notion.site/ebd/21642363eee6800d8f5be092eee6d4b7";
  const enSrc =
    "https://joyous-eater-924.notion.site/ebd/22642363eee680959498d92ef2839d0d";

  return (
    <>
      <Head>
        <title>Filipe Cardozo</title>
        <meta name="description" content="Currículo de Filipe Cardozo" />
      </Head>

      <div
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <iframe
          src={lang === "pt" ? ptSrc : enSrc}
          style={{
            height: "100%",
            width: "100%",
            border: "none",
          }}
          allowFullScreen
        />
      </div>

      <FloatingMenu lang={lang} onLangChange={setLang} />
    </>
  );
}
