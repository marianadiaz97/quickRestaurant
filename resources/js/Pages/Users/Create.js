import React from "react";
import Title from "../../components/Title";
import Dashboard from "../../components/admin/Dashboard";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import {useForm} from "@inertiajs/inertia-react";
import ButtonSubmit from "../../components/ButtonSubmit";

const UsersCreate = (props) => {

    const title = `Crear Usuario`;
    const { restaurants, roles } = props;

    const { data, setData, post, processing, errors, submit } = useForm({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        role_id: 0,
        restaurants_id : []
    })

    const handleChange = (e) => {
        setData(e.target.id, e.target.value)
    };

    const handleRoleId = (e) => {
        setData('role_id', e.label)
    };

    const handleRestaurants = (e) => {
        const keys = e.map(r => r.value);
        setData('restaurants_id', keys)
    };

    const handleSubmit = event => {
        event.preventDefault();
        post(`/users`,
            {
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                email: data.email,
                role_id: data.role_id,
                restaurants_id: data.restaurants_id
            });
    }

    const tableRestaurants = (
        <>
            <Title>{title}</Title>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <pre>{JSON.stringify(data, null, 2)}</pre>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!errors.first_name}
                        helperText={errors.first_name ?? false}
                        id="first_name"
                        label="Nombres"
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder="Nombres"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!errors.last_name}
                        helperText={errors.last_name ?? false}
                        id='last_name'
                        label='Apellidos'
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder='Apellidos'
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select
                        id='restaurants_id'
                        onChange={handleRestaurants}
                        options={restaurants}
                        placeholder="Restaurantes"
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
                        defaultValue={roles.filter(r => r.label === 'client')}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!errors.email}
                        helperText={errors.email ?? false}
                        id='email'
                        label='Email'
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder='Correo electrónico'
                        fullWidth
                        margin="normal"
                        InputLabelProps={{shrink: true,}}
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!errors.phone}
                        helperText={errors.phone ?? false}
                        id='phone'
                        label='Teléfono'
                        onChange={handleChange}
                        style={{ margin: 8 }}
                        placeholder='Teléfono'
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ButtonSubmit
                        processing={processing}
                        buttonText={'Crear usuario'}
                    />
                </Grid>
                <Grid item xs={12}>
                    {errors.role_id &&
                    <Alert severity="info">{errors.role_id}</Alert>}
                    {errors.restaurants_id &&
                    <Alert severity="info">{errors.restaurants_id}</Alert>}
                </Grid>
            </Grid>
            </form>
        </>
    );

    return (
        <Dashboard
            tableInformation={tableRestaurants}
        />
    );
}

export default UsersCreate;
