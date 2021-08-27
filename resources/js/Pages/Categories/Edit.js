import React, {useState} from "react";
import Title from "../../components/Title";
import {makeStyles} from "@material-ui/core/styles";
import Dashboard from "../../components/admin/Dashboard";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Select from 'react-select'
import SaveIcon from '@material-ui/icons/Save';
import { HalfCircleSpinner } from 'react-epic-spinners';
import {Inertia} from "@inertiajs/inertia";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useForm} from "@inertiajs/inertia-react";

const CategoryEdit = (props) => {

    const { category } = props;
    const title = `Categoría: ${category.name}`;

    const { data, setData, processing, errors } = useForm({
        name: category.name,
    })

    const handleSubmit = event => {
        event.preventDefault();
        Inertia.patch(`/restaurants/${category.restaurant_id}/categories/${category.id}`, {
            name: data.name,
        });
    }

    const tableRestaurants = (
        <>
            <Title>{title}</Title>
            <CssBaseline />
            <Container fluid>
                <Row>
                <Col>
                    <TextField
                        id="name"
                        label="Nombre"
                        defaultValue={category.name}
                        onChange={e => setData('name', e.target.value)}
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
                <Grid item xs={12}>
                    {errors.name &&
                    <Alert
                        className={classes.errorField}
                        severity="info">
                        {errors.name}
                    </Alert>}
                </Grid>
            </Container>
        </>
    );

    return (
        <Dashboard
            tableInformation={tableRestaurants}
        />
    );
}

export default CategoryEdit;
