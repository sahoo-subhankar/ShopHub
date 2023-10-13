import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchBox() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`);
        } else {
            navigate('/');
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <InputGroup>
                <Form.Control
                    type='text'
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    className='me-1 mt-3 mb-3'></Form.Control>

                <Button type='submit' variant='outline-success' className='p-2 mt-3 mb-3'>
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SearchBox;
