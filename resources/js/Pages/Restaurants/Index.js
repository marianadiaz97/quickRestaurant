import React from "react";
import Title from "../../components/Title";
import {makeStyles} from "@material-ui/core/styles";
import Dashboard from "../../components/admin/Dashboard";
import { usePage} from "@inertiajs/inertia-react";
import { CardActions, CardContent, Grid } from "@material-ui/core";
import Pagination from "../../components/Pagination";
import {Card, Col, Container, Dropdown, Navbar, Row, Table} from "react-bootstrap";

const Restaurants = (props) => {

    const { restaurants } = props;
    const { has_permission } = usePage().props;

    const title = 'Restaurantes'

    const tableRestaurants = (
        <>
        <Navbar>
            <Container fluid>
                <Navbar.Brand href="#">{title}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <a className='btn btn-primary' href='/restaurants/create'>Crear Restaurante</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <Container fluid>
                <Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Información</th>
                            <th>Propietario</th>
                            <th>Detalles</th>
                        </tr>
                        </thead>
                        <tbody>
                        {restaurants.data.length > 0 && restaurants.data.map(restaurant => (
                            <tr key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>
                                    Teléfono: <b>{restaurant.phone}</b>
                                    <br/>
                                    Dirección: <b>{restaurant.address}</b>
                                </td>
                                <td>{restaurant.user.name}</td>
                                <td className='text-center'>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="actions-restaurant">
                                            Acciones
                                        </Dropdown.Toggle>
                                        {has_permission &&
                                        <Dropdown.Menu>
                                            <Dropdown.Item href={`/restaurants/${restaurant.id}/edit`}>Editar</Dropdown.Item>
                                            <Dropdown.Item href={`/restaurants/${restaurant.id}/products`}>Productos</Dropdown.Item>
                                            <Dropdown.Item href={`/restaurants/${restaurant.id}/categories`}>Categorías</Dropdown.Item>
                                            <Dropdown.Item href={`/restaurants/${restaurant.id}/dishes`}>Platos</Dropdown.Item>
                                            <Dropdown.Item href={`/restaurants/${restaurant.id}/drinks`}>Bebidas</Dropdown.Item>
                                            <Dropdown.Item href={`/restaurants/${restaurant.id}/orders`}>Ordenes</Dropdown.Item>
                                        </Dropdown.Menu>}
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>
                <Row className='mt-3'>
                    <Col xs={12}>
                        <Pagination links={restaurants.links}/>
                    </Col>
                </Row>
            </Container>
        </>
    );

    return (
        <Dashboard
            tableInformation={tableRestaurants}
        />
    );
};
export default Restaurants;
