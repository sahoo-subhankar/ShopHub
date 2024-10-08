import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const navigate = useNavigate();
    if (!shippingAddress.address) {
        navigate("/login/shipping");
    }

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="submit" variant="primary">
                        Continue
                    </Button>
                </div>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;