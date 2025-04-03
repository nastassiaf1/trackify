import { useState } from 'react';
import { Box, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import { ColorVariant } from 'src/api/interfaces';
import { cardColors } from 'src/api/constants';
import { ColorSelectorProps } from '../constants';

const ColorSelector = ({ selectedColor, onSelect }: ColorSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (color: ColorVariant) => {
    onSelect(color);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Select Color">
        <IconButton
          onClick={handleClick}
          sx={{
            width: 28,
            height: 28,
            padding: 0,
            border: '1px solid #a7a7a7',
            background:
              'linear-gradient(90deg, #ffc9d2, #e1c9ff, #c9cdff, #c9ffdc)',
            '&:hover': {
              borderColor: '#818181',
              backgroundColor: selectedColor || '#fff',
            },
          }}
        />
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 1 }}>
          {Object.entries(cardColors).map(([key, value]) => (
            <MenuItem key={key} disabled={selectedColor === key}>
              <Tooltip title={key}>
                <IconButton
                  onClick={() => handleSelect(key as ColorVariant)}
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: value,
                    border:
                      selectedColor === (key as ColorVariant)
                        ? '2px solid #000'
                        : '1px solid #ccc',
                    borderRadius: '50%',
                    transition: '0.2s',
                    '&:hover': {
                      borderColor: '#a7a7a7',
                      backgroundColor: value || '#fff',
                    },
                  }}
                  disabled={selectedColor === key}
                />
              </Tooltip>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default ColorSelector;
