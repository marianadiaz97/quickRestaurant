import React, {useState} from "react";
import Title from "../../components/Title";
import {makeStyles} from "@material-ui/core/styles";
import Dashboard from "../../components/admin/Dashboard";
import {Button, Card, CardActions, CardContent, Collapse, Grid, IconButton, Typography} from "@material-ui/core";
import Pagination from "../../components/Pagination";
import { Inertia } from "@inertiajs/inertia";
import {Alert, AlertTitle} from "@material-ui/lab";
import {RefreshButton} from "./Checkout";
import {ExpandMore, NotInterested, Restaurant, ThumbUp} from "@material-ui/icons";
import clsx from 'clsx';
import {usePage} from "@inertiajs/inertia-react";

const Orders = (props) => {

    const { orders } = props;
    const { has_permission, authUser, errorMessage} = usePage().props;
    const title = 'Mis Ordenes'
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const OrderCards = (
        <>
            <div className='row mb-2'>
                <div className='col'>
                    <Title>{title}</Title>
                </div>
            </div>
            <Grid container spacing={1}>
                {orders.data.length > 0 ? orders.data.map(order => (
                        <Grid key={order.id} item xs={4} sm={6}>
                            <Card>
                                <CardContent>
                                    <h5>
                                        <b>Orden: </b>{order.id.slice(-4)}
                                    </h5>
                                    <h6>
                                        <b>Estado: </b>
                                        {order.status === 'cooking' &&
                                        <span className="badge bg-warning text-dark">COCINANDO</span>}
                                        {order.status === 'pending' &&
                                        <span className="badge bg-warning text-dark">PENDIENTE</span>}
                                        {order.status === 'cash' &&
                                        <span className="badge bg-warning text-dark">PENDIENTE DE PAGO EN CAJA</span>}
                                        {order.status === 'paid' &&
                                        <span className="badge bg-primary">PAGADO</span>}
                                        {order.status === 'finished' &&
                                        <span className="badge bg-success">COMPLETADO</span>}
                                        {order.status === 'canceled_by_restaurant' &&
                                        <span className="badge bg-danger">CANCELADO POR RESTAURANTE</span>}
                                    </h6>
                                    <h6>
                                        <b>Precio:</b> {order.total} COP
                                    </h6>
                                    <h6>
                                        <b>Tipo de pago: </b>
                                        {order.payment_method === 'cash' &&
                                        <span className="badge bg-info text-dark">EFECTIVO</span>}
                                        {order.payment_method === 'online' &&
                                        <span className="badge bg-info text-dark">ONLINE</span>}
                                    </h6>
                                    <h6>
                                        <b>Usuario: </b> {authUser.name}
                                    </h6>
                                </CardContent>
                                <CardActions>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show details"
                                    >
                                        <ExpandMore/>
                                    </IconButton>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        {order.details.length > 0 && order.details.map((detail, index) => (
                                            <React.Fragment key={index}>
                                                <Typography paragraph><b>{detail.name}</b>:</Typography>
                                                <Typography paragraph>{detail.products}</Typography>
                                            </React.Fragment>
                                        ))}
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    )) :
                    <Grid  item xs={6} sm={12}>
                        <Alert severity="info">
                            <AlertTitle>Aun no hay ordenes solicitadas</AlertTitle>
                        </Alert>
                    </Grid>}
                {errorMessage && <Grid  item xs={6} sm={12}>
                    <Alert severity="error">
                        <AlertTitle>{errorMessage}</AlertTitle>
                    </Alert>
                </Grid> }
                <Grid item xs={12}>
                    <Pagination links={orders.links}/>
                </Grid>
            </Grid>

        </>
    );

    return (
        <Dashboard
            tableInformation={OrderCards}
        />
    );
};

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default Orders;
