import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import FormContainer from "../components/FormContainer";
import { login } from '../actions/userActions';

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <FormContainer>
            <h1>Sign In</h1>
            
        </FormContainer>
    )
}
export default LoginScreen;