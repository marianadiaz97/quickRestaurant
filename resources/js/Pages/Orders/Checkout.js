import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Inertia} from "@inertiajs/inertia";
import Button from "@material-ui/core/Button";
import {HalfCircleSpinner} from "react-epic-spinners";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {
    CloudDownload,
    MoneyOffOutlined,
    OutdoorGrill,
    Payment,
    Refresh,
} from "@material-ui/icons";
import {Alert, AlertTitle} from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {usePage} from "@inertiajs/inertia-react";
import {InputAdornment} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import QRCode from "qrcode.react";


const Checkout = (props) => {

    const { order } = props;
    const { app_url } = usePage().props;
    const { user, restaurant } = order;

    const [loading, setLoading] = useState(false);

    const details = order.details ?? [];
    const orderName = `Orden de ${user.first_name}`;

    const classes = useStyles();

    const handlePay = () => {

        setLoading(true);
        const handler = ePayco.checkout.configure({
            key: 'c634341b1b0efbf70039877a0c7f08fb',
            test: true
        });

        var data={
            //Parametros compra (obligatorio)
            name: orderName,
            description: `Orden de ${user.first_name}`,
            invoice: `${order.id}`,
            currency: "cop",
            amount: `${order.total}`,
            tax_base: "0",
            tax: "0",
            country: "co",
            lang: "es",
            Onpage: "true",
            //- Standard="true"
            //external: "true",
            //Atributos opcionales
            extra1: "extra1",
            extra2: "extra2",
            extra3: "extra3",
            confirmation: `${app_url}/orders/${order.id}/confirm/`,
            response: `${app_url}/orders/${order.id}/confirm/`,
            method: 'GET',

            //atributo deshabilitación metodo de pago
            methodsDisable: ["SP","CASH","DP"]

        }
        handler.open(data);

    };

    const handlePayCash = (e) => {
        e.preventDefault();
        setLoading(true);
        Inertia.post(`/orders/${order.id}/status`, {
            status: 'cash'
        })
    };

    // download QR code
    const handleDownloadQRCode = () => {
        const qrCodeURL = document.getElementById('qrCodeEl')
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        console.log(qrCodeURL)
        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = "QR_Code.png";
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    }

    return (
        <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Payment />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Quick Restaurant
                    </Typography>
                    <Typography component="h5" variant="h6">
                        Orden de: <b>{user.first_name}</b>
                    </Typography>
                    <Typography component="h5" variant="h6">
                        Orden Código: <b>{order.id.slice(-4)}</b>
                    </Typography>
                    <Typography component="h5" variant="h6">
                        Total: <b>{order.total} COP</b>
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {details.length > 0 && details.map((detail, index) => (
                                <ul className="list-group mt-2" key={index}>
                                    <li className="list-group-item list-group-item-info" aria-current="true">{detail.name}</li>
                                    <li className="list-group-item">{detail.products}</li>
                                </ul>
                            ))}
                        </Grid>
                        <Grid item xs={12} className='text-center'>
                            <QRCode
                                id="qrCodeEl"
                                size={150}
                                value={`${app_url}/orders/${order.id}`}
                            />
                            <p><b> Descarga el comprobante de tu orden a través del código QR</b></p>
                        </Grid>
                        {order.status === 'cooking' && <>
                            <Grid item xs={12}>
                                <TextField
                                    error
                                    id="status"
                                    label="Estado de tu pedido:"
                                    value='Cocinando'
                                    helperText="Tu pedido aun se esta cocinando"
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <OutdoorGrill />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RefreshButton/>
                            </Grid></>}
                        {order.status === 'paid' && <>
                            <Grid item xs={12}>
                                <Alert severity="success">
                                    <AlertTitle>Pagado</AlertTitle>
                                    Informale de tu pedido a una persona del restaurante — <strong>Gracias!</strong>
                                </Alert>
                            </Grid>
                                <Grid item xs={12}>
                                    <RefreshButton/>
                            </Grid> </>}
                        {order.status === 'finished' && <>
                            <Grid item xs={12}>
                                <Alert severity="success">
                                    <AlertTitle>Finalizado</AlertTitle>
                                    Tu pedido ha sido entregado — <strong>Gracias!</strong>
                                </Alert>
                            </Grid>
                            <Grid item>
                                <Link href={`/restaurant/${restaurant.qr_code}/menu`} variant="body2">
                                    ¿Deseas pedir otra orden? Click aquí!
                                </Link>
                            </Grid> </>}
                        {order.status === 'cash' && <>
                            <Grid item xs={12}>
                                <Alert severity="warning">
                                    <AlertTitle>Pendiente</AlertTitle>
                                    Tu pedido esta pendiente de pago — <strong>Acercate a la caja para cancelar!</strong>
                                </Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <RefreshButton/>
                            </Grid> </>}
                        <Grid item xs={12}>
                            {order.status === 'pending' && <>
                                <Button
                                    onClick={handlePayCash}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<MoneyOffOutlined/>}
                                >{loading &&
                                <HalfCircleSpinner
                                    size={20}
                                    color={'#fff'}
                                    className="mr-2"
                                />}
                                    Pagar en caja
                                </Button>
                                <Button
                                    onClick={handlePay}
                                    disabled={loading}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<Payment />}
                                >
                                    {loading &&
                                    <HalfCircleSpinner
                                        size={20}
                                        color={'#fff'}
                                        className="mr-2"
                                    />}
                                    Pagar En Linea
                                </Button> </>}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={handleDownloadQRCode}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="default"
                                startIcon={<CloudDownload/>}
                            >
                                Descargar Código QR
                            </Button>
                        </Grid>
                    </Grid>
                </div>
        </Container>
    );
};

export const RefreshButton = ({title}) => {
    const handleRefresh = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    return (
        <Button
            onClick={handleRefresh}
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            startIcon={<Refresh/>}
        >
            Actualizar {title? title: 'Estado'}
        </Button>);
};

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
        backgroundColor: theme.palette.success.dark,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default Checkout;
