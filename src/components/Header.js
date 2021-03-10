import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AvatarIcon from '@material-ui/core/Avatar';
import { useStateValue } from '../StateProvider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AddIcon from '@material-ui/icons/Add';
import AppsIcon from '@material-ui/icons/Apps';
import { auth } from '../firebase';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import HomeIcon from '@material-ui/icons/Home'
import '../styles/Header.css'
import ListAltIcon from '@material-ui/icons/ListAlt';
import EnrolledClassesList from './EnrolledClassesList'
import JoinClass from './JoinClass';
import CreateClass from './CreateClass'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(0),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        marginTop: theme.spacing(0.5),
        height: '25px',
        display: 'grid',
        marginRight: theme.spacing(1),
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    List: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },

}));



function Header() {
    const [{ user, joinClassState, createClassState }, dispatch] = useStateValue()
    const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
    const classes = useStyles();

    const [profilePopup, setProfilePopup] = React.useState(null);
    const [createPopup, setCreatePopup] = React.useState(null);

    const [drawerState, setDrawerState] = useState(false);

    const drawerToggle = () => {
        setDrawerState(true)
    }

    const closeDrawer = () => {
        setDrawerState(false)
    }

    const handleCreatePopupClick = (event) => {
        setCreatePopup(event.currentTarget)
    }
    const handleCreatePopupClose = (event) => {
        setCreatePopup(null)
    }

    const handleProfilePopupClick = (event) => {
        setProfilePopup(event.currentTarget)
    };

    const handleProfilePopupClose = () => {
        setProfilePopup(null);
    };
    const handleSignOut = () => {
        auth.signOut()
    }

    const handleCreate = () => {
        setCreatePopup(null)
        dispatch({
            type: "SET_CREATE_DIAG",
            createClassState: true
        })
    }

    const handleJoin = () => {
        setCreatePopup(null)
        dispatch({
            type: "SET_JOIN_DIAG",
            joinClassState: true
        })
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            const ismobile = window.innerWidth < 720;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false);
    }, [isMobile]);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color={'default'}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={drawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Link to="/"><img className={classes.logo} src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="" /></Link>
                    <Typography variant="h6" className={classes.title}>
                    <Link to="/">Classroom</Link>
                    </Typography>
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleCreatePopupClick}>
                        <AddIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={createPopup}
                        keepMounted
                        open={Boolean(createPopup)}
                        onClose={handleCreatePopupClose}
                    >
                        <MenuItem onClick={handleCreate}>Create class</MenuItem>
                        <MenuItem onClick={handleJoin}>Join class</MenuItem>
                    </Menu>

                    {
                        !isMobile ?
                            (
                                <>
                                    <IconButton>
                                        <AppsIcon />
                                    </IconButton>

                                </>

                            ) : <></>
                    }

                    {
                        !isMobile ? (
                            <div>
                                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleProfilePopupClick}
                                >
                                    <AvatarIcon src={user?.photoURL} />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={profilePopup}
                                    keepMounted
                                    open={Boolean(profilePopup)}
                                    onClose={handleProfilePopupClose}
                                >
                                    <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                                </Menu>
                            </div>
                        ) : <></>
                    }

                </Toolbar>
            </AppBar>
            <Toolbar></Toolbar>
            <Drawer open={drawerState} onClose={closeDrawer} >
                <List >
                    <ListItem button>
                        <ListItemIcon>
                            <AvatarIcon src={user?.photoURL} />
                        </ListItemIcon>
                        <ListItemText primary={user.displayName} secondary={user.email} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <Link to="/">
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Classes" />
                    </ListItem>
                    </Link>
                    <ListItem button>
                        <ListItemIcon>
                            <CalendarTodayIcon />
                        </ListItemIcon>
                        <ListItemText primary="Calendar" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText secondary="Enrolled" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="To-do" />
                    </ListItem>
                    <EnrolledClassesList />
                </List>

            
            </Drawer>

            <JoinClass />
            <CreateClass />

        </div>

    )
}

export default Header
