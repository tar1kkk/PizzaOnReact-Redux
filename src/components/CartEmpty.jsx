import React from 'react';
import cartEmptyImg from '../assets/empty-cart.png';
import { Link } from 'react-router-dom';

function CartEmpty() {
	return (
		<>
			<div className='cart cart--empty'>
				<h2>Корзина пустая :(</h2>
				<p>
					Вероятней всего ,вы не заказывали еще пиццу.<br />
					для того ,чтобы заказать пиццу ,перейди на главную страницу.
				</p>
				<img src={cartEmptyImg} />
				<Link to='/' className='button button--black' >
					<span>Вернуться назад</span>
				</Link>
			</div>
		</>
	);
}

export default CartEmpty;