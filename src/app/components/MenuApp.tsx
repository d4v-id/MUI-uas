"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import GroupsIcon from '@mui/icons-material/Groups';
import Link from 'next/link';

export default function MenuApp() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='text-black'
        size='large'
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href="/dashboard/employee">
          <MenuItem>
            <ListItemIcon>
              <GroupsIcon fontSize="small" className='text-black' />
            </ListItemIcon>
            <ListItemText>Pegawai</ListItemText>
          </MenuItem>
        </Link>
        <Link href="/dashboard/storage">
          <MenuItem>
            <ListItemIcon>
              <WarehouseIcon fontSize="small" className='text-black' />
            </ListItemIcon>
            <ListItemText>Gudang</ListItemText>
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}