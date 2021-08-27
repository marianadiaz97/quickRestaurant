import React, {useState, useRef} from "react";
import Title from "../../components/Title";
import {makeStyles} from "@material-ui/core/styles";
import Dashboard from "../../components/admin/Dashboard";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from 'react-select'
import SaveIcon from '@material-ui/icons/Save';
import { HalfCircleSpinner } from 'react-epic-spinners';
import {Inertia } from "@inertiajs/inertia";
import {useForm} from "@inertiajs/inertia-react";
import {Col, Container, Image, Row} from "react-bootstrap";

const CategoryEdit = (props) => {

    const { dish, categories } = props;

    const title = `Plato: ${dish.name}`;

    const categoriesFilter = categories.filter(({value}) => value === dish.category_id);

    const imageRef = useRef(null);

    const { data, setData, processing, errors } = useForm({
        name: dish.name,
        price: dish.price,
        category_id: dish.category_id,
        avatar: '',
    });

    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('category_id', data.category_id);
        formData.append('image', imageRef.current.files[0]);
        Inertia.post(`/restaurants/${dish.restaurant_id}/dishes/${dish.id}/edit`, formData);
    };


    const tableRestaurants = (
        <>
            <Title>{title}</Title>
            <CssBaseline />
            <Container fluid>
                <Row>
                    <Col xs={6}>
                        <TextField
                            error={!!errors.name}
                            helperText={errors.name ?? false}
                            id="name"
                            label="Nombre"
                            defaultValue={dish.name}
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
                            id="price"
                            label="Precio"
                            defaultValue={dish.price}
                            onChange={e => setData(e.target.id, e.target.value)}
                            style={{ margin: 8 }}
                            placeholder="Precio"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            id='category_id'
                            onChange={e => setData('category_id', e.value)}
                            defaultValue={categoriesFilter}
                            options={categories}
                            placeholder="Categoría asociada"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} >
                        <label>Imagen del plato</label>
                        <input
                            className='form-control'
                            id='image'
                            ref={imageRef}
                            type="file"
                        />
                    </Col>
                </Row>
                <Row className='text-center mt-2'>
                    <Col >
                        <Image responsive='sm' width={200} src={`/storage/${dish.image}`}/>
                    </Col>
                </Row>
                <Row className='text-center'>
                    <Col>
                        <Button
                            onClick={handleSubmit}
                            disabled={processing}
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            { processing && <HalfCircleSpinner
                                size={20}
                                color={'#fff'}
                                className="mr-2"
                            />}
                            Guardar Plato
                        </Button>
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
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default CategoryEdit;
