import React from "react";
import Title from "../../components/Title";
import Dashboard from "../../components/admin/Dashboard";
import Pagination from "../../components/Pagination";
import { Inertia } from "@inertiajs/inertia";
import {Col, Container, Dropdown, Row, Table} from "react-bootstrap";


const Categories = (props) => {

    const { categories, restaurant, successMessage } = props;
    const title = 'Categorias'

    const noEmpty = categories.data.length > 0;

    const deleteCategory = (event, categoryId) => {
        event.preventDefault();
        if (confirm('Are you sure you want to delete this category?')) {
            Inertia.delete(`/restaurants/${restaurant.id}/categories/${categoryId}/delete`)
                .then(() => {

                })
        }
    }

    const cardsCategories = (
        <>
            <div className='row mb-2'>
                <div className='col'>
                    <Title>{title}</Title>
                </div>
                <div className='col text-right'>
                    <a href={`/restaurants/${restaurant.id}/categories/create`} className="btn btn-primary mr-5">Crear Categoría</a>
                </div>
            </div>
            <Container fluid>
                <Row>
                    {noEmpty &&
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Detalles</th>
                        </tr>
                        </thead>
                        <tbody>
                        {noEmpty && categories.data.map(category => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td className='text-center'>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="success" id="actions-restaurant"
                                        >
                                            Acciones
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                href={`/restaurants/${restaurant.id}/categories/${category.id}/edit`}
                                            >
                                                Editar
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
                        <Pagination links={categories.links}/>
                    </Col>
                </Row>
            </Container>

        </>
    );

    return (
        <Dashboard
            tableInformation={cardsCategories}
        />
    );
};

export default Categories;
