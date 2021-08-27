import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {PhonelinkRing} from "@material-ui/icons";
import {Alert} from "@material-ui/lab";

const Register = (props) => {

    const {errors, errorMessage, successMessage} = props;
    const classes = useStyles();

    const [values, setValues] = useState({
        code: "",
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
        Inertia.post('/register/verify', values);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PhonelinkRing />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Quick Restaurant
                </Typography>
                <h5>
                    Verificación de usuario
                </h5>
                {successMessage &&
                <Alert severity="success">
                    {successMessage}
                </Alert>}
                {errorMessage &&
                <Alert severity="error">
                    {errorMessage}
                </Alert>}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={!!errors.code}
                                helperText={errors.code ?? false}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="code"
                                label="Codigo"
                                name="last_name"
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
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
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

export default Register;
