import {Card, CardGroup, Col, Container, Row} from "react-bootstrap";
import React from "react";
import DishCard from "../dishes/DishCard";


const CategoryCard = ({authUser,dishUser, setDishUser, category, order, setOrder, setModalDrinksShow, handleAdd}) => {

    const dishes = category.dishes;

    return (
        <Card style={{marginTop: 7}} className="text-center">
            <Card.Header >
                <b>{category.name}</b>
            </Card.Header>
            <Card.Body>
                <Container>
                    <CardGroup as='div'>
                    {dishes.length > 0 ? dishes.map(dish => (
                        <DishCard
                            handleAdd={handleAdd}
                            authUser={authUser}
                            key={dish.id}
                            dishUser={dishUser}
                            setDishUser={setDishUser}
                            dish={dish}
                            order={order}
                            setOrder={setOrder}
                            setModalDrinksShow={setModalDrinksShow}
                        />))
                        :
                        <p>No hay un choto</p>}
                    </CardGroup>
                </Container>
            </Card.Body>
        </Card>
    );

};

export default CategoryCard;
