import React from "react";
import ReactPaginate from "react-paginate";
import stl from './Pagination.module.scss';

type PaginationProps = {
	currentPage: number;
	onChangePage: any;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
	return (
		<ReactPaginate
			className={stl.root}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={e => onChangePage(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
		/>
	)
}

export default Pagination;