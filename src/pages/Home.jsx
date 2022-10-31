import React from 'react';
import { useState, useEffect } from 'react';

import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

function Home({ searchValue }) {
	const categoryId = useSelector(state => state.filterSlice.categoryId);
	const dispatch = useDispatch();
	const sortType = useSelector(state => state.filterSlice.sort.sortProperty);


	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	}

	async function fetchData() {
		const res = await fetch(
			`https://6357bebfc26aac906f3175b4.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sortType.sortProperty}&order=desc`);
		const data = await res.json();
		setPizzas(data);
		setIsLoading(false);
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
			<Pagination onChangePage={num => setCurrentPage(num)} />
		</div>
	);
}

export default Home;