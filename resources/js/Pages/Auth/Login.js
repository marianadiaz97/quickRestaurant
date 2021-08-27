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
import {VpnKey} from "@material-ui/icons";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const Login = (props) => {

    const {errors, errorMessage} = props;
    const classes = useStyles();

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
    })

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
        Inertia.post('/login', values);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKey />
                </Avatar>
                <Typography component="h2" variant="h5">
                    Quick Restaurant
                </Typography>
                <Typography component="h1" variant="h5">
                    Ingresa tus datos.
                </Typography>
                {errorMessage &&
                <Alert severity="error">
                    {errorMessage}
                </Alert>}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                            <TextField
                                error={!!errors.password}
                                helperText={errors.password ?? false}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Teléfono"
                                name="password"
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
                        Continuar
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/register" variant="body2">
                                ¿No tienes cuenta? Registrate aquí!
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

export default Login;
