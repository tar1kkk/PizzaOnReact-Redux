import React from 'react';
import { useState, useEffect } from 'react';

import qs from 'qs';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { setItems, fetchPizzas } from '../redux/slices/pizzaSlice';

function Home({ searchValue }) {
	const categoryId = useSelector(state => state.filterSlice.categoryId);
	const dispatch = useDispatch();
	const sortType = useSelector(state => state.filterSlice.sort.sortProperty);
	const currentPage = useSelector(state => state.filterSlice.currentPage);
	const pizzas = useSelector(state => state.pizzaSlice.items);
	const { status } = useSelector(state => state.pizzaSlice);



	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	}
	const onChangePage = (num) => {
		dispatch(setCurrentPage(num));
	}

	async function fetchData() {
		dispatch(
			fetchPizzas({
				categoryId,
				sortType,
				currentPage,
			}));
	}

	useEffect(() => {
		fetchData();
		window.scrollTo(0, 0);
	}, [categoryId, sortType, currentPage]);

	const pizzasItem = pizzas
		.filter(obj => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true;
			} else {
				return false;
			}
		}).map((item) => <PizzaBlock key={item.id}  {...item} />);
	return (
		<div className='container'>
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{status === 'loading' ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : pizzasItem}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
}

export default Home;