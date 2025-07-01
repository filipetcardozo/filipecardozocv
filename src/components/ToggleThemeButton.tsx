import { IconButton, Tooltip, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

type Props = {
  mode: 'light' | 'dark';
  toggle: () => void;
};

export function ToggleThemeButton({ mode, toggle }: Props) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1300,
      }}
    >
      <Tooltip title={mode === 'dark' ? 'Modo claro' : 'Modo escuro'}>
        <IconButton
          onClick={toggle}
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 3,
            width: 48,
            height: 48,
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
