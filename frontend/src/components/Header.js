import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from './SearchBox';
import { logout } from "../actions/userActions";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="custom-header">
      <Navbar expand="lg" bg="dark" variant="dark" className="bg-body-tertiary" collapseOnSelect data-bs-theme="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ShopHub</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" style={{ maxHeight: "100px" }} navbarScroll>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart{" "}
                  {cartItems.length > 0 && (
                    <Badge variant="secondary">{cartItems.length}</Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo && userInfo.isAdmin && (
                // User is an admin
                <NavDropdown title="Admin" id="adminMenu">
                  {/* Admin links */}
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo ? (
                // User is logged in
                <NavDropdown title={userInfo.name} id="username">
                  {/* Profile link */}
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {/* Logout link */}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // User is not logged in
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>

            {/* Search box */}
            <SearchBox />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;
