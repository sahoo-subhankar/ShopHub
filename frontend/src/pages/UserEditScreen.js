import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEditScreen() {
    const { id } = useParams();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector((state) => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            }
            else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, id, user, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    };

    const centeredH1Styles = {
        textAlign: 'center',
    };

    return (
        <div>
            <Link to="/admin/userlist" className="btn btn-light my-5">
                Go Back
            </Link>

            <FormContainer>
                <h1 style={centeredH1Styles}>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <ErrorMessage varient='danger'>{errorUpdate}</ErrorMessage>}
                {loading ? <Loader /> : error ? <ErrorMessage varient='danger'>{error}</ErrorMessage> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address:</Form.Label>
                            <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin'>
                            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type='submit' variant='primary'>Update</Button>
                        </div>
                    </Form>
                )}

            </FormContainer>
        </div>
    );
}

export default UserEditScreen;