import React from "react";
import {Alert, Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {FaCartPlus, FaRemoveFormat} from "react-icons/fa";

const ModalDrinks = ({dish, drink, setDrink,drinks, modalDrinksShow, setModalDrinksShow, handleAdd}) => {

    const emptyDrinks = drinks.length === 0;


    const handleConfirmDrink = (e) => {
        e.preventDefault();

        setModalDrinksShow(false);
        handleAdd(e, dish, drink);
        setDrink(null)
    };

    return (
        <Modal show={modalDrinksShow} onHide={() => setModalDrinksShow(false)} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Selecciona tu Bebida
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container fluid>
                    {!emptyDrinks ?
                        <Row>
                            <Col>
                                <Form>
                                    {drinks.map(drink => (
                                        <div key={`inline-${drink.id}`} className="mb-3">
                                            <Form.Check
                                                onChange={(e) => {setDrink(drink)}}
                                                inline
                                                label={drink.name}
                                                name="group1"
                                                type='radio'
                                                id={drink.id}
                                            />
                                            <label><b> ${drink.price}</b></label>
                                        </div>
                                    ))}
                                </Form>
                            </Col>
                        </Row>
                        :
                        <div>
                            <Alert variant='warning'>
                                No hay articulos aun
                            </Alert>
                        </div>}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={() => {setModalDrinksShow(false)}}>
                    Atrás
                </Button>
                <Button
                    disabled={drink === null}
                    onClick={e => {setModalDrinksShow(false); handleAdd(e, dish, drink); setDrink(null)}}
                    variant='success'
                >
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ModalDrinks;
