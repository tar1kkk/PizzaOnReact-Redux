import React from 'react';
import { useState, useEffect } from 'react';

import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination';

function Home({ searchValue }) {

	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	});

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
				<Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
				<Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
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