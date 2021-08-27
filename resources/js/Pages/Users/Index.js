import React, {useEffect, useState} from "react";
import { Inertia } from '@inertiajs/inertia'
import Title from "../../components/Title";
import {makeStyles} from "@material-ui/core/styles";
import Dashboard from "../../components/admin/Dashboard";
import {InertiaLink} from "@inertiajs/inertia-react";
import Pagination from "../../components/Pagination";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Input,
    InputAdornment,
    TextField,
    Typography
} from "@material-ui/core";
import {Search} from "@material-ui/icons";


const preventDefault = (e) => {
    e.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    margin: {
        margin: theme.spacing(1),
    },
}));



const Users = (props) => {

    const { users } = props;
    const title = 'Usuarios'
    const classes = useStyles();

    console.log(props);

    const [filter, setFilter] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.visit('/users', {
            method: 'get',
            data: {
                search: e.target.value,
            },
        })
    };

    const cardsUsers = (
        <>
            <div className='row mb-2'>
                <div className='col'>
                    <Title>{title}</Title>
                </div>
                <div className='col text-right'>
                    <a href="/users/create" className="btn btn-primary mr-5">Crear Usuario</a>
                    <TextField
                        onChange={handleSearch}
                        className={classes.margin}
                        id="search"
                        label="Búsqueda"
                        type='search'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </div>
            <Grid container spacing={1}>
                {users.data.length > 0 && users.data.map((user) => (
                    <Grid key={user.id} item xs={4} sm={6}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" component="h6">
                                    Teléfono: {user.phone}
                                </Typography>
                                <Typography variant="body2" component="h6">
                                    Email: {user.email}
                                </Typography>
                                <Typography variant="body2" component="h6">
                                    Rol: {user.roles.length > 0 ? user.roles[0].name : `Sin rol asignado`}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <div className='col text-right'>
                                    <a href={`/users/${user.id}/edit`} className="btn btn-primary">Editar</a>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Pagination links={users.links}/>
                </Grid>
            </Grid>

        </>
    );

    return (
        <Dashboard
            tableInformation={cardsUsers}
        />
    );
};

export default Users;
