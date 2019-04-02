import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./listItems";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DialogComponent from "./Dialog";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  userDetails: {
    display: "flex",
    marginLeft: theme.spacing.unit * 2,
    alignItems: "center"
  }
});

const Dashboard = ({
  classes,
  children,
  open,
  toggleDrawer,
  anchorEl,
  toggleMenu,
  menuOpen,
  username,
  userEmail,
  lastLogin,
  dialog_open,
  type,
  onFormChange,
  onFormSubmit,
  onFormToggle,
  serviceData
}) => (
  <div className={classes.root}>
    <CssBaseline />
    <AppBar
      position="absolute"
      className={classNames(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar disableGutters={!open} className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={() => toggleDrawer(true)}
          className={classNames(
            classes.menuButton,
            open && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Dashboard
        </Typography>

        <div className={classes.userDetails}>
          <div>
            <Typography color="inherit">{username}</Typography>
            <Typography variant="caption" color="inherit">
              {userEmail}
            </Typography>
          </div>
          <IconButton
            aria-owns={menuOpen ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={event => toggleMenu(event.currentTarget)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={menuOpen}
            onClose={() => toggleMenu(null)}
          >
            <MenuItem onClick={() => toggleMenu(null)}>
              <Typography variant="caption">{lastLogin}</Typography>
            </MenuItem>
            <MenuItem onClick={() => toggleMenu(null)}>Log out</MenuItem>
          </Menu>
        </div>
        <IconButton color="inherit">
          <Badge badgeContent={50} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
    <DialogComponent
      OPEN={dialog_open}
      type={type}
      onFormChange={onFormChange}
      onFormSubmit={onFormSubmit}
      onFormToggle={onFormToggle}
      serviceData={serviceData}
    />
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(
          classes.drawerPaper,
          !open && classes.drawerPaperClose
        )
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => toggleDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
    </Drawer>
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      {children}
    </main>
  </div>
);

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  toggleDrawer: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  onFormToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
  dialog_open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  serviceData: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
