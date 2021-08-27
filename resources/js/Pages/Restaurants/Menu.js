import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import {Badge, Grid, IconButton } from "@material-ui/core";
import CardDish from "../../components/dishes/CardDish";
import {Book, RemoveShoppingCart, SettingsPower, ShoppingCartRounded} from "@material-ui/icons";
import useLocalStorage from "../../hooks/useLocalStorage";
import ModalUserOrder from "../../components/orders/ModalUserOrder";
import {Inertia} from "@inertiajs/inertia";
import {usePage} from "@inertiajs/inertia-react";


const MenuRestaurants = (props) => {

    const { restaurant } = props;
    const { authUser } = usePage().props;

    const dishes =  restaurant.dishes ?? [];

    const [userOrder, setUserOrder] = useLocalStorage('userOrder', []);
    const [openUserOrder, setOpenUserOrder] = useState(false);

    const handleOpenUserOrder = (e) => {
        e.preventDefault();
        setOpenUserOrder(true);
    };

    const handleCloseUserOrder = () => {
        setOpenUserOrder(false);
    };

    const handlePay = (e) => {
        e.preventDefault();
        if (authUser) {
            Inertia.post(`/orders/create`, {
                restaurant_id: restaurant.id,
                dishes: userOrder
            })
        }else {
            Inertia.get(`/register/${restaurant.id}`)
        }
    };

    const handleRemove = (index) => {
        // remove item
        const newOrder = [... userOrder];
        newOrder.splice(index, 1);
        setUserOrder(userOrder => [... newOrder]);
    }

    const handleEmptyCar = () => {
        setUserOrder([]);
    }

    const handleLogout = (e) => {
        e.preventDefault()
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
        <>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">{`Menú: ${restaurant.name}`}</Typography>
                    {authUser && <>
                    <IconButton
                        aria-label="user orders"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => {
                            Inertia.get(`/user/${authUser.id}/orders`)
                        }}
                        className='ml-2'
                    >
                        <Badge badgeContent='Ordenes' color="secondary" >
                            <Book/>
                        </Badge>
                    </IconButton>
                    <IconButton
                        aria-label="user logout"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleLogout}
                        className='ml-2'
                    >
                        <Badge color="secondary" >
                            <SettingsPower/>
                        </Badge>
                    </IconButton> </>}
                    <IconButton
                        aria-label="user logout"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleEmptyCar}
                        className='ml-2'
                    >
                        <Badge badgeContent='Vaciar' color="secondary" >
                            <RemoveShoppingCart/>
                        </Badge>
                    </IconButton>
                    <div className='col text-right'>
                        <IconButton
                            aria-label="cart shooping user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleOpenUserOrder}
                        >
                            <Badge badgeContent={Number(userOrder.length)} color="secondary">
                                <ShoppingCartRounded/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <Container>
                <Box my={2}>
                    <Grid container spacing={3}>
                        {dishes.length > 0 && dishes.map(dish => (
                            <React.Fragment key={dish.id}>
                                <Grid item md={4} sm={12}>
                                    <CardDish
                                        dish={dish}
                                        setUserOrder={setUserOrder}
                                    />
                                    <ModalUserOrder
                                        authUser={authUser}
                                        dishes={dishes}
                                        userOrder={userOrder}
                                        open={openUserOrder}
                                        handleClose={handleCloseUserOrder}
                                        setUserOrder={setUserOrder}
                                        handlePay={handlePay}
                                        handleRemove={handleRemove}
                                        handleEmptyCar={handleEmptyCar}
                                    />
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Box>
            </Container>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    root_container: {
        flexGrow: 1,
        marginTop: 2,
        marginBottom: 2,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

}));

const ScrollTop = (props) => {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}


export default MenuRestaurants;
