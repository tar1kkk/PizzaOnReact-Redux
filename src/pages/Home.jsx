import React from 'react';
import { useState, useEffect } from 'react';

import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';

function Home() {

	const [pizzas, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function fetchData() {
		const res = await fetch('https://6357bebfc26aac906f3175b4.mockapi.io/items');
		const data = await res.json();
		setPizzas(data);
		setIsLoading(false)
	}


	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div >
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading
						? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
						: pizzas.map((item) => <PizzaBlock key={item.id}  {...item} />)
				}
			</div>
		</div>
	);
}

export default Home;