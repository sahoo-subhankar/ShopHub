import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Card, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

function PlaceOrderScreen({ history }) {
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart)
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    cart.shippingPrice = (cart.itemsPrice > 100 ? 10 : 0).toFixed(2);
    cart.taxPrice = Number(0.009 * cart.itemsPrice).toFixed(2);
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, navigate, dispatch, order]);

    const clickHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    const centeredH1Styles = {
        textAlign: 'center',
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={9}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2 style={centeredH1Styles}>Shipping</h2>

                            <p style={centeredH1Styles}>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2 style={centeredH1Styles}>Payment Method</h2>

                            <p style={centeredH1Styles}>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2 style={centeredH1Styles}>Order Items</h2>
                            {cart.cartItems.length === 0 ? <ErrorMessage varient='info'>
                                Your cart is Empty
                            </ErrorMessage> : (
                                <ListGroup varient='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup varient="flush">
                            <ListGroupItem>
                                <h2 style={centeredH1Styles}>Order Summary</h2>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
                            </ListGroupItem>

                            <ListGroupItem>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button type='button' className="btn-block" disabled={cart.cartItems === 0} onClick={clickHandler}>Place Order</Button>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen;