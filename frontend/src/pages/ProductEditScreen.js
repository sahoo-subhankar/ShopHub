import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

function ProductEditScreen() {
    const { id } = useParams();

    const [name, setName] = useState('')
    const [uploadedImage, setUploadedImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product || product._id !== Number(id)) {
                dispatch(listProductDetails(id))
            }
            else {
                setName(product.name)
                setUploadedImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
                setPrice(product.price)
                setCountInStock(product.countInStock)
            }
        }
    }, [dispatch, id, product, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({ _id: id, name, price, image: uploadedImage, brand, category, countInStock, description }))
    }

    const imageUploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('image', file);
        formData.append('product_id', id);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config);

            setUploadedImage(data);
            setUploading(false);
        } catch (error) {
            setUploading(false);
        }
    }

    const centeredH1Styles = {
        textAlign: 'center',
    };

    return (
        <div>
            <Link to="/admin/productlist" className="btn btn-light my-5">
                Go Back
            </Link>

            <FormContainer>
                <h1 style={centeredH1Styles}>Edit Product</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <ErrorMessage variant='danger'>{errorUpdate}</ErrorMessage>}

                {loading ? <Loader /> : error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand:</Form.Label>
                            <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category:</Form.Label>
                            <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>CountInStock:</Form.Label>
                            <Form.Control type='number' placeholder='Enter CountInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image:</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image'
                                value={uploadedImage}
                                onChange={(e) => setUploadedImage(e.target.value)}
                            />
                            <Form.Control type="file" id='image-file' label='Choose File' custom onChange={imageUploadHandler}></Form.Control>

                            {uploading && <Loader />}
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

export default ProductEditScreen;