import React, {useEffect} from 'react';
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
import {ChromeReaderMode, Restaurant} from "@material-ui/icons";
import {RefreshButton} from "./Checkout";
import {Inertia} from "@inertiajs/inertia";
import {HalfCircleSpinner} from "react-epic-spinners";
import useLocalStorage from "../../hooks/useLocalStorage";

const Confirm = (props) => {

    const {order, errors, epaycoResponse} = props;
    const [loading, setLoading] = useState(false);
    const [userOrder, setUserOrder] = useLocalStorage('userOrder', []);


    const classes = useStyles();

    const [payload, setPayload] = useState({
        x_transaction_date: epaycoResponse.x_transaction_date,
        x_response: epaycoResponse.x_response,
        x_id_invoice: epaycoResponse.x_id_invoice,
        x_response_reason_text: epaycoResponse.x_response_reason_text,
        x_transaction_id: epaycoResponse.x_transaction_id,
        x_bank_name: epaycoResponse.x_bank_name,
        x_approval_code: epaycoResponse.x_approval_code,
        x_amount: epaycoResponse.x_amount,
        x_currency_code: epaycoResponse.x_currency_code,
        x_cod_response: epaycoResponse.x_cod_response
    });

    const getQueryParam = param => {
        location.search.substr(1)
            .split('&')
            .some(function(item) { // returns first occurence and stops
                return item.split('=')[0] == param && (param = item.split('=')[1])
            })
        return param
    }

    const ref_payco = getQueryParam('ref_payco');
    //const urlapp = 'https://secure.epayco.co/validation/v1/reference/' + ref_payco+'/';
    const urlapp = `https://secure.epayco.co/validation/v1/reference/${ref_payco}/`;

    /**useEffect(() => {
        fetch(urlapp)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                setPayload(data.data);
            })
            .catch(error => {
                //this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }, []);*/

    const handleConfirm = (e) => {
        e.preventDefault();
        setLoading(true);
        setUserOrder([]);
        Inertia.post(`/orders/${order.id}/status`, {
            status: 'online'
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ChromeReaderMode />
                </Avatar>
                <h1>Quick Restaurant</h1>
                <h5>Estado de tu pago en Línea</h5>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="x_id_invoice"
                            label="Referencia"
                            name="x_id_invoice"
                            disabled
                            value={payload.x_id_invoice}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="x_transaction_date"
                            label="Fecha de transacción"
                            name="x_transaction_date"
                            value={payload.x_transaction_date}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            fullWidth
                            id="x_response"
                            label="Estado de transacción"
                            name="x_response"
                            value={payload.x_response}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="x_response_reason_text"
                            label="Motivo"
                            name="x_response_reason_text"
                            value={payload.x_response_reason_text}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="x_bank_name"
                            label="Banco"
                            name="x_bank_name"
                            value={payload.x_bank_name}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="x_transaction_id"
                            label="Recibo"
                            name="x_transaction_id"
                            value={payload.x_transaction_id}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="total"
                            label="Total"
                            name="total"
                            value={`${payload.x_amount} ${payload.x_currency_code}`}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {payload.x_cod_response == 1 &&
                        <Button
                            onClick={handleConfirm}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            startIcon={<Restaurant />}
                        >
                            {loading &&
                            <HalfCircleSpinner
                                size={20}
                                color={'#fff'}
                                className="mr-2"
                            />}
                            Confirmar mi pedido.
                        </Button>
                        }
                        {payload.x_cod_response == 3 &&
                            <RefreshButton/>
                        }
                    </Grid>
                    </Grid>
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

export default Confirm;
