import { Nav } from 'grommet';
import React from 'react';

export const Pagination = ({ questionsPerPage, totalQuestions, paginate}) => {
    const pageNumbers = [];

    for(let i = 1;i <= Math.ceil(totalQuestions / questionsPerPage);i++) {
        pageNumbers.push(i);
    }

    return (
        <Nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a href="!#" className="page-link" onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))
                }
            </ul>
        </Nav>
    );
};