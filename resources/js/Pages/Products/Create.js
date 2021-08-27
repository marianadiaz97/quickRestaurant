import React, {useState} from "react";
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
import {Inertia} from "@inertiajs/inertia";
import {FormControlLabel, Switch} from "@material-ui/core";

const Restaurants = (props) => {

    const { restaurant, errors } = props;
    console.log(restaurant);

    const title = `Crear Producto`;

    const [values, setValues] = useState({
        name: '',
        price: '',
        has_additional_price: false,
    });

    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    };

    const handleChangeSwitch = (event) => {
        console.log(event.target.checked);
        setValues(values => ({...values, [event.target.name]: event.target.checked,}))
    };

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        Inertia.post(`/restaurants/${restaurant.id}/products/create`, {
            name: values.name,
            price: values.price,
            has_additional_price: values.has_additional_price,
        }).then(() => {
            setLoading(false);
        })
    }

    const createProduct = (
        <>
            <Title>{title}</Title>
            <CssBaseline />
            <Grid container spacing={2} id='aca'>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="name"
                        label="Nombre"
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="Nombre del producto"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="price"
                        label="Precio"
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="Precio del producto"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={values.has_additional_price}
                                onChange={handleChangeSwitch}
                                name="has_additional_price"
                                id='has_additional_price'
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                color='primary'
                            />
                        }
                        label="¿Precio adicional?"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        { loading && <HalfCircleSpinner
                            size={20}
                            color={'#fff'}
                            className="mr-2"
                        />
                        }
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {errors.name &&
                    <Alert
                        className={classes.errorField}
                        severity="info">
                        {errors.name}
                    </Alert>}
                    {errors.address &&
                    <Alert
                        className={classes.errorField}
                        severity="info">
                        {errors.address}
                    </Alert>}
                    {errors.phone &&
                    <Alert
                        className={classes.errorField}
                        severity="info">
                        {errors.phone}
                    </Alert>}
                    {errors.user_id &&
                    <Alert
                        className={classes.errorField}
                        severity="info">
                        {errors.user_id}
                    </Alert>}
                </Grid>
            </Grid>
        </>
    );

    return (
        <Dashboard
            tableInformation={createProduct}
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

export default Restaurants;
