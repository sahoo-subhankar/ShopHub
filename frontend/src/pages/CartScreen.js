import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import ErrorMessage from "../components/ErrorMessage";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ history }) {
  const { id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping")
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Row>
        <Col>
          <Link to="/" className="btn btn-light my-5">
            Go Back
          </Link>
        </Col>
      </Row>

      <Container>
        <Row>
          <Col md={8}>
            <h2 className="text-center">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <ErrorMessage variant="info">
                Your cart is empty <Link to="/">Go Back</Link>
              </ErrorMessage>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2} sm={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3} sm={4} className="d-flex align-items-center">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={3} sm={2}>${item.price}</Col>
                      <Col md={3} sm={2}>
                        <Form.Select
                          value={item.qty}
                          onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={1} sm={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <div>
                    <h4>
                      Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):
                    </h4>
                  </div>
                  <div>
                    ${cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup.Item className="text-center">
                <Button
                  type="button"
                  className="btn btn-block p-3 m-3"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}>
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default CartScreen;