import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen({ history }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const location = useLocation()
    const redirect = location.search ? location.search.split("=")[1] : "/"

    const userRegister = useSelector((state) => state.userRegister)
    const { error, loading, userInfo } = userRegister

    const navigate = useNavigate()
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password do not match")
        } else {
            dispatch(register(name, email, password))
        }
    };

    const centeredH1Styles = {
        textAlign: 'center',
    };

    return (
        <FormContainer>
            <h1 style={centeredH1Styles}>Register</h1>
            {message && <ErrorMessage varient='danger'>{message}</ErrorMessage>}
            {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type='submit' variant='primary'>Register</Button>
                </div>
            </Form>

            <Row className='py-3' style={centeredH1Styles}>
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;