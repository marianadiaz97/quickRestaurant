import React, {useState} from "react";
import {usePage} from '@inertiajs/inertia-react'
import clsx from "clsx";
import {Box, Container, CssBaseline, Divider, Drawer, Grid, List} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import {HalfCircleSpinner} from "react-epic-spinners";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import {Face, Restaurant, RoomService, SettingsPower} from "@material-ui/icons";


const Dashboard = (props) => {

    const { tableInformation } = props;
    const { has_permission, authUser } = usePage().props;

    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(false);
        //Inertia.post('/logout')
        axios.post('/logout').then(response => {
            //  Handling the response (Show a success message etc)
            window.location = "/"
        }).catch(error => {
            console.log(error, 'Desde error');
            //  Handling the response (Show an error notification etc)
            if (error.response) { // You can also check the status i.e 422
                console.log(error.response, 'desde response')
            }
        })
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <div>
                        <ListItem>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Face/>
                            </ListItemIcon>
                            <ListItemText
                                primary={authUser.name}
                            />
                        </ListItem>
                        {has_permission &&
                        <ListItem
                            button
                            component='a'
                            href='/users'>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Usuarios"
                            />
                        </ListItem>}
                        <ListItem
                            button
                            component='a'
                            href='/restaurants'>
                            <ListItemIcon>
                                <Restaurant />
                            </ListItemIcon>
                            <ListItemText
                                primary="Restaurantes"
                            />
                        </ListItem>
                    </div>
                </List>
                <List>
                    <div>
                        <ListItem
                            button
                            onClick={handleSubmit}
                        >
                            <ListItemIcon>
                                { loading && <HalfCircleSpinner
                                    size={20}
                                    color={'#fff'}
                                    className="mr-2"
                                />
                                }
                                <SettingsPower />
                            </ListItemIcon>
                            <ListItemText
                                primary="Cerrar Sesión"
                            />
                        </ListItem>
                    </div>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Recent Data */}
                        <Grid item xs={12}>
                            {/* Table Body Section*/}
                            {tableInformation}
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );

};

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Quick Restaurant
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default Dashboard;
