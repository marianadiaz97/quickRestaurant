import React from "react";
import Title from "../../components/Title";
import Dashboard from "../../components/admin/Dashboard";
import Pagination from "../../components/Pagination";
import {Badge, Col, Container, Dropdown, Image, Row, Table} from "react-bootstrap";
import {Switch} from "@material-ui/core";
import {Inertia} from "@inertiajs/inertia";

const Drinks = (props) => {

    const { drinks, restaurant } = props;
    const title = 'Bebidas'

    const noEmpty = drinks.data.length > 0;

    const listDrinks = (
        <>
            <div className='row mb-2'>
                <div className='col'>
                    <Title>{title}</Title>
                </div>
                <div className='col text-right'>
                    <a
                        href={`/restaurants/${restaurant.id}/drinks/create`}
                        className="btn btn-primary mr-5">
                        Crear Nueva Bebida
                    </a>
                </div>
            </div>
            <Container fluid>
                <Row>
                    {noEmpty &&
                    <Table striped bordered hover size="sm" responsive>
                        <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Detalles</th>
                        </tr>
                        </thead>
                        <tbody>
                        {noEmpty && drinks.data.map(drink => (
                            <tr key={drink.id}>
                                <td className='text-center'>{!drink.disabled?
                                    <Badge pill variant="success">
                                        Habilitado
                                    </Badge>
                                    :
                                    <Badge pill variant="warning">
                                        Deshabilitado
                                    </Badge>}
                                    <br/>
                                    <Switch
                                        checked={!drink.disabled}
                                        onChange={(e) => handleChangeState(e, drink.id, !drink.disabled)}
                                        color="primary"
                                        name="disabled"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </td>
                                <td>{drink.name}</td>
                                <td><b>${drink.price}</b></td>
                                <td className='text-center'>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="primary" id="actions-restaurant"
                                        >
                                            Acciones
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                href={`/restaurants/${restaurant.id}/drinks/${drink.id}/edit`}
                                            >
                                                Editar
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() =>{
                                                    swal({
                                                        title: "Borrar esta bebida?",
                                                        text: `Estas a punto de borrar la bebida ${drink.name}!`,
                                                        icon: "warning",
                                                        buttons: true,
                                                        dangerMode: true,
                                                    })
                                                        .then((willDelete) => {
                                                            if (willDelete) {
                                                                Inertia.delete(`/drinks/${drink.id}`)
                                                                swal("Poof! Your imaginary file has been deleted!", {
                                                                    icon: "success",
                                                                });
                                                            }
                                                        });
                                                }}
                                                //href={`/restaurants/${restaurant.id}/dishes/${dish.id}/edit`}
                                            >
                                                Borrar
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>}
                </Row>
                <Row className='mt-3'>
                    <Col xs={12}>
                        <Pagination links={drinks.links}/>
                    </Col>
                </Row>
            </Container>
        </>
    );

    return (
        <Dashboard
            tableInformation={listDrinks}
        />
    );
}
export default Drinks;
