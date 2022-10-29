import React from "react";
import ReactPaginate from "react-paginate";
import stl from './Pagination.module.scss';


function Pagination({ onChangePage }) {
	return (
		<ReactPaginate
			className={stl.root}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={e => onChangePage(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination;