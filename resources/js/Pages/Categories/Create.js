import React from "react";
import Title from "../../components/Title";
import Dashboard from "../../components/admin/Dashboard";
import CssBaseline from "@material-ui/core/CssBaseline";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import { HalfCircleSpinner } from 'react-epic-spinners';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useForm} from "@inertiajs/inertia-react";

const CategoriesCreate = (props) => {

    const { restaurant } = props;
    const title = `Crear Categoria`;

    const { data, setData, processing, post, errors } = useForm({
        name: '',
    })

    const handleSubmit = event => {
        event.preventDefault();
        post(`/restaurants/${restaurant.id}/categories/create`,
            {
                name: data.name,
            });
    }

    const createCategories = (
        <>
            <Title>{title}</Title>
            <CssBaseline />
            <Container fluid>
                <Row>
                <Col>
                    <TextField
                        id="name"
                        label="Nombre"
                        onChange={e => setData('name',e.target.value)}
                        style={{ margin: 8 }}
                        placeholder="Nombre"
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
                    <Button
                        block
                        onClick={handleSubmit}
                        disabled={processing}
                        size='lg'
                        variant="primary"
                    >
                        {processing &&
                        <HalfCircleSpinner
                            size={20}
                            color={'#fff'}
                            className="mr-2"
                        />}
                        Guardar Información
                    </Button>
                </Col>
                </Row>
                <Row>
                <Col>
                    {errors.name &&
                    <Alert
                        severity="info">
                        {errors.name}
                    </Alert>}
                </Col>
                </Row>
            </Container>
        </>
    );

    return (
        <Dashboard
            tableInformation={createCategories}
        />
    );
}

export default CategoriesCreate;
