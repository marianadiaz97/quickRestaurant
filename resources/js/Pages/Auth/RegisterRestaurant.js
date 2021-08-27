import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {HalfCircleSpinner} from "react-epic-spinners";
import {InputAdornment} from "@material-ui/core";

const RegisterRestaurant = (props) => {

    const {errors, restaurant_id} = props;
    const classes = useStyles();

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
    })

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        Inertia.post(`/register/${restaurant_id}`, values);
    }

    const handleOnBlur = async (e, phone) => {
        if (phone.length < 10) return;

        const url = `http://quick-restaurant.test/users/dni`;
        const payload = {
            phone: phone,
        };
        const withCredentials = true;

        let response;
        try {
            response = await axios.post(url, payload, { withCredentials });
        } catch (err) {
            console.warn('Error al verificar si había un usuario antiguo');
            return;
        }
        console.log('response ... ',response)
        const userFind = response.data?.data?.user;
        if (!userFind) {
            console.warn('No se encontró la información del usuario antíguo en data.user');
            return;
        }

        swal({
            title: "Se encontro un usuario con el telefono!",
            text: userFind.phone,
            icon: "success",
            button: "Listo brevee gonorrea!",
        });

        console.log(userFind)
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h2" variant="h5">
                    Quick Restaurant
                </Typography>
                <Typography component="h1" variant="h5">
                   Registra tus datos.
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={!!errors.phone}
                                helperText={errors.phone ?? false}
                                //onChange={handleChange}
                                onBlur={e => {handleOnBlur(e, e.target.value)}}
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Teléfono Móvil"
                                name="phone"
                                autoComplete="phone"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+57</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={!!errors.first_name}
                                helperText={errors.first_name ?? false}
                                onChange={handleChange}
                                name="first_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="first_name"
                                label="Nombres"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={!!errors.last_name}
                                helperText={errors.last_name ?? false}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="last_name"
                                label="Apellidos"
                                name="last_name"
                                autoComplete="last_name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!!errors.email}
                                helperText={errors.email ?? false}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Correo electrónico"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label='Acepto el tratamiento de datos para futuras promociones'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {loading &&
                        <HalfCircleSpinner
                            size={20}
                            color={'#fff'}
                            className="mr-2"
                        />}
                        Continuar
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                ¿Ya tienes cuenta? Accede aquí!
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Quick Restaurant
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    errorField: {
        marginTop: theme.spacing(2),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default RegisterRestaurant;
