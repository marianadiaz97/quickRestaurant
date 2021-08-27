import React from "react";
import Title from "../../components/Title";
import Dashboard from "../../components/admin/Dashboard";
import Pagination from "../../components/Pagination";
import {Badge, Col, Container, Dropdown, Image, Row, Table} from "react-bootstrap";
import {Switch} from "@material-ui/core";
import {Inertia} from "@inertiajs/inertia";

const Dishes = (props) => {

    const { dishes, restaurant } = props;
    const title = 'Platos'

    const noEmpty = dishes.data.length > 0;

    const handleChangeState = (e, id, state) => {
        e.preventDefault();
        console.log(id, state);
        Inertia.post(`/dishes/${id}/status`, {
            status: state
        });
    };

    const listDishes = (
        <>
            <div className='row mb-2'>
                <div className='col'>
                    <Title>{title}</Title>
                </div>
                <div className='col text-right'>
                    <a
                        href={`/restaurants/${restaurant.id}/dishes/create`}
                        className="btn btn-primary mr-5">
                        Crear Nuevo Plato
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
                        {noEmpty && dishes.data.map(dish => (
                            <tr key={dish.id}>
                                <td className='text-center'>{!dish.disabled?
                                    <Badge pill variant="success">
                                            Habilitado
                                        </Badge>
                                    :
                                    <Badge pill variant="warning">
                                        Deshabilitado
                                    </Badge>}
                                    <br/>
                                    <Switch
                                        checked={!dish.disabled}
                                        onChange={(e) => handleChangeState(e, dish.id, !dish.disabled)}
                                        color="primary"
                                        name="disabled"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                    <br/>
                                    {dish.image !== null?
                                        <Image responsive='sm' width={100} src={`/storage/${dish.image}`}/>
                                        :
                                        <b>Sin imagen disponible</b>}
                                </td>
                                <td>{dish.name}</td>
                                <td><b>${dish.price}</b></td>
                                <td className='text-center'>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="primary" id="actions-restaurant"
                                        >
                                            Acciones
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                href={`/restaurants/${restaurant.id}/dishes/${dish.id}/edit`}
                                            >
                                                Editar
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() =>{
                                                    swal({
                                                        title: "Borrar este plato?",
                                                        text: `Estas a punto de borrar el plato ${dish.name}!`,
                                                        icon: "warning",
                                                        buttons: true,
                                                        dangerMode: true,
                                                    })
                                                        .then((willDelete) => {
                                                            if (willDelete) {
                                                                Inertia.delete(`/dishes/${dish.id}`)
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
                        <Pagination links={dishes.links}/>
                    </Col>
                </Row>
            </Container>
        </>
    );

    return (
        <Dashboard
            tableInformation={listDishes}
        />
    );
}
export default Dishes;
