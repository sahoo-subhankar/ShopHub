import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <footer className="bg-dark custom-footer">
        <Container>
          <Row>
            <Col className="text-center py-3">
              <strong> <b style={{ color: "white" }}>Developed with ❤️ by Subhankar Sahoo </b></strong>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;