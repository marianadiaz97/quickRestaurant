import React from "react";
import {Alert, Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {FaCartPlus, FaRemoveFormat} from "react-icons/fa";
import {TextField} from "@material-ui/core";

const ModalOrder = ({order, modalShow, setModalShow, onRemove, data,setData, handleConfirm, processing}) => {


    const isEmptyCart = order.length === 0;
    let total = 0;
    const getTotal = (dish) => {
        const price = dish.quantity * (dish.price + dish.drink_price);
        total += price;
    };
    order.forEach(getTotal);

    return (
        <Modal show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tu Orden
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    {!isEmptyCart ? <>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Plato</th>
                                <th>Precio</th>
                                <th>Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                        {!isEmptyCart && order.map((dish, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>{dish.dish_name} + {dish.drink_name}</td>
                                    <td>${dish.price} {dish.drink_price > 0? `+ $${dish.drink_price}` : ''}</td>
                                    <td className='text-center'>
                                        <Button size='sm' variant="danger" onClick={e => onRemove(e,dish, index)}>
                                            X
                                        </Button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                        <tr>
                            <th>Total</th>
                            <th>${total}</th>
                        </tr>
                            </tbody>
                        </Table>
                        <Row>
                            <Col sm={12} md={12}>
                                <label htmlFor="comment">Comentario</label>
                                <textarea
                                    className='form-control'
                                    id="comment"
                                    name="comment"
                                    rows="4"
                                    value={data.comment}
                                    cols="50"
                                    onChange={e => {setData(e.target.id, e.target.value)}}
                                />
                            </Col>
                        </Row>
                        </>
                        :
                        <div>
                            <Alert variant='warning'>
                                No hay articulos aun
                            </Alert>
                        </div>}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>
                    Cerrar
                </Button>
                <Button
                    disabled={order.length  === 0 || processing}
                    onClick={handleConfirm}
                    variant='success'
                >
                    Confirmar Orden
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ModalOrder;
