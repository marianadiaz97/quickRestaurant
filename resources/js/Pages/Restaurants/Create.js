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

const Restaurants = (props) => {

    const { users, errors } = props;

    const title = `Crear Restaurante`;

    const [values, setValues] = useState({
        name: '',
        address: '',
        phone: '',
        user_id: '',
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

    const handleUserId = (e) => {
        const key = e.value;
        setValues(values => ({
            ...values,
            user_id: key,
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        Inertia.post(`/restaurants`, {
            name: values.name,
            address: values.address,
            phone: values.phone,
            user_id: values.user_id,
        }).then(() => {
            setLoading(false);
        })
    }

    const tableRestaurants = (
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
                        placeholder="Nombre del restaurante"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select
                        className='mt-6'
                        id="user_id"
                        onChange={handleUserId}
                        options={users}
                        placeholder="Propietario"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="address"
                        label="Dirección"
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="Dirección del restaurante"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="phone"
                        label="Teléfono"
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="Teléfono del restaurante"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
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

export default Restaurants;
