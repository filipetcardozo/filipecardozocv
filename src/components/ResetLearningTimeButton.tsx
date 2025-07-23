import { IconButton, Tooltip, Box } from '@mui/material';
import { resetTimes } from '@/utils/learningTime';
import React from 'react';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

interface Props {
  onReset?: () => void;
}

export function ResetLearningTimeButton({ onReset }: Props) {
  const handleClick = () => {
    if (window.confirm('Zerar tempo de estudo?')) {
      resetTimes();
      onReset?.();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 88,
        zIndex: 1300,
      }}
    >
      <Tooltip title='Zerar tempos de estudo'>
        <IconButton
          onClick={handleClick}
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
          <SettingsBackupRestoreIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
