import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Card, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from 'react-paypal-button-v2';
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function OrderScreen() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AXanN11FhMkx4BS0LOMrSmORX2Ft4dPIk_EP1PJ8-wFtS2yV5ioSknPdU2GfArVUBHMS7_JQ3HhCua_9&currency=USD'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!order || successPay || order._id !== Number(id)) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(id))
        } else if(!order.isPaid) {
            if(!window.paypal){
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, id, successPay])


    const successpaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const centeredH1Styles = {
        textAlign: 'center',
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <ErrorMessage varient='danger'>{error}</ErrorMessage>
    ) : (
        <div>
            <h1 style={centeredH1Styles}>Order No: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroupItem style={centeredH1Styles}>
                            <h2 style={centeredH1Styles}>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto: ${order.user.email}`}>{order.user.email}</a></p>

                            <p style={centeredH1Styles}>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <ErrorMessage varient='success'>Delivered on {order.deliveredAt}</ErrorMessage>
                            ) : (
                                <ErrorMessage varient='warning'>Not Delivered</ErrorMessage>
                            )}
                        </ListGroupItem>

                        <ListGroupItem style={centeredH1Styles}>
                            <h2 style={centeredH1Styles}>Payment Method</h2>

                            <p style={centeredH1Styles}>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? (
                                <ErrorMessage varient='success'>Paid on {order.paidAt}</ErrorMessage>
                            ) : (
                                <ErrorMessage varient='warning'>Not Paid</ErrorMessage>
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2 style={centeredH1Styles}>Order Items</h2>
                            {order.orderItems.length === 0 ? <ErrorMessage varient='info'>
                                Order is Empty
                            </ErrorMessage> : (
                                <ListGroup varient='flush'>
                                    {order.orderItems.map((item, index) => (
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

                <Col md={4}>
                    <Card>
                        <ListGroup varient="flush">
                            <ListGroupItem>
                                <h2 style={centeredH1Styles}>Order Summary</h2>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            
                            {!order.isPaid && (
                                <ListGroupItem>
                                    {loadingPay && <Loader/>}

                                    {!sdkReady ? (
                                        <Loader/>
                                    ) : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successpaymentHandler}/>
                                    )}
                                </ListGroupItem>
                            )}
        
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen;