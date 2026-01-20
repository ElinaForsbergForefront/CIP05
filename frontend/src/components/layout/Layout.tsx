import { useState } from "react"
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Outlet, Link as RouterLink } from "react-router-dom"
import logo from "../../assets/images/logo.png"

const navItems = [{ label: "Home", path: "/" }]

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2 }}>
        <img src={logo} alt="Logo" style={{ height: 40 }} />
      </Box>
      <List>
        {navItems.map(item => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={RouterLink} to={item.path} sx={{ textAlign: "center" }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Header/Navigation */}
      <AppBar
        position="sticky"
        component="nav"
        elevation={0}
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 70, md: 90 },
            }}
          >
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open navigation menu"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="Logo" style={{ height: 40 }} />
            </Box>
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 3 }}>
                {navItems.map(item => (
                  <Typography
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: "text.primary",
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: { xs: 3, sm: 4 },
          px: 2,
          mt: "auto",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} FlightFront. All rights reserved.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, sm: 3 },
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {navItems.map(item => (
                <Typography
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
