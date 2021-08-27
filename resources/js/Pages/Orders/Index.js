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
import {Col, Container, Row} from "react-bootstrap";

const Orders = (props) => {

    const { orders, restaurant } = props;
    const { has_permission } = usePage().props;
    const title = 'Ordenes'
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChangeState = (e, id, state) => {
        e.preventDefault();
        Inertia.post(`/orders/${id}/status/admin`, {
            status: state
        })
    };

    const OrderCards = (
        <>
            <div className='row mb-2'>
                <div className='col'>
                    <Title>{title}</Title>
                </div>
                <div className='col text-right'>
                    <RefreshButton title='Ordenes'/>
                </div>
            </div>
            <Container>
                <Row >
                {orders.data.length > 0 ? orders.data.map(order => (
                    <Col key={order.id} md={6} sm={12}>
                            <Card className='mt-2'>
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
                                        <b>Usuario: </b> {order.user.name}
                                    </h6>
                                </CardContent>
                                <CardActions>
                                    {order.status === 'cash' || order.status === 'pending' || order.status === 'paid' &&
                                    <Button
                                        onClick={(e) => handleChangeState(e,order.id, 'cooking')}
                                        size='small'
                                        color="primary"
                                        startIcon={<Restaurant/>}
                                    >
                                        Preparar
                                    </Button>}
                                    {order.status === 'cash' || order.status === 'pending' && has_permission && <Button
                                            onClick={(e) => handleChangeState(e,order.id, 'canceled_by_restaurant')}
                                            size='small'
                                            color="secondary"
                                            startIcon={<NotInterested/>}
                                        >
                                            Cancelar
                                        </Button>}
                                    {order.status === 'cooking' &&
                                    <Button
                                        onClick={(e) => handleChangeState(e,order.id, 'finished')}
                                        size='small'
                                        color="primary"
                                        startIcon={<ThumbUp/>}
                                    >
                                        Entregado
                                    </Button>}
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
                        </Col>

                    )) :
                    <Col  item xs={6} sm={12}>
                        <Alert severity="info">
                            <AlertTitle>Aun no hay ordenes creadas</AlertTitle>
                        </Alert>
                    </Col>}
                </Row>
                <Row className='mt-2'>
                    <Col xs={12}>
                        <Pagination links={orders.links}/>
                    </Col>
                </Row>
            </Container>

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
