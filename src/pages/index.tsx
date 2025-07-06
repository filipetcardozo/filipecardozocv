import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { FloatingMenu } from "@/components/FloatingMenu";
import fs from "fs";
import path from "path";
import { useThemeMode } from "@/contexts/ThemeModeContext";
import { useRouter } from "next/router";
import { ParticlesBackground } from "@/components/ParticlesBackground";

type Lang = "pt" | "en";

export async function getStaticProps() {
  const ptPath = path.join(process.cwd(), "public/files/resume-pt.html");
  const enPath = path.join(process.cwd(), "public/files/resume-en.html");

  return {
    props: {
      ptHtml: fs.readFileSync(ptPath, "utf-8"),
      enHtml: fs.readFileSync(enPath, "utf-8"),
    },
  };
}

export default function Home({
  ptHtml,
  enHtml,
}: {
  ptHtml: string;
  enHtml: string;
}) {
  const router = useRouter();
  const { theme } = useThemeMode();

  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    const qLang = (router.query.lang as string | undefined)?.toLowerCase();
    if (qLang === "en" || qLang === "pt") {
      setLang(qLang);
      return;
    }

    const browserLang = navigator.language.toLowerCase();
    setLang(browserLang.startsWith("en") ? "en" : "pt");
  }, [router.query.lang]);

  const handleLangChange = useCallback(
    (l: Lang) => {
      setLang(l);
      router.push(
        { pathname: router.pathname, query: { ...router.query, lang: l } },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>Filipe Cardozo</title>
        <meta
          name="description"
          content={
            lang === "pt"
              ? "Currículo de Filipe Cardozo"
              : "Filipe Cardozo's Resume"
          }
        />
      </Head>

      <Box
        sx={{
          overflowY: "auto",
          color: theme.palette.mode === "dark" ? "#f0f0f0" : "#32302C",
        }}
      >
        <Box
          className={`notion-html ${theme.palette.mode}`}
          dangerouslySetInnerHTML={{ __html: lang === "pt" ? ptHtml : enHtml }}
          sx={{
            maxWidth: 900,
            px: 2,
            mb: 15,
            "& hr": { background: theme.palette.mode === "dark" ? '#ffffff61' : '#00000061' },
            "& a": { textDecoration: "underline" },
            "& blockquote": {
              borderLeft: "4px solid",
              borderColor:
                theme.palette.mode === "dark" ? "#555" : "rgba(0,0,0,0.1)",
              pl: 1,
              opacity: 0.85,
            },
            "& .callout": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#2525250a",
              borderRadius: 1,
              p: 2,
            },
          }}
        />
      </Box>

      <ParticlesBackground />

      <FloatingMenu
        lang={lang}
        onLangChange={handleLangChange}
      />
    </>
  );
}
