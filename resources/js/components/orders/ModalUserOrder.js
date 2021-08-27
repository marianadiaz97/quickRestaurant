import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Modal
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Check, RemoveShoppingCart} from "@material-ui/icons";
import {Alert, AlertTitle} from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";

const ModalUserOrder = ({authUser, dishes, userOrder, handleRemove, open, handleClose, handlePay, handleEmptyCar}) => {

    const classes = useStyles();
    const totalPrices = userOrder.map(o => o.price) ?? [];
    let total = 0;
    if (userOrder.length > 0){
        total = totalPrices.reduce((a, b) => {
            return a + b;
        });
    }

    const body = (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                {userOrder.length > 0 ? userOrder.map((dish, index) => (
                                    <DishDescription
                                        key={index}
                                        index={index}
                                        dishes={dishes}
                                        dish={dish}
                                        handleRemove={handleRemove}
                                    />
                                )) : <Grid item xs={12} sm={12}>
                                    <Alert severity="warning">
                                        <AlertTitle>Carrito Vacio</AlertTitle>
                                        <strong>Agrega algo del menú</strong>
                                    </Alert>
                                </Grid>}
                            </Grid>
                        </CardContent>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="total"
                                        label="Total a pagar"
                                        name="total"
                                        disabled
                                        value={`${total} COP`}
                                    />
                                </Grid>
                                {authUser &&
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="user_order"
                                        label="Orden de:"
                                        name="user_order"
                                        disabled
                                        value={authUser.name}
                                    />
                                </Grid>}
                            </Grid>
                        </CardContent>
                        <CardActions >
                            <Button
                                type='button'
                                variant='contained'
                                className='mr-2'
                                onClick={handleEmptyCar}
                                startIcon={<RemoveShoppingCart />}
                            >
                                Vaciar Carrito
                            </Button>
                            <Button
                                onClick={handlePay}
                                type='button'
                                variant='contained'
                                color='secondary'
                                startIcon={<Check />}
                            >
                                Confirmar Orden
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    );

    return (
        <div>
            <Modal
                className={classes.modalScroll}
                open={open}
                onClose={handleClose}
                aria-labelledby="user-order-modal"
                aria-describedby="user order table"
                style={{ display:'flex',alignItems:'center',justifyContent:'center'}}

            >
                {body}
            </Modal>
        </div>
    );

};

const DishDescription = ({ dishes, dish, index, handleRemove }) => {

    const filteredDish = dishes.find(d => d.id === dish.id);

    const { price, name, categories } = filteredDish;

    const categoriesIds =  categories.map(c => c.id) || [];
    const categoriesUser = categories.filter(({ id }) => categoriesIds.includes(id)) || [];

    const allProductsDish = categories.flatMap(category => category.products) || [];

    const productsUserIds = categoriesIds.flatMap((id => {
        return dish[`category-${id}`]
    }));

    const productsUser = allProductsDish.filter(({ id }) => productsUserIds.includes(id)) || [];

    const descriptionProducts = productsUser.map(p => p.name).join(',') || '';

    return (
        <>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardMedia
                        component="img"
                        alt="Card image cap"
                        height="140"
                        image={`/storage/${filteredDish.image}`}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <h5 className="card-title">
                            <b>{name}</b>
                        </h5>
                        <h5 className="card-title">
                            <b>{`$${price}`}</b>
                        </h5>
                        <p className="card-text">
                            {descriptionProducts}
                        </p>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={() => {handleRemove(index)}}
                            variant="contained"
                            color="secondary"
                            startIcon={<RemoveShoppingCart/>}
                        >
                            Quitar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    modalScroll:{
        position:'absolute',
        top:'10%',
        left:'10%',
        overflow:'scroll',
        height:'100%',
        display:'block'
    },
    avatar: {
        backgroundColor: theme.palette.primary,
    },
}));


export default ModalUserOrder;
