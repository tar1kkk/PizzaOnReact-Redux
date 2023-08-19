import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.css';

function Pagination({onChangePage}) {
    return (
        <ReactPaginate
            className={styles.root}
            pageCount={3}
            nextLabel={`>`}
            onPageChange={e =>onChangePage(e.selected + 1)}
            pageRangeDisplayed={8}
            previousLabel={`<`}
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;