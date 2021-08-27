import {Button, ButtonGroup, Card, Col, Container, Row} from "react-bootstrap";
import React, {useState} from "react";
import {FaCartPlus} from "react-icons/fa";


const DishCard = ({ handleAdd,authUser, dishUser, setDishUser, dish, order, setOrder, setModalDrinksShow }) => {


    return (
        <Card style={{marginLeft: 2}} className="text-center">
            <Card.Header>
                <b>{dish.name}</b>
            </Card.Header>
            <Card.Img variant="top" src={'/storage/dishes/kjv4muosfaLQ3voYs56rJ5BZv1hW6C91Lahfe1EF.jpeg'} />
            <Card.Body>
                <Container>

                </Container>
            </Card.Body>
            <Card.Footer className='text-center'>
                <b>{dish.price} COP</b>
                {/* <Button size='lg' variant="secondary" onClick={e => { handleAddDish(e,dish) }} block>
                    Agregar <FaCartPlus/>
                </Button> */}
                <Button
                    size='lg'
                    variant="secondary"
                    onClick={e => {handleAdd(e, dish, true)}}
                    block
                >
                    Agregar <FaCartPlus/>
                </Button>
            </Card.Footer>
        </Card>
    );
};


export default DishCard;
