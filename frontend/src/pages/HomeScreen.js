import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { listproducts } from "../actions/productActions";


const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listproducts());
  }, [dispatch]);

  const centeredH1Styles = {
    textAlign: 'center',
  };

  return (
    <div>
      <h1 style={centeredH1Styles}>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage varient='danger'>{error}</ErrorMessage>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
export default HomeScreen;