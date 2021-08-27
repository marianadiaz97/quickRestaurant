import React, {useState} from 'react';
import Alert from "react-bootstrap/Alert";
import {Button, Card, Col, Container, Form, FormControl, Modal, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {FaThumbsUp} from "react-icons/all";
import {Badge, Grid, IconButton} from "@material-ui/core";
import {ShoppingCartRounded} from "@material-ui/icons";
import CardDish from "../components/dishes/CardDish";
import ModalUserOrder from "../components/orders/ModalUserOrder";
import CategoryCard from "../components/categories/CategoryCard";
import useLocalStorage from "../hooks/useLocalStorage";
import {Inertia} from "@inertiajs/inertia";
import {useForm, usePage} from "@inertiajs/inertia-react";
import ModalOrder from "../components/orders/ModalOrder";
import ModalDrinks from "../components/orders/ModalDrinks";


const handleClick = (eventKey, hey) => {
    switch (eventKey) {
        case 'cart':
            break;
        case 'orders':
            break;
        case 'logout':
            // expected output: "Mangoes and papayas are $2.79 a pound."
            break;
        default:
            console.log(`Sorry, we are out of ${eventKey}.`);
    }
};



const Menu = ({ restaurant, drinks, errors }) => {

    const { authUser } = usePage().props;


    const orderRestaurant = `order-restaurant-${restaurant.id}`;
    const [order, setOrder] = useLocalStorage(orderRestaurant, []);
    const [modalShow, setModalShow] = useState(false);
    const [modalDrinksShow, setModalDrinksShow] = useState(false);
    const [errorShow, setErrorShow] = useState(true);
    const [drink, setDrink] = useState(null);
    const [dishUser, setDishUser] = useState(null);

    const { data, setData, processing } = useForm({
        details: order,
        restaurant_id: restaurant.id,
        comment: '',
    })


    const emptyCar = order.length >= 1;
    const categories = restaurant.categories;


    const removeDish = (e,dish, index) => {
        e.preventDefault();
        /*const dishExists = order.find(o => o.dish_id === dish.dish_id);
        console.log(dishExists, order, dish);
        if (dishExists && dishExists.quantity > 1){
            const newOrder = [... order];
            newOrder[index] = {...newOrder[index], quantity: newOrder[index].quantity-1}
            //console.log('restando', newOrder[index])
            setOrder(newOrder);
        }else {

        }*/
        const newOrder = [... order];
        newOrder.splice(index, 1);
        //console.log('quitando', index);
        setData('details', [... newOrder])
        setOrder(order => [... newOrder]);
    };

    const handleAddDish = (e,dish, drink) => {
        e.preventDefault();
        /*const dishExists = order.findIndex(o => o.dish_id === dish.id);
        if (dishExists !== -1){
            const oldOrder = [... order];
            oldOrder[dishExists] = {...oldOrder[dishExists], quantity: oldOrder[dishExists].quantity+1}
            setOrder(oldOrder);
            swal({
                title: "Plato agregado!",
                text: oldOrder[dishExists].dish_name,
                icon: "success",
                button: "Listo!",
            });
        }else {

        }*/
        if (!dish || !drink) return;

        const newDish = {
            dish_id: dish.id,
            dish_name: dish.name,
            quantity: 1,
            price: dish.price,
            drink_id: drink.id,
            drink_price: drink.price,
            drink_name: drink.name,
        };
        setOrder(order => [... order, newDish]);
        setData('details', [...order, newDish])
        swal({
            title: "Plato agregado!",
            text: newDish.dish_name,
            icon: "success",
            button: "Listo!",
        });
    };

    const handleConfirmOrder = (e) => {
        e.preventDefault();
        Inertia.post(`/orders/create`, data);
        setModalShow(false);
    };

    const handleAdd = (e, dish, showDrinks) => {
        if (!dish) return;
        if (!authUser){
            Inertia.get(`/register/${restaurant.id}`);
        }else {
            console.log(showDrinks, dish, e);
            setModalDrinksShow(showDrinks);
            setDishUser(dish)
        }
    };

    return (<>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="#">QR - {restaurant.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {authUser && <>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" eventKey='orders'><b>Ordenes</b></Nav.Link>
                        <Nav.Link href="#" eventKey='logout'><b>Cerrar Sesión</b></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Button
                    variant={emptyCar? 'danger' : 'light'}
                    onClick={() => setModalShow(true)}
                >
                    Mi Orden {emptyCar? order.length : ''}
                </Button>
            </>}
        </Navbar>
        <Container>
            {Object.entries(errors).length !== 0 &&
            <Alert show={errorShow} variant="warning">
                <Alert.Heading>Up's algo esta mal en tu orden?!</Alert.Heading>
                <p>
                   Intenta vaciar tu compra y reordenar!
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setErrorShow(false)} variant="outline-success">
                        Vaciar!
                    </Button>
                </div>
            </Alert>}
            {categories.length > 0 ? categories.map(category => (
                <Row key={category.id}>
                    <Col sm={12} md={12}>
                        <CategoryCard
                            handleAdd={handleAdd}
                            authUser={authUser}
                            dishUser={dishUser}
                            setDishUser={setDishUser}
                            category={category}
                            order={order}
                            setOrder={setOrder}
                            setModalDrinksShow={setModalDrinksShow}
                        />
                    </Col>
                </Row>
            )) : <p>No hay un choto</p>}
            <ModalOrder
                order={order}
                modalShow={modalShow}
                setModalShow={setModalShow}
                onRemove={removeDish}
                data={data}
                setData={setData}
                handleConfirm={handleConfirmOrder}
                processing={processing}
            />
            <ModalDrinks
                dish={dishUser}
                drink={drink}
                setDrink={setDrink}
                drinks={drinks}
                modalDrinksShow={modalDrinksShow}
                setModalDrinksShow={setModalDrinksShow}
                handleAdd={handleAddDish}
            />
        </Container>
        </>);
};

export default Menu;
