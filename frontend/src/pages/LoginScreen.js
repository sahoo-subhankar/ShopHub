import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import FormContainer from "../components/FormContainer";
import { login } from '../actions/userActions';

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    const centeredH1Styles = {
        textAlign: 'center',
    };

    return (
        <FormContainer>
            <h1 style={centeredH1Styles}>Sign In</h1>
            {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type='submit' variant='primary'>Sign In</Button>
                </div>
            </Form>

            <Row className='py-3' style={centeredH1Styles}>
                <Col>
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;