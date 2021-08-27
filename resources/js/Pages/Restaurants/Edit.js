import React, {useRef, useState} from "react";
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
import QRCode from 'qrcode.react';
import {usePage} from "@inertiajs/inertia-react";


const Restaurants = (props) => {

    const { restaurant, users, errors } = props;
    const { app_url } = usePage().props;

    const title = `Restaurante: ${restaurant.name}`;

    const imageRef = useRef(null);
    const [values, setValues] = useState({
        name: restaurant.name,
        address: restaurant.address,
        phone: restaurant.phone,
        user_id: restaurant.user_id,
        qr_code: restaurant.qr_code,
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

    const handleOwnerId = (e) => {
        const key = e.value;
        setValues(values => ({
            ...values,
            user_id: key,
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('name', values.name);
        formData.append('address', values.address);
        formData.append('phone', values.phone);
        formData.append('user_id', values.user_id);
        formData.append('image_url', imageRef.current.files[0]);
        Inertia.post(`/restaurants/${restaurant.id}`, formData);
    }

    const tableRestaurants = (
        <>
            <Title>{title}</Title>
            <CssBaseline />
            <Grid container spacing={2} id='aca'>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!errors.name}
                        helperText={errors.name ?? false}
                        id="name"
                        label="Nombre"
                        defaultValue={restaurant.name}
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
                    <label><b>Propietario</b></label>
                    <Select
                        className='mt-6'
                        id="user_id"
                        onChange={handleOwnerId}
                        options={users}
                        placeholder="Propietario"
                        defaultValue={users.filter(u => u.value === restaurant.user_id)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!errors.address}
                        helperText={errors.address ?? false}
                        id="address"
                        label="Dirección"
                        defaultValue={restaurant.address}
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
                        error={!!errors.phone}
                        helperText={errors.phone ?? false}
                        id="phone"
                        label="Teléfono"
                        defaultValue={restaurant.phone}
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
                    <TextField
                        error={!!errors.qr_code}
                        helperText={errors.qr_code ?? false}
                        id="qr_code"
                        label="Codigo QR:"
                        defaultValue={restaurant.qr_code}
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="QR del Restaurante"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} className='text-center'>
                    <QRCode
                        id="qrCodeEl"
                        size={150}
                        value={`${app_url}/restaurant/${values.qr_code}/menu`}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <input
                        id='image_url'
                        ref={imageRef}
                        type="file"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        { loading && <HalfCircleSpinner
                            size={20}
                            color={'#fff'}
                            className="mr-2"
                        />
                        }
                        Editar Restaurante
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {errors.user_id &&
                    <Alert
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
