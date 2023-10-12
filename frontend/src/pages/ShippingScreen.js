import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from '../actions/cartActions';

function ShippingScreen() {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    const centeredH1Styles = {
        textAlign: 'center',
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1 style={centeredH1Styles}>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Address"
                        value={address ? address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter City"
                        value={city ? city : ""}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Postal Code"
                        value={postalCode ? postalCode : ""}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Country"
                        value={country ? country : ""}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type='submit' variant='primary'>Continue</Button>
                </div>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;