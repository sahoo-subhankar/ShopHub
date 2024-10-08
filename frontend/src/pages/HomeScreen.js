import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Paginator from "../components/Paginator";
import ProductSlider from "../components/ProductSlider";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";


const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const location = useLocation()
  let keyword = location.search

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const centeredH1Styles = {
    textAlign: 'center',
  };

  return (
    <div>
      {!keyword && <ProductSlider />}
      <h1 style={centeredH1Styles}>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage varient='danger'>{error}</ErrorMessage>
      ) : (
        <div>
          <Row style={centeredH1Styles}>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            <div className="d-flex justify-content-center align-items-center">
              <Paginator page={page} pages={pages} keyword={keyword} />
            </div>
          </Row>
        </div>
      )}
    </div>
  )
}

export default HomeScreen;