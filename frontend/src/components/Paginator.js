import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Paginator({ pages, page, keyword = '', isAdmin = false }) {
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0];
    }

    return (
        pages > 1 && (
            <Pagination>
                {page > 1 && (
                    <LinkContainer
                        to={{
                            pathname: !isAdmin ? '/' : '/admin/productlist',
                            search: `?keyword=${keyword}&page=${page - 1}`,
                        }}>
                        <Pagination.Item>
                            ←
                        </Pagination.Item>
                    </LinkContainer>
                )}

                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={{
                            pathname: !isAdmin ? '/' : '/admin/productlist',
                            search: `?keyword=${keyword}&page=${x + 1}`,
                        }}>
                        <Pagination.Item disabled={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}

                {page < pages && (
                    <LinkContainer
                        to={{
                            pathname: !isAdmin ? '/' : '/admin/productlist',
                            search: `?keyword=${keyword}&page=${page + 1}`,
                        }}>
                        <Pagination.Item>
                            →
                        </Pagination.Item>
                    </LinkContainer>
                )}
            </Pagination>
        )
    );
}

export default Paginator;

