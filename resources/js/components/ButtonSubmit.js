import SaveIcon from "@material-ui/icons/Save";
import {HalfCircleSpinner} from "react-epic-spinners";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";


const ButtonSubmit = ({processing, buttonText = 'Crear'}) => {

    const classes = useStyles();

    return(
        <Button
            type='submit'
            disabled={processing}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
        >
            { processing && <HalfCircleSpinner size={20} color={'#fff'} className="mr-2"/>}
            { buttonText }
        </Button>
    );

};

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


export default ButtonSubmit;
