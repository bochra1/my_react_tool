import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CreateIcon from '@mui/icons-material/Create';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminDashboard from './AdminDashboard';
import Home from './Home';
import CreateScript from "./CreateScript";
const drawerWidth = 240;
const menuItems = [
    { text: 'AdminDashboard', link: '/admindashboard', icon: <DashboardIcon />  },
    { text: 'Run Script', link: '/home', icon: <PlayArrowIcon /> },
    { text: 'Create Script', link: '/CreateScript',icon: <CreateIcon /> },
    { text: 'Drafts', link: '/drafts',icon: <DraftsIcon />  },
    { text: 'Logout', link: '/login',icon: <ExitToAppIcon />  }

  ];
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', { 
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const AppHeader = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const [userrole, setrole] = useState("");
    const [pathname, setpathname] = useState("");

    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {

        if (location.pathname === '/login' || location.pathname === '/register' || location.pathname ==='/ExtentReportComponent') {
            showmenuupdateupdate(false);
        } 
        else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem('username');
            let userrole = sessionStorage.getItem('userrole');
            let pathname = location.pathname;;
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
                setrole(userrole)
                setpathname(pathname)
            }
        }
        

    }, [location])
    return (
        <div>
     { showmenu &&  
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor:'white'}} >
        <Toolbar style={{color:'red'}} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{color:'red'}}>
LineData Reporting          </Typography> 
 <span style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></span>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose} style={{color:'red'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List style={{ color: 'red' }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component="a" href={item.link}>
              <ListItemIcon style={{ color: 'red' }}>
                  {item.icon}      
        </ListItemIcon>
              <ListItemText primary={item.text} style={{ color: 'red' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
        <Divider />
       
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {userrole == 'admin'&& pathname=='/admindashboard' && <AdminDashboard/>}
        {(userrole == 'user' || userrole=='admin' )&&pathname=='/home' && <Home/>}
        {(userrole == 'user'|| userrole=='admin')&& pathname=='/CreateScript' && <CreateScript/>}

        <Typography paragraph>
          
        </Typography>
      
      </Main>
    </Box>
               } </div>    );
}

export default AppHeader;