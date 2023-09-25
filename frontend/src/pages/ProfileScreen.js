import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { ListOrdersByMe } from '../actions/orderActions';

function ProfileScreen({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListByme = useSelector((state) => state.orderListByme);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListByme;

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(ListOrdersByMe());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  const centeredH1Styles = {
    textAlign: "center",
  };

  return (
    <Row>
      <Col md={3}>
        <h2 style={centeredH1Styles}>My Profile</h2>
        {message && <ErrorMessage varient="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="primary" style={{ marginBottom: "15px", marginTop: "5px" }}>
              Update
            </Button>
          </div>
        </Form>
      </Col>

      <Col md={9} style={centeredH1Styles}>
        <h2 style={centeredH1Styles}>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <ErrorMessage varient='danger'>{errorOrders}</ErrorMessage>
        ) : (orders.length === 0) ? <ErrorMessage varient="danger">You have not ordered anything</ErrorMessage> :
          <Table striped responsive className="table-sm" style={centeredH1Styles}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        }
      </Col>
    </Row>
  );
}

export default ProfileScreen;
