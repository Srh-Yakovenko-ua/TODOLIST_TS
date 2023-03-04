import * as React from 'react'

import { AccountCircle } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../store'
import { logoutTC } from '../../store/appAuth/appAuth-reducer'
import { appAuthSelectors } from '../../store/appAuth/appAuth-selectors'

import { appBarContainer, appBarIconButton, appBarMenu, appBarTitle } from './app-bar-style'

export const MenuAppBar = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(appAuthSelectors)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)
  const logout = () => dispatch(logoutTC())

  return (
    <Box sx={appBarContainer}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={appBarIconButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={appBarTitle}>
            TodoList
          </Typography>
          {isAuth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                sx={appBarMenu}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
