import React, {useState} from "react";
import Title from "../../components/Title";
import {makeStyles} from "@material-ui/core/styles";
import Dashboard from "../../components/admin/Dashboard";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import { HalfCircleSpinner } from 'react-epic-spinners';
import { Inertia } from "@inertiajs/inertia";
import Select from "react-select";
import {useForm} from "@inertiajs/inertia-react";
import {Button, Col, Container, Row} from "react-bootstrap";

const DishesCreate = (props) => {

    const { errors, restaurant, categories } = props;
    const title = `Crear Nuevo Plato`;

    const { data, setData, processing } = useForm({
        name: '',
        price: '',
        category_id: '',
    });

    const handleSubmit = event => {
        event.preventDefault();
        Inertia.post(`/restaurants/${restaurant.id}/dishes/create`, {
            name: data.name,
            price: data.price,
            category_id : data.category_id
        });
    }

    const createDishes = (
        <>
            <Title>{title}</Title>
            <CssBaseline />
            <Container fluid>
                <Row>
                    <pre>{JSON.stringify(data, null,2)}</pre>
                </Row>
                <Row>
                    <Col xs={6}>
                        <TextField
                            error={!!errors.name}
                            helperText={errors.name ?? false}
                            id="name"
                            label="Nombre"
                            onChange={e => setData(e.target.id, e.target.value)}
                            style={{ margin: 8 }}
                            placeholder="Nombre"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Col>
                    <Col xs={6}>
                        <TextField
                            error={!!errors.price}
                            helperText={errors.price ?? false}
                            id='price'
                            label='Precio'
                            onChange={e => setData(e.target.id, e.target.value)}
                            style={{ margin: 8 }}
                            placeholder='Precio'
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label><b>Categoría del plato</b></label>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            id='category_id'
                            onChange={e => setData('category_id', e.value)}
                            options={categories}
                            placeholder="Categoría del plato"
                            defaultValue={categories[0]}
                        />
                        {errors.category_id !== null &&
                        <p style={{fontSize: '0.75 rem'}} className='text-danger'>{errors.category_id}</p>}
                    </Col>
                </Row>
                <Row className='mt-1'>
                    <Col>
                        <Button
                            onClick={handleSubmit}
                            disabled={processing}
                            variant="primary"
                            size="lg"
                            block
                        >
                            {processing &&
                            <HalfCircleSpinner
                                size={20}
                                color={'#fff'}
                                className="mr-2"
                            />}
                            <SaveIcon/>
                            Guardar plato
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );

    return (
        <Dashboard
            tableInformation={createDishes}
        />
    );
};
export default DishesCreate;
