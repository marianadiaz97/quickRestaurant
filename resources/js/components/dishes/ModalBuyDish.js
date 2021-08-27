import React, {useState} from 'react';
import {Button, Modal,} from "@material-ui/core";
import CategorySelect from "../categories/CategorySelect";

const ModalBuyDish = ({ dish, open, handleClose, setUserOrder}) => {

    const categories = dish.categories || [];

    const [dishOrder, setDishOrder] = useState({
        id: dish.id,
        price: dish.price,
    });

    const handleChange = (e) => {

        setDishOrder({
            ...dishOrder,
            [`category-${e.category_id}`]: [e.value],
        });
    };

    const addDishOrder = () => {
        setUserOrder(userOrder => [...userOrder, dishOrder]);
        handleClose();
    };

    const body = (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div className="card text-center">
                            <div className="card-header">
                                {dish.name}
                            </div>
                            <div className="card-body">
                                {categories.length > 0 && categories.map(category => (
                                    <CategorySelect
                                        key={category.id}
                                        dish = {dish}
                                        category = {category}
                                        onChange={handleChange}
                                    />
                                ))}
                                <div className='col text-center'>
                                    <Button
                                        type='button'
                                        variant='contained'
                                        color='secondary'
                                        onClick={addDishOrder}
                                    >
                                        Agregar
                                    </Button>
                                </div>
                            </div>
                            <div className="card-footer text-muted">
                                <b>Precio: ${dish.price} </b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
};

export default ModalBuyDish;
