import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const FullPizza: React.FC = () => {
	const { id } = useParams();
	const [pizza, setPizza] = useState<{
		imageUrl: string,
		title: string,
		price: number
	}>();


	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://6357bebfc26aac906f3175b4.mockapi.io/items/' + id);
				setPizza(data);
			} catch (e) {
				alert('Ошибка при получении пиццы');
			}
		}

		fetchPizza();
	}, []);

	if (!pizza) {
		return <>Loading...</>;
	}

	return (
		<div className='container'>
			<img src={pizza.imageUrl} />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} </h4>
		</div>
	);
}

export default FullPizza;