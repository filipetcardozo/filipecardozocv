import * as React from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";

export function FloatingMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const theme = useTheme();
  const bgColor =
    theme.palette.mode === "light"
      ? theme.palette.background.paper
      : theme.palette.grey[800];

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

      <IconButton
        aria-label="Baixar arquivos"
        onClick={handleOpen}
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
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
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
          onClick={handleClose}
          sx={{ gap: 1 }}
        >
          <DescriptionIcon fontSize="small" />
          Currículo
        </MenuItem>

        <MenuItem
          component="a"
          href="/files/Filipe%20Cardozo%20-%20Carta%20de%20Apresenta%C3%A7%C3%A3o.pdf"
          download
          onClick={handleClose}
          sx={{ gap: 1 }}
        >
          <MailOutlineIcon fontSize="small" />
          Carta de apresentação
        </MenuItem>
      </Menu>
    </Box>
  );
}
