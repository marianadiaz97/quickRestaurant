import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from "../components/admin/Dashboard";
import {Grid, Paper} from "@material-ui/core";

const HomePage = () => {

    const classes = useStyles();

    const tableInformation = (
        <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <button type="button" className="btn btn-success">
                                Ordenes Aceptadas: <span className="badge bg-secondary">4</span>
                            </button>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <button type="button" className="btn btn-info">
                                Usuarios Activos: <span className="badge bg-light">4</span>
                            </button>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <button type="button" className="btn btn-success">
                                Ventas Online: <span className="badge bg-secondary">4</span>
                            </button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>);

    return (
        <Dashboard
            tableInformation={tableInformation}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default HomePage;
