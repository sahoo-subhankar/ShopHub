import React from 'react';
import { Alert } from 'react-bootstrap';

function ErrorMessage({ varient, children }) {
  return (
    <Alert variant={varient}>
      {children}
    </Alert>
  )
}
export default ErrorMessage;