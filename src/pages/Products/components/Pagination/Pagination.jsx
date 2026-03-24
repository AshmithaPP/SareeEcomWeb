import React from 'react';
import './pagination.css';

const Pagination = () => {
    return (
        <div className="pagination-wrapper d-flex justify-content-center mt-5">
            <button className="page-btn prev-btn">Previous</button>
            <button className="page-btn num-btn active">1</button>
            <button className="page-btn num-btn">2</button>
            <button className="page-btn num-btn">3</button>
            <button className="page-btn next-btn">Next</button>
        </div>
    );
};

export default Pagination;
