import React from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";

type Lang = "pt" | "en";

interface FloatingMenuProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function FloatingMenu({ lang, onLangChange }: FloatingMenuProps) {
  const [downloadAnchor, setDownloadAnchor] = React.useState<null | HTMLElement>(null);
  const [langAnchor, setLangAnchor] = React.useState<null | HTMLElement>(null);

  const handleDownloadOpen = (e: React.MouseEvent<HTMLElement>) =>
    setDownloadAnchor(e.currentTarget);
  const handleDownloadClose = () => setDownloadAnchor(null);

  const handleLangOpen = (e: React.MouseEvent<HTMLElement>) =>
    setLangAnchor(e.currentTarget);
  const handleLangClose = () => setLangAnchor(null);

  const theme = useTheme();

  return (
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300 }}>
      <Box sx={{ mb: 2 }}>
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
            "&:hover": {
              bgcolor: "#1EBE5D",
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>

      <Box sx={{ mb: 2 }}>
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
        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          onClose={handleLangClose}
          anchorOrigin={{ vertical: "center", horizontal: "left" }}
          transformOrigin={{ vertical: "center", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              onLangChange("pt");
              handleLangClose();
            }}
            selected={lang === "pt"}
          >
            <Typography fontWeight={lang === "pt" ? "bold" : "normal"}>
              Português
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={() => {
              onLangChange("en");
              handleLangClose();
            }}
            selected={lang === "en"}
          >
            <Typography fontWeight={lang === "en" ? "bold" : "normal"}>
              English
            </Typography>
          </MenuItem>
        </Menu>
      </Box>

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

      <Menu
        anchorEl={downloadAnchor}
        open={Boolean(downloadAnchor)}
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

        <MenuItem
          component="a"
          href="/files/Filipe%20Cardozo%20-%20Curr%C3%ADculo.pdf"
          download
          onClick={handleDownloadClose}
          sx={{ gap: 1 }}
        >
          <DescriptionIcon fontSize="small" />
          Currículo
        </MenuItem>

        <MenuItem
          component="a"
          href="/files/Filipe%20Cardozo%20-%20Carta%20de%20Apresenta%C3%A7%C3%A3o.pdf"
          download
          onClick={handleDownloadClose}
          sx={{ gap: 1 }}
        >
          <MailOutlineIcon fontSize="small" />
          Carta de apresentação
        </MenuItem>
      </Menu>
    </Box>
  );
}
