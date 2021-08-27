import React from "react";
import Title from "../../components/Title";
import {makeStyles} from "@material-ui/core/styles";
import Dashboard from "../../components/admin/Dashboard";
import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import Pagination from "../../components/Pagination";
import {Alert, AlertTitle} from "@material-ui/lab";

const Restaurants = (props) => {

    const { products, restaurant } = props;
    const title = 'Productos'
    const classes = useStyles();

    const cardsProducts = (
        <>
            <div className='row mb-2'>
                <div className='col'>
                    <Title>{title}</Title>
                </div>
                <div className='col text-right'>
                    <a href={`/restaurants/${restaurant.id}/products/create`} className="btn btn-primary mr-5">Crear producto</a>
                </div>
            </div>
            <Grid container spacing={1}>
                {products.data.length > 0 ? products.data.map(product => (
                    <Grid key={product.id} item xs={4} sm={6}>
                        <Card className={classes.root}>
                            <CardContent>
                                {Boolean(product.has_additional_price) &&
                                <div className='col text-right'>
                                    <span className="badge rounded-pill bg-warning text-dark">Adicional</span>
                                </div>}
                                <Typography variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                {Boolean(product.has_additional_price) &&
                                <Typography variant="body2" component="h5">
                                    Precio: <span className="badge rounded-pill bg-success">${product.price}</span>
                                </Typography>
                                }
                            </CardContent>
                            <CardActions>
                                <div className='col text-right'>
                                    <a href={`/restaurants/${product.id}/edit`} className="btn btn-primary mr-2">Editar</a>
                                    <a href={`/restaurants/${product.id}/products`} className="btn btn-primary">Productos</a>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                )) :
                    <Grid  item xs={6} sm={12}>
                        <Alert severity="info">
                            <AlertTitle>Aun no hay productos creados</AlertTitle>
                            <strong>Crea uno!</strong>
                        </Alert>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Pagination links={products.links}/>
                </Grid>
            </Grid>

        </>
    );

    return (
        <Dashboard
            tableInformation={cardsProducts}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
}));
export default Restaurants;
