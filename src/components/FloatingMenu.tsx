import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "@/contexts/ThemeModeContext";

type Lang = "pt" | "en";

interface FloatingMenuProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function FloatingMenu({
  lang,
  onLangChange
}: FloatingMenuProps) {
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(null);
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);

  const { mode, theme, toggleMode } = useThemeMode();

  const handleDownloadOpen = (e: React.MouseEvent<HTMLElement>) =>
    setDownloadAnchor(e.currentTarget);
  const handleDownloadClose = () => setDownloadAnchor(null);

  const handleLangOpen = (e: React.MouseEvent<HTMLElement>) =>
    setLangAnchor(e.currentTarget);
  const handleLangClose = () => setLangAnchor(null);

  const downloads: Record<
    Lang,
    { label: string; href: string; icon: React.ReactNode }[]
  > = {
    pt: [
      {
        label: "Currículo",
        href: "/files/Filipe Cardozo - CV.pdf",
        icon: <DescriptionIcon fontSize="small" />,
      },
      {
        label: "Carta de apresentação",
        href: "/files/Filipe Cardozo - Carta de Apresentação.pdf",
        icon: <MailOutlineIcon fontSize="small" />,
      },
    ],
    en: [
      {
        label: "Resume",
        href: "/files/Filipe Cardozo - CV English.pdf",
        icon: <DescriptionIcon fontSize="small" />,
      },
      {
        label: "Cover Letter",
        href: "/files/Filipe Cardozo - Cover Letter.pdf",
        icon: <MailOutlineIcon fontSize="small" />,
      },
    ],
  };

  return (
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300 }}>
      <Box sx={{ mb: 2 }}>
        <Tooltip title="Fale comigo no WhatsApp" placement="left">
          <IconButton
            aria-label="Fale comigo no WhatsApp"
            href="https://wa.me/5553999670470"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            sx={{
              bgcolor: "#25D366",
              color: "white",
              width: 56,
              height: 56,
              boxShadow: 3,
              "&:hover": { bgcolor: "#1EBE5D" },
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Tooltip title="Alterar idioma" placement="left">
          <IconButton
            aria-label="Alterar idioma"
            onClick={handleLangOpen}
            size="large"
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              width: 56,
              height: 56,
              boxShadow: 3,
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <LanguageIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          disableScrollLock
          onClose={handleLangClose}
          anchorOrigin={{ vertical: "center", horizontal: "left" }}
          transformOrigin={{ vertical: "center", horizontal: "right" }}
        >
          {(["pt", "en"] as Lang[]).map((l) => (
            <MenuItem
              key={l}
              onClick={() => {
                onLangChange(l);
                handleLangClose();
              }}
              selected={lang === l}
            >
              <Typography fontWeight={lang === l ? "bold" : "normal"}>
                {l === "pt" ? "Português" : "English"}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Tooltip title="Baixar arquivos" placement="left">
        <IconButton
          aria-label="Baixar arquivos"
          onClick={handleDownloadOpen}
          size="large"
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            width: 56,
            height: 56,
            boxShadow: 3,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <DownloadIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={downloadAnchor}
        open={Boolean(downloadAnchor)}
        disableScrollLock
        onClose={handleDownloadClose}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
      >
        <Typography
          variant="subtitle2"
          sx={{ mb: 1, color: "text.secondary", px: 1 }}
        >
          Downloads
        </Typography>

        {downloads[lang].map(({ label, href, icon }) => (
          <MenuItem
            key={href}
            component="a"
            href={href}
            download
            onClick={handleDownloadClose}
            sx={{ gap: 1 }}
          >
            {icon}
            {label}
          </MenuItem>
        ))}
      </Menu>

      <Box sx={{ mt: 2 }}>
        <Tooltip title={mode === "dark" ? "Modo claro" : "Modo escuro"} placement="left">
          <IconButton
            aria-label="Alternar tema"
            onClick={toggleMode}
            size="large"
            sx={{
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              width: 56,
              height: 56,
              boxShadow: 3,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
