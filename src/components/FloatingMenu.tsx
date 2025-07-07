import React, { useRef, useState, MouseEvent, SyntheticEvent } from "react";
import {
  Box,
  ClickAwayListener,
  FabProps,
  Menu,
  MenuItem,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LanguageIcon from "@mui/icons-material/Language";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "@/contexts/ThemeModeContext";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

type Lang = "pt" | "en";

interface FloatingMenuProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function FloatingMenu({ lang, onLangChange }: FloatingMenuProps) {
  const { mode, toggleMode } = useThemeMode();

  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const langBtnRef = useRef<HTMLElement | null>(null);
  const downloadBtnRef = useRef<HTMLElement | null>(null);

  const handleLangToggle = (e: MouseEvent<HTMLElement>) => {
    langBtnRef.current = e.currentTarget;
    setLangOpen((prev) => !prev);
  };

  const handleDownloadToggle = (e: MouseEvent<HTMLElement>) => {
    downloadBtnRef.current = e.currentTarget;
    setDownloadOpen((prev) => !prev);
  };

  const handleSpeedDialClose = (
    _e: SyntheticEvent<{}, Event>,
    reason: "toggle" | "blur" | "mouseLeave" | "escapeKeyDown"
  ) => {
    if (reason === "toggle" || reason === "escapeKeyDown") {
      setSpeedDialOpen(false);
    }
  };

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
    <ClickAwayListener
      onClickAway={() => {
        setSpeedDialOpen(false);
        setLangOpen(false);
        setDownloadOpen(false);
      }}
    >
      <Box>
        <SpeedDial
          ariaLabel="Menu rápido"
          icon={<SpeedDialIcon />}
          sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300 }}
          open={speedDialOpen}
          onOpen={() => setSpeedDialOpen(true)}
          onClose={handleSpeedDialClose}
        >
          <SpeedDialAction
            icon={<WhatsAppIcon sx={{ fontSize: 22, color: "#25D366" }} />}
            slotProps={{
              tooltip: {
                title: "WhatsApp"
              },
              fab: {
                component: "a",
                href: "https://wa.me/5553999670470",
                rel: "noopener noreferrer",
                target: "_blank"
              } as Partial<FabProps<"a">>
            }}
          />

          <SpeedDialAction
            icon={<LinkedInIcon sx={{ fontSize: 22, color: "#0077B5" }} />}
            slotProps={{
              tooltip: {
                title: "LinkedIn",
              },
              fab: {
                component: "a",
                href: "https://www.linkedin.com/in/filipetcardozo",
                rel: "noopener noreferrer",
                target: "_blank",
              } as Partial<FabProps<"a">>,
            }}
          />

          <SpeedDialAction
            icon={<DownloadIcon />}
            tooltipTitle="Downloads"
            onClick={handleDownloadToggle}
            ref={downloadBtnRef}
          />

          <SpeedDialAction
            icon={mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            tooltipTitle={mode === "dark" ? "Modo claro" : "Modo escuro"}
            onClick={toggleMode}
          />

          <SpeedDialAction
            icon={<LanguageIcon />}
            tooltipTitle="Idioma"
            onClick={handleLangToggle}
            ref={langBtnRef}
          />
        </SpeedDial>

        <Menu
          anchorEl={langBtnRef.current}
          open={langOpen}
          onClose={() => setLangOpen(false)}
          disableScrollLock
          disablePortal
          anchorOrigin={{ vertical: "center", horizontal: "left" }}
          transformOrigin={{ vertical: "center", horizontal: "right" }}
        >
          {(["pt", "en"] as Lang[]).map((l) => (
            <MenuItem
              key={l}
              selected={lang === l}
              onClick={() => {
                onLangChange(l);
                setLangOpen(false);
              }}
            >
              <Typography fontWeight={lang === l ? "bold" : "normal"}>
                {l === "pt" ? "Português" : "English"}
              </Typography>
            </MenuItem>
          ))}
        </Menu>

        <Menu
          anchorEl={downloadBtnRef.current}
          open={downloadOpen}
          onClose={() => setDownloadOpen(false)}
          disableScrollLock
          disablePortal
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
              onClick={() => setDownloadOpen(false)}
              sx={{ gap: 1 }}
            >
              {icon}
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </ClickAwayListener>
  );
}
