import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { listUsers, deleteUser } from '../actions/userActions';

function UserListScreen() {
    const dispatch = useDispatch()

    const usersList = useSelector((state) => state.usersList)
    const { loading, error, users } = usersList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm('You are going to delete the user. Are you sure ?')) {
            dispatch(deleteUser(id))
        }
    }

    const centeredH1Styles = {
        textAlign: "center",
    };

    return (
        <div>
            <h1 style={centeredH1Styles}>List of Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage varient="danger">{error}</ErrorMessage>
            ) : (
                <Table striped bordered responsive className="table-sm" style={centeredH1Styles}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th><i className="fas fa-arrows"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                                ) : (
                                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/admin/edit/user/${user._id}`}>
                                        <Button variant='dark' className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
};

export default UserListScreen;