import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ModalBuyDish from "./ModalBuyDish";

const CardDish = ({dish, setUserOrder}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = (e) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (<>
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Dish"
                    height="140"
                    image={`/storage/${dish.image}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {dish.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        ${dish.price}
                    </Typography>
                    {dish.categories.length > 0 && dish.categories.map(category => (
                        <React.Fragment key={category.id}>
                            <Typography variant="h6" component="h3">
                                {category.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {category.products.length > 0 && category.products.map(p => p.name).join(',')}
                            </Typography>
                        </React.Fragment>
                    ))}
                </CardContent>
            </CardActionArea>
            <CardActions >
                <div className='col text-center'>
                    <Button
                        onClick={handleOpen}
                        size="small"
                        color="primary"
                        variant='contained'
                    >
                        Agregar
                    </Button>
                </div>
            </CardActions>
        </Card>
        <ModalBuyDish
            dish={dish}
            open={open}
            handleClose={handleClose}
            setUserOrder={setUserOrder}
        />
    </>);
};

export default CardDish;
