import * as React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { pages } from './List'
import { MdMenu, MdMail, MdForwardToInbox } from 'react-icons/md'

import Toolbar from '@mui/material/Toolbar'

const DrawList = ({ role }) => {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {pages
          .filter((item) => item.type === 'SERVICE')
          .filter((item) => (role === 'admin' ? item : item.role === 'user'))

          // .filter((item, index) => index < 2)

          // .filter((item, index) => item.role === 'user' && index !== 3)
          .map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {pages
          .filter((item) => item.type === 'OTHER')
          .map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
      </List>
    </div>
  )
}

function SideBar({ handleDrawerToggle, mobileOpen, window, drawerWidth }) {
  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <DrawList role="admin" />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        <DrawList role="admin" />
      </Drawer>
    </Box>
  )
}

export default SideBar
