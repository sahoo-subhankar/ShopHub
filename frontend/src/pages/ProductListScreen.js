import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Paginator from "../components/Paginator";
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function ProductListScreen() {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    const productDelete = useSelector((state) => state.productDelete)
    const { error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const location = useLocation()
    let keyword = location.search

    const navigate = useNavigate();
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/edit/product/${createdProduct._id}`)
        } else {
            dispatch(listProducts(keyword))
        }
    }, [dispatch, navigate, userInfo, successDelete, createdProduct, successCreate, keyword]);

    const deleteHandler = (id) => {
        if (window.confirm('You are going to delete the product. Are you sure ?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const centeredH1Styles = {
        textAlign: "center",
    };

    return (
        <div>
            <Row>
                <Col style={centeredH1Styles}>
                    <h1>List of Products</h1>
                </Col>
                <Col xs="align-items-center" style={centeredH1Styles}>
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingCreate && <Loader />}
            {errorCreate && <ErrorMessage varient="danger">{errorCreate}</ErrorMessage>}
            {errorDelete && <ErrorMessage varient="danger">{errorDelete}</ErrorMessage>}

            {loading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage varient="danger">{error}</ErrorMessage>
            ) : (
                <div>
                    <Table striped bordered responsive className="table-sm" style={centeredH1Styles}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th><i className="fas fa-arrows"></i></th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/edit/product/${product._id}`}>
                                            <Button variant='dark' className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className="btn-sm" onClick={() => deleteHandler(product._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Row>
                        <div className="d-flex justify-content-center align-items-center">
                            <Paginator page={page} pages={pages} isAdmin={true} />
                        </div>
                    </Row>
                </div>
            )}
        </div>
    )
};

export default ProductListScreen;