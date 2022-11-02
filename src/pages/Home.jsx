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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setItems } from '../redux/slices/pizzaSlice';

function Home({ searchValue }) {
	const navigate = useNavigate();
	const categoryId = useSelector(state => state.filterSlice.categoryId);
	const dispatch = useDispatch();
	const sortType = useSelector(state => state.filterSlice.sort.sortProperty);
	const currentPage = useSelector(state => state.filterSlice.currentPage);
	const pizzas = useSelector(state => state.pizzaSlice.items);

	const [isLoading, setIsLoading] = useState(true);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	}
	const onChangePage = (num) => {
		dispatch(setCurrentPage(num));
	}

	async function fetchData() {
		try {
			const { data } = await axios.get(
				`https://6357bebfc26aac906f3175b4.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''
				}&sortBy=${sortType}&order=desc`);
			dispatch(setItems(data));
			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
			alert('Error when getting pizzas')
		}
	}

	useEffect(() => {
		setIsLoading(true);
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
				{isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : pizzasItem}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
}

export default Home;