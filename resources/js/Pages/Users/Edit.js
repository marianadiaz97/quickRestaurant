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

const UsersEdit = (props) => {

    const { user, roles, restaurants, errors } = props;

    const title = `Usuario: ${user.name}`;

    const userRoleId = user.roles.length > 0 ? user.roles[0].id : '';
    const userRestaurants = user.restaurants.map(r => r.id);

    const userRestaurantsFilter = restaurants.filter(({value}) => userRestaurants.includes(value));
    const userRestaurantsIds = userRestaurantsFilter.map(r => r.value);

    const [values, setValues] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        role_id: userRoleId,
        restaurants_id : userRestaurantsIds
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

    const handleRoleId = (e) => {
        const key = e.label;
        setValues(values => ({
            ...values,
            role_id: key,
        }))
    };

    const handleRestaurants = (e) => {
        const keys = e.map(r => r.value);
        setValues(values => ({
            ...values,
            restaurants_id: keys,
        }))
    };

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        Inertia.patch(`/users/${user.id}`, {
            first_name: values.first_name,
            last_name: values.last_name,
            name: `${values.first_name} ${values.last_name}`,
            phone: values.phone,
            email: values.email,
            role_id: values.role_id,
            restaurants_id: values.restaurants_id,
        }).then(() => {
            setLoading(false);
        })
    };

    const tableUsers = (
        <>
            <Title>{title}</Title>
            <CssBaseline />
            <Grid container spacing={2} id='aca'>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!errors.first_name}
                        helperText={errors.first_name ?? false}
                        id="first_name"
                        label="Nombres"
                        defaultValue={user.first_name}
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="Nombres"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!errors.last_name}
                        helperText={errors.last_name ?? false}
                        id="last_name"
                        label="Apellidos"
                        defaultValue={user.last_name}
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="Apellidos"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select
                        id="restaurants_id"
                        onChange={handleRestaurants}
                        options={restaurants}
                        placeholder="Restaurantes"
                        defaultValue={userRestaurantsFilter}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isMulti
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select
                        className='mt-6'
                        id="role_id"
                        onChange={handleRoleId}
                        options={roles}
                        placeholder="Rol"
                        defaultValue={roles.filter(r => r.value === userRoleId)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!errors.email}
                        helperText={errors.email ?? false}
                        id="email"
                        label="Correo electronico"
                        defaultValue={user.email}
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="Email"
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
                        defaultValue={user.phone}
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
                        Guardar Usuario
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {errors.restaurants_id &&
                    <Alert
                        severity="info">
                        {errors.restaurants_id}
                    </Alert>}

                </Grid>

            </Grid>
        </>
    );

    return (
        <Dashboard
            tableInformation={tableUsers}
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

export default UsersEdit;
