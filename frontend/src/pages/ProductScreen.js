import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { listProductDetails, reviewProduct } from "../actions/productActions";
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants';

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReview = useSelector((state) => state.productReview);
  const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReview;

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment("")
      dispatch({ type: PRODUCT_REVIEW_RESET })
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const navigate = useNavigate();
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(reviewProduct(id, { rating, comment }))
  }

  const centeredH1Styles = {
    textAlign: "center",
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-5">
        Go Back
      </Link>

      {loading ? (<Loader />) : error ? (<ErrorMessage varient="danger">{error}</ErrorMessage>) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>

                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroupItem>

                <ListGroupItem>Price: ${product.price}</ListGroupItem>
                <ListGroupItem>Description: {product.description}</ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty:</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem className="d-flex justify-content-center">
                    <Button
                      onClick={addToCartHandler}
                      className="btn btn-block"
                      type="button"
                      disabled={product.countInStock === 0}>
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <h4 style={centeredH1Styles}>Product Reviews</h4>
              {product.reviews.length === 0 && <ErrorMessage varient='info'> No Reviews </ErrorMessage>}

              <ListGroup varient='flush' >
                {product.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color='#f8e825' />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}

                <ListGroup.Item>
                  <h4 style={centeredH1Styles}>Write a review</h4>

                  {loadingProductReview && <Loader />}
                  {successProductReview && <ErrorMessage variant='success'>Review Submitted</ErrorMessage>}
                  {errorProductReview && <ErrorMessage variant='danger'>{errorProductReview}</ErrorMessage>}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}>
                          <option value=''>Select Here</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='10'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}></Form.Control>
                      </Form.Group>

                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button disabled={loadingProductReview} type="submit" variant="primary" className="btn btn-block">
                          Submit
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <ErrorMessage variant='info'>Please <Link to='/login'>login</Link> to write a review</ErrorMessage>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;